import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import { createAdminClient } from '@/lib/supabase/admin'
import { getWeekCutoffDate } from '@/lib/utils/order'
import { buildPayNowQRString, buildPaymentRef } from '@/lib/utils/paynow'

const PAYNOW_MOBILE = '98479776'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, postalCode, dormitoryId, items, totalAmount } = body

    if (!name || !phone || !postalCode || !dormitoryId || !items?.length || !totalAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Verify products and stock
    const productIds = items.map((i: { productId: string }) => i.productId)
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('id, name, sale_price, stock_qty, is_active')
      .in('id', productIds)

    if (prodError || !products) {
      return NextResponse.json({ error: 'Failed to verify products' }, { status: 500 })
    }

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId)
      if (!product || !product.is_active) {
        return NextResponse.json({ error: 'Product not available' }, { status: 400 })
      }
      if (product.stock_qty < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 400 })
      }
    }

    // Upsert user by phone
    let userId: string
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('phone', phone)
      .single()

    if (existingUser) {
      userId = existingUser.id
      await supabase.from('users').update({ full_name: name, dormitory_id: dormitoryId }).eq('id', userId)
    } else {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        phone: phone.startsWith('+') ? phone : `+65${phone.replace(/\s/g, '')}`,
        user_metadata: { full_name: name },
        phone_confirm: true,
      })
      if (authError || !authData.user) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
      userId = authData.user.id
      await supabase.from('users').insert({
        id: userId,
        phone,
        full_name: name,
        dormitory_id: dormitoryId,
        role: 'customer',
      })
    }

    // Build payment reference: LASTNAME POSTALCODE
    const paymentRef = buildPaymentRef(name, postalCode)

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        dormitory_id: dormitoryId,
        total_amount: totalAmount,
        postal_code: postalCode,
        payment_ref: paymentRef,
        week_cutoff: getWeekCutoffDate(),
        status: 'pending_payment',
        payment_status: 'unpaid',
      })
      .select('id')
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Insert order items
    await supabase.from('order_items').insert(
      items.map((i: { productId: string; quantity: number; unitPrice: number }) => ({
        order_id: order.id,
        product_id: i.productId,
        quantity: i.quantity,
        unit_price: i.unitPrice,
      }))
    )

    // Decrement stock atomically
    for (const item of items) {
      await supabase.rpc('decrement_stock', {
        product_id: item.productId,
        qty: item.quantity,
      })
    }

    // Generate PayNow QR code
    const qrString = buildPayNowQRString({
      mobile: PAYNOW_MOBILE,
      amount: totalAmount,
      reference: paymentRef,
      merchantName: 'Discounter SG',
    })

    const qrDataUrl = await QRCode.toDataURL(qrString, {
      errorCorrectionLevel: 'M',
      width: 300,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    })

    return NextResponse.json({
      orderId: order.id,
      paymentRef,
      qrDataUrl,
      qrString,
    })
  } catch (err: unknown) {
    console.error('Order creation error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

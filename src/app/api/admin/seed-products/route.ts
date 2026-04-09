import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// 30 starter SKUs — popular with Indian/Bangladeshi foreign workers in Singapore
// Prices based on NTUC FairPrice / Sheng Siong retail, Apr 2025
const SEED_PRODUCTS = [
  // ── BEVERAGES ──────────────────────────────────────────
  { name: 'Coca-Cola Classic 24 x 320ml', description: 'Refreshing classic cola drink, 24 cans', category: 'beverages', original_price: 15.90, sale_price: 5.90, discount_pct: 63, expiry_date: '2025-09-30', stock_qty: 48, image_url: 'https://images.openfoodfacts.org/images/products/544/900/013/5461/front_en.47.400.jpg' },
  { name: 'Red Bull Energy Drink 4 x 250ml', description: 'Original energy drink with caffeine & taurine, 4 cans', category: 'beverages', original_price: 9.70, sale_price: 3.50, discount_pct: 64, expiry_date: '2025-08-15', stock_qty: 72, image_url: 'https://images.openfoodfacts.org/images/products/900/249/010/0070/front_en.7.400.jpg' },
  { name: 'Pokka Green Tea 24 x 300ml', description: 'Japanese-style green tea, no preservatives, 24 bottles', category: 'beverages', original_price: 14.40, sale_price: 5.50, discount_pct: 62, expiry_date: '2025-10-20', stock_qty: 60, image_url: null },
  { name: 'Milo 3-in-1 Instant Drink 15 sachets x 27g', description: 'Chocolate malt drink with milk, just add hot water', category: 'beverages', original_price: 7.95, sale_price: 2.90, discount_pct: 64, expiry_date: '2025-11-10', stock_qty: 65, image_url: 'https://images.openfoodfacts.org/images/products/489/900/023/1512/front_en.13.400.jpg' },
  { name: 'Tata Tea Premium Leaf Tea 250g', description: "Strong Indian-style black tea, loose leaf", category: 'beverages', original_price: 5.30, sale_price: 2.10, discount_pct: 60, expiry_date: '2025-12-05', stock_qty: 44, image_url: null },
  { name: '100Plus Isotonic Drink 24 x 325ml', description: 'Isotonic sports drink with electrolytes, 24 cans', category: 'beverages', original_price: 14.90, sale_price: 5.50, discount_pct: 63, expiry_date: '2025-09-20', stock_qty: 55, image_url: null },

  // ── INSTANT NOODLES ────────────────────────────────────
  { name: "Indomie Mi Goreng Fried Noodles 5 x 80g", description: "Indonesia's most popular instant fried noodles, spicy", category: 'instant_noodles', original_price: 2.25, sale_price: 0.90, discount_pct: 60, expiry_date: '2025-07-15', stock_qty: 180, image_url: 'https://images.openfoodfacts.org/images/products/089/686/010/0452/front_en.31.400.jpg' },
  { name: 'Maggi 2-Minute Noodles Curry Flavour 5 x 79g', description: 'Classic curry-flavoured instant noodles', category: 'instant_noodles', original_price: 2.57, sale_price: 1.00, discount_pct: 61, expiry_date: '2025-08-10', stock_qty: 145, image_url: null },
  { name: 'Maggi 2-Minute Noodles Chicken Flavour 5 x 77g', description: 'Chicken-flavoured instant noodles, quick to cook', category: 'instant_noodles', original_price: 2.57, sale_price: 1.00, discount_pct: 61, expiry_date: '2025-07-30', stock_qty: 130, image_url: null },
  { name: 'Nissin Cup Noodles Seafood 6 x 75g', description: 'Japanese-style seafood cup noodles, just add hot water', category: 'instant_noodles', original_price: 6.90, sale_price: 2.80, discount_pct: 59, expiry_date: '2025-09-05', stock_qty: 90, image_url: null },

  // ── CANNED GOODS ──────────────────────────────────────
  { name: 'Ayam Brand Sardines in Tomato Sauce 215g', description: 'Tender sardines in rich tomato sauce, ready to eat', category: 'canned_goods', original_price: 2.15, sale_price: 0.85, discount_pct: 60, expiry_date: '2025-12-20', stock_qty: 120, image_url: null },
  { name: 'Ayam Brand Tuna Chunks in Water 185g', description: 'Skipjack tuna chunks in spring water, high protein', category: 'canned_goods', original_price: 2.40, sale_price: 0.95, discount_pct: 60, expiry_date: '2025-11-30', stock_qty: 100, image_url: null },
  { name: 'Ligo Sardines in Corn Oil 155g', description: 'Tender sardines in corn oil, popular brand', category: 'canned_goods', original_price: 1.60, sale_price: 0.65, discount_pct: 59, expiry_date: '2025-10-15', stock_qty: 95, image_url: null },
  { name: 'FairPrice Baked Beans in Tomato Sauce 420g', description: 'Hearty baked beans in tomato sauce, great with rice', category: 'canned_goods', original_price: 1.25, sale_price: 0.50, discount_pct: 60, expiry_date: '2026-01-10', stock_qty: 110, image_url: null },

  // ── RICE & GRAINS ─────────────────────────────────────
  { name: 'Royal Umbrella Thai Jasmine Rice 5kg', description: 'Premium Thai hom mali fragrant rice, long grain', category: 'rice_grains', original_price: 11.25, sale_price: 4.50, discount_pct: 60, expiry_date: '2025-12-15', stock_qty: 38, image_url: null },
  { name: 'India Gate Basmati Rice Classic 2kg', description: 'Extra-long aged basmati rice from India, fragrant', category: 'rice_grains', original_price: 8.95, sale_price: 3.50, discount_pct: 61, expiry_date: '2025-11-20', stock_qty: 42, image_url: null },

  // ── COOKING ESSENTIALS ────────────────────────────────
  { name: 'Knife Brand Cooking Oil 2L', description: 'Refined palm olein cooking oil, suitable for deep frying', category: 'cooking_essentials', original_price: 5.40, sale_price: 2.10, discount_pct: 61, expiry_date: '2025-10-10', stock_qty: 55, image_url: null },
  { name: 'Maggi Oyster Sauce 510g', description: 'Rich umami oyster sauce, essential for Asian cooking', category: 'cooking_essentials', original_price: 3.15, sale_price: 1.25, discount_pct: 60, expiry_date: '2025-12-01', stock_qty: 68, image_url: null },
  { name: 'Knorr Chicken Stock Cubes 60g (6 cubes)', description: 'Flavour-packed chicken stock cubes for soups and stews', category: 'cooking_essentials', original_price: 2.10, sale_price: 0.85, discount_pct: 60, expiry_date: '2025-11-15', stock_qty: 88, image_url: null },
  { name: 'FairPrice Instant Curry Powder 250g', description: 'Fragrant curry powder blend for meat & vegetable curries', category: 'cooking_essentials', original_price: 2.95, sale_price: 1.15, discount_pct: 61, expiry_date: '2025-09-25', stock_qty: 72, image_url: null },

  // ── PERSONAL CARE ─────────────────────────────────────
  { name: 'Lifebuoy Antibacterial Body Wash 900ml', description: 'Sea minerals & salt formula, 10x better germ protection', category: 'personal_care', original_price: 6.45, sale_price: 2.60, discount_pct: 60, expiry_date: '2025-08-20', stock_qty: 58, image_url: null },
  { name: 'Dove Deeply Nourishing Body Wash 1L', description: 'Gentle nourishing body wash with ¼ moisturising cream', category: 'personal_care', original_price: 8.50, sale_price: 3.40, discount_pct: 60, expiry_date: '2025-07-25', stock_qty: 50, image_url: null },
  { name: 'Sunsilk Smooth & Manageable Shampoo 650ml', description: 'Anti-frizz shampoo with keratin & argan oil', category: 'personal_care', original_price: 6.90, sale_price: 2.75, discount_pct: 60, expiry_date: '2025-09-15', stock_qty: 52, image_url: null },
  { name: 'Head & Shoulders Anti-Dandruff Shampoo 650ml', description: 'Classic anti-dandruff formula with Pyrithione Zinc', category: 'personal_care', original_price: 11.90, sale_price: 4.80, discount_pct: 60, expiry_date: '2025-08-05', stock_qty: 46, image_url: null },
  { name: 'Glow & Lovely Advanced Multivitamin Face Cream 50g', description: 'Daily face cream with Vitamin B3 for radiant glow', category: 'personal_care', original_price: 4.50, sale_price: 1.80, discount_pct: 60, expiry_date: '2025-07-10', stock_qty: 80, image_url: null },
  { name: 'Vaseline Intensive Care Body Lotion 400ml', description: 'Deep moisturising lotion with micro-droplets of Vaseline jelly', category: 'personal_care', original_price: 7.90, sale_price: 3.15, discount_pct: 60, expiry_date: '2025-10-30', stock_qty: 48, image_url: null },
  { name: 'Colgate Anticavity Toothpaste 225g', description: 'Fluoride toothpaste for strong teeth & fresh breath', category: 'personal_care', original_price: 4.15, sale_price: 1.65, discount_pct: 60, expiry_date: '2026-01-20', stock_qty: 95, image_url: null },

  // ── SNACKS ────────────────────────────────────────────
  { name: "Lay's Classic Potato Chips 170g", description: 'Crispy classic salted potato chips, popular party snack', category: 'snacks', original_price: 5.35, sale_price: 2.10, discount_pct: 61, expiry_date: '2025-08-30', stock_qty: 85, image_url: null },
  { name: 'Britannia Good Day Butter Cookies 216g', description: 'Crunchy buttery cookies, popular Indian biscuit brand', category: 'snacks', original_price: 3.50, sale_price: 1.40, discount_pct: 60, expiry_date: '2025-10-05', stock_qty: 75, image_url: null },

  // ── DAIRY ─────────────────────────────────────────────
  { name: 'Dutch Lady Full Cream UHT Milk 1L', description: 'Full cream UHT milk, long shelf life, rich & creamy', category: 'dairy', original_price: 2.70, sale_price: 1.05, discount_pct: 61, expiry_date: '2025-09-10', stock_qty: 68, image_url: null },
]

export async function POST() {
  // Auth check: only admins can seed products
  const serverSupabase = await createClient()
  const { data: { user } } = await serverSupabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { data: profile } = await serverSupabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createAdminClient()

  // Check if already seeded
  const { count } = await supabase.from('products').select('*', { count: 'exact', head: true })
  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: 'Products already seeded. Delete existing products first.' }, { status: 409 })
  }

  const { error, data } = await supabase
    .from('products')
    .insert(SEED_PRODUCTS.map((p) => ({ ...p, is_active: true })))
    .select('id')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ seeded: data?.length ?? 0 })
}

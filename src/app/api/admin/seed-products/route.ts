import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// Seed data — must stay in lock-step with supabase/seed.sql.
//
// Legacy grocery SKUs: stock_qty = 0 so they only show on the hidden
// /out-of-stock page (the store filters stock_qty > 0).
//
// GSK catalogue SKUs (from Chuan Seng Leong "GSK - Products Catalogue 2026"
// pages 1-5): original_price = RSP, sale_price = round(RSP * 0.9, 2),
// discount_pct = 10. Stock = 1000, expiry = 2027-12-31 (PDF has no expiry).
const SEED_PRODUCTS = [
  // ── LEGACY GROCERY (out of stock) ───────────────────────────
  { name: 'Coca-Cola Classic 24 x 320ml', description: 'Refreshing classic cola drink, 24 cans', category: 'beverages', original_price: 15.90, sale_price: 5.90, discount_pct: 63, expiry_date: '2025-09-30', stock_qty: 0, image_url: null },
  { name: 'Red Bull Energy Drink 4 x 250ml', description: 'Original energy drink with caffeine & taurine, 4 cans', category: 'beverages', original_price: 9.70, sale_price: 3.50, discount_pct: 64, expiry_date: '2025-08-15', stock_qty: 0, image_url: null },
  { name: 'Pokka Green Tea 24 x 300ml', description: 'Japanese-style green tea, no preservatives, 24 bottles', category: 'beverages', original_price: 14.40, sale_price: 5.50, discount_pct: 62, expiry_date: '2025-10-20', stock_qty: 0, image_url: null },
  { name: 'Milo 3-in-1 Instant Drink 15 sachets x 27g', description: 'Chocolate malt drink with milk, just add hot water', category: 'beverages', original_price: 7.95, sale_price: 2.90, discount_pct: 64, expiry_date: '2025-11-10', stock_qty: 0, image_url: null },
  { name: 'Tata Tea Premium Leaf Tea 250g', description: 'Strong Indian-style black tea, loose leaf', category: 'beverages', original_price: 5.30, sale_price: 2.10, discount_pct: 60, expiry_date: '2025-12-05', stock_qty: 0, image_url: null },
  { name: '100Plus Isotonic Drink 24 x 325ml', description: 'Isotonic sports drink with electrolytes, 24 cans', category: 'beverages', original_price: 14.90, sale_price: 5.50, discount_pct: 63, expiry_date: '2025-09-20', stock_qty: 0, image_url: null },
  { name: 'Indomie Mi Goreng Fried Noodles 5 x 80g', description: "Indonesia's most popular instant fried noodles, spicy", category: 'instant_noodles', original_price: 2.25, sale_price: 0.90, discount_pct: 60, expiry_date: '2025-07-15', stock_qty: 0, image_url: null },
  { name: 'Maggi 2-Minute Noodles Curry Flavour 5 x 79g', description: 'Classic curry-flavoured instant noodles', category: 'instant_noodles', original_price: 2.57, sale_price: 1.00, discount_pct: 61, expiry_date: '2025-08-10', stock_qty: 0, image_url: null },
  { name: 'Maggi 2-Minute Noodles Chicken Flavour 5 x 77g', description: 'Chicken-flavoured instant noodles, quick to cook', category: 'instant_noodles', original_price: 2.57, sale_price: 1.00, discount_pct: 61, expiry_date: '2025-07-30', stock_qty: 0, image_url: null },
  { name: 'Nissin Cup Noodles Seafood 6 x 75g', description: 'Japanese-style seafood cup noodles, just add hot water', category: 'instant_noodles', original_price: 6.90, sale_price: 2.80, discount_pct: 59, expiry_date: '2025-09-05', stock_qty: 0, image_url: null },
  { name: 'Ayam Brand Sardines in Tomato Sauce 215g', description: 'Tender sardines in rich tomato sauce, ready to eat', category: 'canned_goods', original_price: 2.15, sale_price: 0.85, discount_pct: 60, expiry_date: '2025-12-20', stock_qty: 0, image_url: null },
  { name: 'Ayam Brand Tuna Chunks in Water 185g', description: 'Skipjack tuna chunks in spring water, high protein', category: 'canned_goods', original_price: 2.40, sale_price: 0.95, discount_pct: 60, expiry_date: '2025-11-30', stock_qty: 0, image_url: null },
  { name: 'Ligo Sardines in Corn Oil 155g', description: 'Tender sardines in corn oil, popular Filipino-style brand', category: 'canned_goods', original_price: 1.60, sale_price: 0.65, discount_pct: 59, expiry_date: '2025-10-15', stock_qty: 0, image_url: null },
  { name: 'FairPrice Baked Beans in Tomato Sauce 420g', description: 'Hearty baked beans in tomato sauce, great with rice', category: 'canned_goods', original_price: 1.25, sale_price: 0.50, discount_pct: 60, expiry_date: '2026-01-10', stock_qty: 0, image_url: null },
  { name: 'Royal Umbrella Thai Jasmine Rice 5kg', description: 'Premium Thai hom mali fragrant rice, long grain', category: 'rice_grains', original_price: 11.25, sale_price: 4.50, discount_pct: 60, expiry_date: '2025-12-15', stock_qty: 0, image_url: null },
  { name: 'India Gate Basmati Rice (Classic) 2kg', description: 'Extra-long aged basmati rice from India, fragrant', category: 'rice_grains', original_price: 8.95, sale_price: 3.50, discount_pct: 61, expiry_date: '2025-11-20', stock_qty: 0, image_url: null },
  { name: 'Knife Brand Cooking Oil 2L', description: 'Refined palm olein cooking oil, suitable for deep frying', category: 'cooking_essentials', original_price: 5.40, sale_price: 2.10, discount_pct: 61, expiry_date: '2025-10-10', stock_qty: 0, image_url: null },
  { name: 'Maggi Oyster Sauce 510g', description: 'Rich umami oyster sauce, essential for Asian cooking', category: 'cooking_essentials', original_price: 3.15, sale_price: 1.25, discount_pct: 60, expiry_date: '2025-12-01', stock_qty: 0, image_url: null },
  { name: 'Knorr Chicken Stock Cubes 60g (6 cubes)', description: 'Flavour-packed chicken stock cubes for soups and stews', category: 'cooking_essentials', original_price: 2.10, sale_price: 0.85, discount_pct: 60, expiry_date: '2025-11-15', stock_qty: 0, image_url: null },
  { name: 'FairPrice Instant Curry Powder 250g', description: 'Fragrant curry powder blend, suitable for meat & vegetable curries', category: 'cooking_essentials', original_price: 2.95, sale_price: 1.15, discount_pct: 61, expiry_date: '2025-09-25', stock_qty: 0, image_url: null },
  { name: 'Lifebuoy Antibacterial Body Wash 900ml', description: 'Sea minerals & salt formula, 10x better germ protection', category: 'personal_care', original_price: 6.45, sale_price: 2.60, discount_pct: 60, expiry_date: '2025-08-20', stock_qty: 0, image_url: null },
  { name: 'Dove Deeply Nourishing Body Wash 1L', description: 'Gentle nourishing body wash with 1/4 moisturising cream', category: 'personal_care', original_price: 8.50, sale_price: 3.40, discount_pct: 60, expiry_date: '2025-07-25', stock_qty: 0, image_url: null },
  { name: 'Sunsilk Smooth & Manageable Shampoo 650ml', description: 'Anti-frizz shampoo with keratin & argan oil', category: 'personal_care', original_price: 6.90, sale_price: 2.75, discount_pct: 60, expiry_date: '2025-09-15', stock_qty: 0, image_url: null },
  { name: 'Head & Shoulders Anti-Dandruff Shampoo 650ml', description: 'Classic anti-dandruff formula with Pyrithione Zinc', category: 'personal_care', original_price: 11.90, sale_price: 4.80, discount_pct: 60, expiry_date: '2025-08-05', stock_qty: 0, image_url: null },
  { name: 'Glow & Lovely Advanced Multivitamin Face Cream 50g', description: 'Daily face cream with Vitamin B3 for radiant glow', category: 'personal_care', original_price: 4.50, sale_price: 1.80, discount_pct: 60, expiry_date: '2025-07-10', stock_qty: 0, image_url: null },
  { name: 'Vaseline Intensive Care Body Lotion 400ml', description: 'Deep moisturising lotion with micro-droplets of Vaseline jelly', category: 'personal_care', original_price: 7.90, sale_price: 3.15, discount_pct: 60, expiry_date: '2025-10-30', stock_qty: 0, image_url: null },
  { name: 'Colgate Anticavity Toothpaste 225g', description: 'Fluoride toothpaste for strong teeth & fresh breath', category: 'personal_care', original_price: 4.15, sale_price: 1.65, discount_pct: 60, expiry_date: '2026-01-20', stock_qty: 0, image_url: null },
  { name: "Lay's Classic Potato Chips 170g", description: 'Crispy classic salted potato chips, popular party snack', category: 'snacks', original_price: 5.35, sale_price: 2.10, discount_pct: 61, expiry_date: '2025-08-30', stock_qty: 0, image_url: null },
  { name: 'Britannia Good Day Butter Cookies 216g', description: 'Crunchy buttery cookies, popular Indian biscuit brand', category: 'snacks', original_price: 3.50, sale_price: 1.40, discount_pct: 60, expiry_date: '2025-10-05', stock_qty: 0, image_url: null },
  { name: 'Dutch Lady Full Cream UHT Milk 1L', description: 'Full cream UHT milk, long shelf life, rich & creamy', category: 'dairy', original_price: 2.70, sale_price: 1.05, discount_pct: 61, expiry_date: '2025-09-10', stock_qty: 0, image_url: null },

  // ── GSK CATALOGUE (pages 1-5, 10% off RSP, in stock) ────────
  // Panadol
  { name: 'Panadol Optizorb 500mg (20 caplets)', description: 'Paracetamol 500mg with Optizorb technology — fast relief for headache, body ache and fever. Pack of 20 caplets.', category: 'pain_relief', original_price: 7.95, sale_price: 7.16, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010362.png' },
  { name: 'Panadol Extra Optizorb 500mg (20 caplets)', description: 'Paracetamol 500mg + caffeine 65mg. Extra-strength relief with Optizorb fast-absorption technology. Pack of 20 caplets.', category: 'pain_relief', original_price: 9.95, sale_price: 8.96, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010430.png' },
  { name: 'Panadol Extra Optizorb 500mg (120 caplets)', description: 'Paracetamol 500mg + caffeine 65mg for extra-strength relief. Family value pack of 120 caplets.', category: 'pain_relief', original_price: 55.75, sale_price: 50.18, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71080447.png' },
  { name: 'Panadol Extra Optizorb 500mg (30 caplets)', description: 'Paracetamol 500mg + caffeine 65mg with Optizorb fast-absorption technology. Pack of 30 caplets.', category: 'pain_relief', original_price: 13.25, sale_price: 11.93, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71011284.png' },
  { name: 'Panadol Actifast 500mg (20 caplets)', description: 'Paracetamol 500mg with sodium bicarbonate for faster absorption — relief in minutes. Pack of 20 caplets.', category: 'pain_relief', original_price: 11.75, sale_price: 10.58, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010515.png' },
  { name: 'Panadol Extend 665mg (18 caplets)', description: 'Extended-release paracetamol 665mg for up to 8 hours of relief from muscle and joint pain. Pack of 18 caplets.', category: 'pain_relief', original_price: 9.95, sale_price: 8.96, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010608.png' },
  { name: 'Panadol Menstrual 500mg (20 caplets)', description: 'Paracetamol 500mg + pamabrom to relieve menstrual cramps, bloating and headache. Pack of 20 caplets.', category: 'pain_relief', original_price: 9.95, sale_price: 8.96, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71012013.png' },
  { name: 'Panadol Cold & Flu Hot Remedy 500mg (5 sachets)', description: 'Hot lemon drink with paracetamol, phenylephrine and vitamin C to relieve cold and flu symptoms. Pack of 5 sachets.', category: 'pain_relief', original_price: 8.75, sale_price: 7.88, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010110.png' },
  { name: 'Panadol Cold & Flu Cold Relief 500mg (12 caplets)', description: 'Paracetamol, phenylephrine and caffeine to relieve blocked nose, headache and body ache from a cold. Pack of 12 caplets.', category: 'pain_relief', original_price: 11.95, sale_price: 10.76, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010294.png' },
  { name: 'Panadol Cold & Flu Cough & Cold (16 caplets)', description: 'Paracetamol 500mg + phenylephrine + dextromethorphan — relieves cold symptoms plus dry cough. Pack of 16 caplets.', category: 'pain_relief', original_price: 14.45, sale_price: 13.01, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71001414.png' },
  { name: 'Panadol Cold & Flu Sinus Max 500mg (12 caplets)', description: 'Paracetamol 500mg + phenylephrine targets sinus pressure, headache and congestion. Pack of 12 caplets.', category: 'pain_relief', original_price: 11.95, sale_price: 10.76, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010899.png' },
  { name: 'Panadol MiniCaps 500mg (12 caplets)', description: 'Smaller, smooth-coated paracetamol 500mg caplets — easier to swallow. Pack of 12 caplets.', category: 'pain_relief', original_price: 8.75, sale_price: 7.88, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010561.png' },
  { name: 'Panadol Baby Suspension 1 month+ Strawberry (60ml)', description: 'Paracetamol 120mg/5ml oral suspension for babies from 1 month. Sugar-free strawberry flavour. 60ml bottle.', category: 'pain_relief', original_price: 9.75, sale_price: 8.78, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71019302.png' },
  { name: 'Panadol Kids Suspension 1-12 years (60ml)', description: 'Paracetamol 120mg/5ml oral suspension for children aged 1 to 12. Gentle on little tummies. 60ml bottle.', category: 'pain_relief', original_price: 10.75, sale_price: 9.68, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010691.png' },
  { name: 'Panadol Kid Chewable 120mg Cherry (24 tablets)', description: 'Chewable paracetamol 120mg tablets for children — cherry flavour. Pack of 24 tablets.', category: 'pain_relief', original_price: 8.75, sale_price: 7.88, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71010315.png' },

  // Panaflex
  { name: 'Panadol Panaflex Hydro Heat Patch (2 patches)', description: 'Hydrogel heat patch delivers soothing warmth to relieve muscle and joint pain. 2 patches per pack.', category: 'pain_relief', original_price: 4.05, sale_price: 3.65, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71011025.png' },
  { name: 'Panadol Panaflex Heat Gel Patch (4 patches)', description: 'Cooling-to-warming gel patch for targeted relief of back, neck and shoulder pain. 4 patches per pack.', category: 'pain_relief', original_price: 7.30, sale_price: 6.57, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71011056.png' },
  { name: 'Panadol Panaflex Hot Patch (5 patches)', description: 'Self-heating patch that loosens stiff muscles and soothes aches. 5 patches per pack.', category: 'pain_relief', original_price: 6.60, sale_price: 5.94, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71014536.png' },

  // Voltaren
  { name: 'Voltaren Emulgel 2% (50g)', description: 'Diclofenac diethylammonium 2% topical gel — 12-hour relief for back, muscle and joint pain. 50g tube.', category: 'pain_relief', original_price: 25.15, sale_price: 22.64, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/71021784.png' },

  // Aquafresh
  { name: 'Aquafresh Kids Little Teeth Toothpaste 3-5 yrs (50ml)', description: "Fluoride toothpaste with a mild mint flavour, formulated for children's baby teeth. 50ml tube.", category: 'oral_care', original_price: 7.60, sale_price: 6.84, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72016713.png' },
  { name: 'Aquafresh Kids Big Teeth Toothpaste 6+ yrs (50ml)', description: 'Fluoride toothpaste for children transitioning to adult teeth. Gentle mint flavour. 50ml tube.', category: 'oral_care', original_price: 7.60, sale_price: 6.84, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72016720.png' },
  { name: 'Aquafresh Kids Little Teeth Toothpaste 3-5 yrs Value Pack (2 x 50ml)', description: 'Twin-pack of Aquafresh Little Teeth — fluoride toothpaste for kids aged 3-5. 2 x 50ml tubes.', category: 'oral_care', original_price: 12.35, sale_price: 11.12, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72018810.png' },
  { name: 'Aquafresh Kids Big Teeth Toothpaste 6+ yrs Value Pack (2 x 50ml)', description: 'Twin-pack of Aquafresh Big Teeth — fluoride toothpaste for kids 6 and above. 2 x 50ml tubes.', category: 'oral_care', original_price: 12.35, sale_price: 11.12, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72018827.png' },
  { name: 'Aquafresh Kids Milk Teeth Toothbrush 0-2 yrs', description: "Ultra-soft toothbrush with a small head and easy-grip handle, designed for baby's first teeth.", category: 'oral_care', original_price: 6.45, sale_price: 5.81, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72010929.png' },
  { name: 'Aquafresh Kids Little Teeth Toothbrush 3-5 yrs', description: 'Soft-bristle toothbrush with a chunky handle, sized for little hands and little teeth.', category: 'oral_care', original_price: 6.45, sale_price: 5.81, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72011759.png' },
  { name: 'Aquafresh Clean & Control Toothbrush Soft (3-pack)', description: 'Soft-bristle toothbrush with raised cleaning tips to reach between teeth. Pack of 3.', category: 'oral_care', original_price: 5.85, sale_price: 5.27, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72011480.png' },
  { name: 'Aquafresh Clean & Control Toothbrush Medium (3-pack)', description: 'Medium-bristle toothbrush with raised cleaning tips for everyday plaque removal. Pack of 3.', category: 'oral_care', original_price: 5.85, sale_price: 5.27, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72011473.png' },
  { name: 'Aquafresh Clean & Flex Toothbrush Soft (3-pack)', description: 'Flexible-neck toothbrush with soft bristles — gentle cleaning without gum irritation. Pack of 3.', category: 'oral_care', original_price: 5.85, sale_price: 5.27, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72010142.png' },
  { name: 'Aquafresh Clean & Flex Toothbrush Medium (3-pack)', description: 'Flexible-neck toothbrush with medium bristles for thorough daily cleaning. Pack of 3.', category: 'oral_care', original_price: 5.85, sale_price: 5.27, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72010159.png' },

  // Parodontax
  { name: 'Parodontax Daily Fluoride Toothpaste (90g)', description: 'Daily toothpaste with fluoride and stannous salts — helps stop and prevent bleeding gums. 90g tube.', category: 'oral_care', original_price: 9.65, sale_price: 8.69, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72028506.png' },
  { name: 'Parodontax Daily Whitening Toothpaste (90g)', description: 'Whitening toothpaste that also helps prevent bleeding gums. Gently removes surface stains. 90g tube.', category: 'oral_care', original_price: 9.20, sale_price: 8.28, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72023423.png' },
  { name: 'Parodontax Herbal Toothpaste (90g)', description: 'Herbal formulation with ginger, mint and eucalyptus — helps fight plaque and improve gum health. 90g tube.', category: 'oral_care', original_price: 9.65, sale_price: 8.69, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72023447.png' },

  // Polident
  { name: 'Polident 3-Minute Daily Denture Cleanser (36 tablets)', description: 'Effervescent cleansing tablets kill 99.9% of odour-causing bacteria on dentures in just 3 minutes. 36 tablets.', category: 'denture_care', original_price: 9.10, sale_price: 8.19, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72065160.png' },
  { name: 'Polident Whitening Daily Denture Cleanser (36 tablets)', description: 'Whitening effervescent tablets lift stains and freshen dentures daily. 36 tablets.', category: 'denture_care', original_price: 9.85, sale_price: 8.87, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72061107.png' },
  { name: 'Polident Pro Retainer Daily Cleanser (36 tablets)', description: 'Gentle effervescent tablets formulated for retainers, aligners and mouth guards. 36 tablets.', category: 'denture_care', original_price: 10.50, sale_price: 9.45, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72034758.png' },
  { name: 'Polident 3-Minute Daily Denture Cleanser Twin Pack (2 x 36 tablets)', description: 'Twin pack of Polident 3-Minute — effervescent tablets that clean dentures in minutes. 2 x 36 tablets.', category: 'denture_care', original_price: 13.85, sale_price: 12.47, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72038292.png' },
  { name: 'Polident Whitening Denture Cleanser Twin Pack (2 x 36 tablets)', description: 'Twin pack of Polident Whitening — lifts stains and freshens dentures daily. 2 x 36 tablets.', category: 'denture_care', original_price: 14.95, sale_price: 13.46, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72038285.png' },
  { name: 'Polident 3-Minute Daily Denture Cleanser Value Pack (16 + 2 tablets)', description: 'Starter value pack — 18 effervescent cleansing tablets for dentures. Cleans in 3 minutes.', category: 'denture_care', original_price: 5.00, sale_price: 4.50, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72035922.png' },
  { name: 'Polident Denture Adhesive Cream Fresh Mint (60g)', description: 'All-day hold denture adhesive with a fresh mint flavour. Seals out food particles. 60g tube.', category: 'denture_care', original_price: 14.00, sale_price: 12.60, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72035382.png' },
  { name: 'Polident Denture Adhesive Cream Flavour Free (60g)', description: 'All-day hold denture adhesive with no added flavour — for sensitive palates. 60g tube.', category: 'denture_care', original_price: 14.00, sale_price: 12.60, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72039381.png' },
  { name: 'Polident Max Hold & Seal Denture Adhesive (40g)', description: 'Extra-strong hold and seal formula — locks out food particles all day. 40g tube.', category: 'denture_care', original_price: 11.90, sale_price: 10.71, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72037841.png' },
  { name: 'Polident Max Hold & Seal Denture Adhesive (70g)', description: 'Extra-strong hold and seal formula in a larger value tube. Locks out food particles all day. 70g tube.', category: 'denture_care', original_price: 18.90, sale_price: 17.01, discount_pct: 10, expiry_date: '2027-12-31', stock_qty: 1000, image_url: '/products/72037827.png' },
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

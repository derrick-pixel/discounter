-- ============================================================
-- Discounter SG — Seed data: 30 starter SKUs
-- Products popular with Indian / Bangladeshi foreign workers
-- All items have < 9 months shelf life remaining (short-dated)
-- Prices based on NTUC FairPrice / Sheng Siong retail, Apr 2025
-- ============================================================

insert into products (name, description, category, original_price, sale_price, discount_pct, expiry_date, stock_qty, image_url, is_active) values

-- ── BEVERAGES ──────────────────────────────────────────────
(
  'Coca-Cola Classic 24 x 320ml',
  'Refreshing classic cola drink, 24 cans',
  'beverages', 15.90, 5.90, 63, '2025-09-30', 48, null, true
),
(
  'Red Bull Energy Drink 4 x 250ml',
  'Original energy drink with caffeine & taurine, 4 cans',
  'beverages', 9.70, 3.50, 64, '2025-08-15', 72, null, true
),
(
  'Pokka Green Tea 24 x 300ml',
  'Japanese-style green tea, no preservatives, 24 bottles',
  'beverages', 14.40, 5.50, 62, '2025-10-20', 60, null, true
),
(
  'Milo 3-in-1 Instant Drink 15 sachets x 27g',
  'Chocolate malt drink with milk, just add hot water',
  'beverages', 7.95, 2.90, 64, '2025-11-10', 65, null, true
),
(
  'Tata Tea Premium Leaf Tea 250g',
  'Strong Indian-style black tea, loose leaf',
  'beverages', 5.30, 2.10, 60, '2025-12-05', 44, null, true
),
(
  '100Plus Isotonic Drink 24 x 325ml',
  'Isotonic sports drink with electrolytes, 24 cans',
  'beverages', 14.90, 5.50, 63, '2025-09-20', 55, null, true
),

-- ── INSTANT NOODLES ───────────────────────────────────────
(
  'Indomie Mi Goreng Fried Noodles 5 x 80g',
  'Indonesia's most popular instant fried noodles, spicy',
  'instant_noodles', 2.25, 0.90, 60, '2025-07-15', 180, null, true
),
(
  'Maggi 2-Minute Noodles Curry Flavour 5 x 79g',
  'Classic curry-flavoured instant noodles',
  'instant_noodles', 2.57, 1.00, 61, '2025-08-10', 145, null, true
),
(
  'Maggi 2-Minute Noodles Chicken Flavour 5 x 77g',
  'Chicken-flavoured instant noodles, quick to cook',
  'instant_noodles', 2.57, 1.00, 61, '2025-07-30', 130, null, true
),
(
  'Nissin Cup Noodles Seafood 6 x 75g',
  'Japanese-style seafood cup noodles, just add hot water',
  'instant_noodles', 6.90, 2.80, 59, '2025-09-05', 90, null, true
),

-- ── CANNED GOODS ─────────────────────────────────────────
(
  'Ayam Brand Sardines in Tomato Sauce 215g',
  'Tender sardines in rich tomato sauce, ready to eat',
  'canned_goods', 2.15, 0.85, 60, '2025-12-20', 120, null, true
),
(
  'Ayam Brand Tuna Chunks in Water 185g',
  'Skipjack tuna chunks in spring water, high protein',
  'canned_goods', 2.40, 0.95, 60, '2025-11-30', 100, null, true
),
(
  'Ligo Sardines in Corn Oil 155g',
  'Tender sardines in corn oil, popular Filipino-style brand',
  'canned_goods', 1.60, 0.65, 59, '2025-10-15', 95, null, true
),
(
  'FairPrice Baked Beans in Tomato Sauce 420g',
  'Hearty baked beans in tomato sauce, great with rice',
  'canned_goods', 1.25, 0.50, 60, '2026-01-10', 110, null, true
),

-- ── RICE & GRAINS ─────────────────────────────────────────
(
  'Royal Umbrella Thai Jasmine Rice 5kg',
  'Premium Thai hom mali fragrant rice, long grain',
  'rice_grains', 11.25, 4.50, 60, '2025-12-15', 38, null, true
),
(
  'India Gate Basmati Rice (Classic) 2kg',
  'Extra-long aged basmati rice from India, fragrant',
  'rice_grains', 8.95, 3.50, 61, '2025-11-20', 42, null, true
),

-- ── COOKING ESSENTIALS ────────────────────────────────────
(
  'Knife Brand Cooking Oil 2L',
  'Refined palm olein cooking oil, suitable for deep frying',
  'cooking_essentials', 5.40, 2.10, 61, '2025-10-10', 55, null, true
),
(
  'Maggi Oyster Sauce 510g',
  'Rich umami oyster sauce, essential for Asian cooking',
  'cooking_essentials', 3.15, 1.25, 60, '2025-12-01', 68, null, true
),
(
  'Knorr Chicken Stock Cubes 60g (6 cubes)',
  'Flavour-packed chicken stock cubes for soups and stews',
  'cooking_essentials', 2.10, 0.85, 60, '2025-11-15', 88, null, true
),
(
  'FairPrice Instant Curry Powder 250g',
  'Fragrant curry powder blend, suitable for meat & vegetable curries',
  'cooking_essentials', 2.95, 1.15, 61, '2025-09-25', 72, null, true
),

-- ── PERSONAL CARE ─────────────────────────────────────────
(
  'Lifebuoy Antibacterial Body Wash 900ml',
  'Sea minerals & salt formula, 10x better germ protection',
  'personal_care', 6.45, 2.60, 60, '2025-08-20', 58, null, true
),
(
  'Dove Deeply Nourishing Body Wash 1L',
  'Gentle nourishing body wash with 1/4 moisturising cream',
  'personal_care', 8.50, 3.40, 60, '2025-07-25', 50, null, true
),
(
  'Sunsilk Smooth & Manageable Shampoo 650ml',
  'Anti-frizz shampoo with keratin & argan oil',
  'personal_care', 6.90, 2.75, 60, '2025-09-15', 52, null, true
),
(
  'Head & Shoulders Anti-Dandruff Shampoo 650ml',
  'Classic anti-dandruff formula with Pyrithione Zinc',
  'personal_care', 11.90, 4.80, 60, '2025-08-05', 46, null, true
),
(
  'Glow & Lovely Advanced Multivitamin Face Cream 50g',
  'Daily face cream with Vitamin B3 for radiant glow',
  'personal_care', 4.50, 1.80, 60, '2025-07-10', 80, null, true
),
(
  'Vaseline Intensive Care Body Lotion 400ml',
  'Deep moisturising lotion with micro-droplets of Vaseline jelly',
  'personal_care', 7.90, 3.15, 60, '2025-10-30', 48, null, true
),
(
  'Colgate Anticavity Toothpaste 225g',
  'Fluoride toothpaste for strong teeth & fresh breath',
  'personal_care', 4.15, 1.65, 60, '2026-01-20', 95, null, true
),

-- ── SNACKS ────────────────────────────────────────────────
(
  'Lay''s Classic Potato Chips 170g',
  'Crispy classic salted potato chips, popular party snack',
  'snacks', 5.35, 2.10, 61, '2025-08-30', 85, null, true
),
(
  'Britannia Good Day Butter Cookies 216g',
  'Crunchy buttery cookies, popular Indian biscuit brand',
  'snacks', 3.50, 1.40, 60, '2025-10-05', 75, null, true
),

-- ── DAIRY ─────────────────────────────────────────────────
(
  'Dutch Lady Full Cream UHT Milk 1L',
  'Full cream UHT milk, long shelf life, rich & creamy',
  'dairy', 2.70, 1.05, 61, '2025-09-10', 68, null, true
);

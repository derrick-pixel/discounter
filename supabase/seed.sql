-- ============================================================
-- Discounter SG — Seed data
-- ============================================================
-- Legacy FMCG/grocery SKUs are seeded with stock_qty = 0 so they
-- appear on the hidden /out-of-stock page while the main store hides
-- them (the store filters stock_qty > 0).
--
-- GSK catalogue SKUs (pages 1-5 of Chuan Seng Leong's "GSK - Products
-- Catalogue 2026") use RSP as original_price with a flat 10% discount.
-- ============================================================

-- ── LEGACY GROCERY SKUs (all out of stock) ────────────────────
insert into products (name, description, category, original_price, sale_price, discount_pct, expiry_date, stock_qty, image_url, is_active) values

-- Beverages
('Coca-Cola Classic 24 x 320ml', 'Refreshing classic cola drink, 24 cans', 'beverages', 15.90, 5.90, 63, '2025-09-30', 0, null, true),
('Red Bull Energy Drink 4 x 250ml', 'Original energy drink with caffeine & taurine, 4 cans', 'beverages', 9.70, 3.50, 64, '2025-08-15', 0, null, true),
('Pokka Green Tea 24 x 300ml', 'Japanese-style green tea, no preservatives, 24 bottles', 'beverages', 14.40, 5.50, 62, '2025-10-20', 0, null, true),
('Milo 3-in-1 Instant Drink 15 sachets x 27g', 'Chocolate malt drink with milk, just add hot water', 'beverages', 7.95, 2.90, 64, '2025-11-10', 0, null, true),
('Tata Tea Premium Leaf Tea 250g', 'Strong Indian-style black tea, loose leaf', 'beverages', 5.30, 2.10, 60, '2025-12-05', 0, null, true),
('100Plus Isotonic Drink 24 x 325ml', 'Isotonic sports drink with electrolytes, 24 cans', 'beverages', 14.90, 5.50, 63, '2025-09-20', 0, null, true),

-- Instant noodles
('Indomie Mi Goreng Fried Noodles 5 x 80g', 'Indonesia''s most popular instant fried noodles, spicy', 'instant_noodles', 2.25, 0.90, 60, '2025-07-15', 0, null, true),
('Maggi 2-Minute Noodles Curry Flavour 5 x 79g', 'Classic curry-flavoured instant noodles', 'instant_noodles', 2.57, 1.00, 61, '2025-08-10', 0, null, true),
('Maggi 2-Minute Noodles Chicken Flavour 5 x 77g', 'Chicken-flavoured instant noodles, quick to cook', 'instant_noodles', 2.57, 1.00, 61, '2025-07-30', 0, null, true),
('Nissin Cup Noodles Seafood 6 x 75g', 'Japanese-style seafood cup noodles, just add hot water', 'instant_noodles', 6.90, 2.80, 59, '2025-09-05', 0, null, true),

-- Canned goods
('Ayam Brand Sardines in Tomato Sauce 215g', 'Tender sardines in rich tomato sauce, ready to eat', 'canned_goods', 2.15, 0.85, 60, '2025-12-20', 0, null, true),
('Ayam Brand Tuna Chunks in Water 185g', 'Skipjack tuna chunks in spring water, high protein', 'canned_goods', 2.40, 0.95, 60, '2025-11-30', 0, null, true),
('Ligo Sardines in Corn Oil 155g', 'Tender sardines in corn oil, popular Filipino-style brand', 'canned_goods', 1.60, 0.65, 59, '2025-10-15', 0, null, true),
('FairPrice Baked Beans in Tomato Sauce 420g', 'Hearty baked beans in tomato sauce, great with rice', 'canned_goods', 1.25, 0.50, 60, '2026-01-10', 0, null, true),

-- Rice & grains
('Royal Umbrella Thai Jasmine Rice 5kg', 'Premium Thai hom mali fragrant rice, long grain', 'rice_grains', 11.25, 4.50, 60, '2025-12-15', 0, null, true),
('India Gate Basmati Rice (Classic) 2kg', 'Extra-long aged basmati rice from India, fragrant', 'rice_grains', 8.95, 3.50, 61, '2025-11-20', 0, null, true),

-- Cooking essentials
('Knife Brand Cooking Oil 2L', 'Refined palm olein cooking oil, suitable for deep frying', 'cooking_essentials', 5.40, 2.10, 61, '2025-10-10', 0, null, true),
('Maggi Oyster Sauce 510g', 'Rich umami oyster sauce, essential for Asian cooking', 'cooking_essentials', 3.15, 1.25, 60, '2025-12-01', 0, null, true),
('Knorr Chicken Stock Cubes 60g (6 cubes)', 'Flavour-packed chicken stock cubes for soups and stews', 'cooking_essentials', 2.10, 0.85, 60, '2025-11-15', 0, null, true),
('FairPrice Instant Curry Powder 250g', 'Fragrant curry powder blend, suitable for meat & vegetable curries', 'cooking_essentials', 2.95, 1.15, 61, '2025-09-25', 0, null, true),

-- Personal care
('Lifebuoy Antibacterial Body Wash 900ml', 'Sea minerals & salt formula, 10x better germ protection', 'personal_care', 6.45, 2.60, 60, '2025-08-20', 0, null, true),
('Dove Deeply Nourishing Body Wash 1L', 'Gentle nourishing body wash with 1/4 moisturising cream', 'personal_care', 8.50, 3.40, 60, '2025-07-25', 0, null, true),
('Sunsilk Smooth & Manageable Shampoo 650ml', 'Anti-frizz shampoo with keratin & argan oil', 'personal_care', 6.90, 2.75, 60, '2025-09-15', 0, null, true),
('Head & Shoulders Anti-Dandruff Shampoo 650ml', 'Classic anti-dandruff formula with Pyrithione Zinc', 'personal_care', 11.90, 4.80, 60, '2025-08-05', 0, null, true),
('Glow & Lovely Advanced Multivitamin Face Cream 50g', 'Daily face cream with Vitamin B3 for radiant glow', 'personal_care', 4.50, 1.80, 60, '2025-07-10', 0, null, true),
('Vaseline Intensive Care Body Lotion 400ml', 'Deep moisturising lotion with micro-droplets of Vaseline jelly', 'personal_care', 7.90, 3.15, 60, '2025-10-30', 0, null, true),
('Colgate Anticavity Toothpaste 225g', 'Fluoride toothpaste for strong teeth & fresh breath', 'personal_care', 4.15, 1.65, 60, '2026-01-20', 0, null, true),

-- Snacks
('Lay''s Classic Potato Chips 170g', 'Crispy classic salted potato chips, popular party snack', 'snacks', 5.35, 2.10, 61, '2025-08-30', 0, null, true),
('Britannia Good Day Butter Cookies 216g', 'Crunchy buttery cookies, popular Indian biscuit brand', 'snacks', 3.50, 1.40, 60, '2025-10-05', 0, null, true),

-- Dairy
('Dutch Lady Full Cream UHT Milk 1L', 'Full cream UHT milk, long shelf life, rich & creamy', 'dairy', 2.70, 1.05, 61, '2025-09-10', 0, null, true);


-- ── GSK CATALOGUE SKUs (pages 1-5, 10% off RSP, in stock) ─────
-- Source: Chuan Seng Leong "GSK - Products Catalogue 2026" (March 2026).
-- original_price = RSP (9% GST); sale_price = round(RSP * 0.9, 2); discount_pct = 10.
insert into products (name, description, category, original_price, sale_price, discount_pct, expiry_date, stock_qty, image_url, is_active) values

-- Panadol (pain_relief)
('Panadol Optizorb 500mg (20 caplets)', 'Paracetamol 500mg with Optizorb technology — fast relief for headache, body ache and fever. Pack of 20 caplets.', 'pain_relief', 7.95, 7.16, 10, '2027-12-31', 1000, '/products/71010362.png', true),
('Panadol Extra Optizorb 500mg (20 caplets)', 'Paracetamol 500mg + caffeine 65mg. Extra-strength relief with Optizorb fast-absorption technology. Pack of 20 caplets.', 'pain_relief', 9.95, 8.96, 10, '2027-12-31', 1000, '/products/71010430.png', true),
('Panadol Extra Optizorb 500mg (120 caplets)', 'Paracetamol 500mg + caffeine 65mg for extra-strength relief. Family value pack of 120 caplets.', 'pain_relief', 55.75, 50.18, 10, '2027-12-31', 1000, '/products/71080447.png', true),
('Panadol Extra Optizorb 500mg (30 caplets)', 'Paracetamol 500mg + caffeine 65mg with Optizorb fast-absorption technology. Pack of 30 caplets.', 'pain_relief', 13.25, 11.93, 10, '2027-12-31', 1000, '/products/71011284.png', true),
('Panadol Actifast 500mg (20 caplets)', 'Paracetamol 500mg with sodium bicarbonate for faster absorption — relief in minutes. Pack of 20 caplets.', 'pain_relief', 11.75, 10.58, 10, '2027-12-31', 1000, '/products/71010515.png', true),
('Panadol Extend 665mg (18 caplets)', 'Extended-release paracetamol 665mg for up to 8 hours of relief from muscle and joint pain. Pack of 18 caplets.', 'pain_relief', 9.95, 8.96, 10, '2027-12-31', 1000, '/products/71010608.png', true),
('Panadol Menstrual 500mg (20 caplets)', 'Paracetamol 500mg + pamabrom to relieve menstrual cramps, bloating and headache. Pack of 20 caplets.', 'pain_relief', 9.95, 8.96, 10, '2027-12-31', 1000, '/products/71012013.png', true),
('Panadol Cold & Flu Hot Remedy 500mg (5 sachets)', 'Hot lemon drink with paracetamol, phenylephrine and vitamin C to relieve cold and flu symptoms. Pack of 5 sachets.', 'pain_relief', 8.75, 7.88, 10, '2027-12-31', 1000, '/products/71010110.png', true),
('Panadol Cold & Flu Cold Relief 500mg (12 caplets)', 'Paracetamol, phenylephrine and caffeine to relieve blocked nose, headache and body ache from a cold. Pack of 12 caplets.', 'pain_relief', 11.95, 10.76, 10, '2027-12-31', 1000, '/products/71010294.png', true),
('Panadol Cold & Flu Cough & Cold (16 caplets)', 'Paracetamol 500mg + phenylephrine + dextromethorphan — relieves cold symptoms plus dry cough. Pack of 16 caplets.', 'pain_relief', 14.45, 13.01, 10, '2027-12-31', 1000, '/products/71001414.png', true),
('Panadol Cold & Flu Sinus Max 500mg (12 caplets)', 'Paracetamol 500mg + phenylephrine targets sinus pressure, headache and congestion. Pack of 12 caplets.', 'pain_relief', 11.95, 10.76, 10, '2027-12-31', 1000, '/products/71010899.png', true),
('Panadol MiniCaps 500mg (12 caplets)', 'Smaller, smooth-coated paracetamol 500mg caplets — easier to swallow. Pack of 12 caplets.', 'pain_relief', 8.75, 7.88, 10, '2027-12-31', 1000, '/products/71010561.png', true),
('Panadol Baby Suspension 1 month+ Strawberry (60ml)', 'Paracetamol 120mg/5ml oral suspension for babies from 1 month. Sugar-free strawberry flavour. 60ml bottle.', 'pain_relief', 9.75, 8.78, 10, '2027-12-31', 1000, '/products/71019302.png', true),
('Panadol Kids Suspension 1-12 years (60ml)', 'Paracetamol 120mg/5ml oral suspension for children aged 1 to 12. Gentle on little tummies. 60ml bottle.', 'pain_relief', 10.75, 9.68, 10, '2027-12-31', 1000, '/products/71010691.png', true),
('Panadol Kid Chewable 120mg Cherry (24 tablets)', 'Chewable paracetamol 120mg tablets for children — cherry flavour. Pack of 24 tablets.', 'pain_relief', 8.75, 7.88, 10, '2027-12-31', 1000, '/products/71010315.png', true),

-- Panaflex (pain_relief)
('Panadol Panaflex Hydro Heat Patch (2 patches)', 'Hydrogel heat patch delivers soothing warmth to relieve muscle and joint pain. 2 patches per pack.', 'pain_relief', 4.05, 3.65, 10, '2027-12-31', 1000, '/products/71011025.png', true),
('Panadol Panaflex Heat Gel Patch (4 patches)', 'Cooling-to-warming gel patch for targeted relief of back, neck and shoulder pain. 4 patches per pack.', 'pain_relief', 7.30, 6.57, 10, '2027-12-31', 1000, '/products/71011056.png', true),
('Panadol Panaflex Hot Patch (5 patches)', 'Self-heating patch that loosens stiff muscles and soothes aches. 5 patches per pack.', 'pain_relief', 6.60, 5.94, 10, '2027-12-31', 1000, '/products/71014536.png', true),

-- Voltaren (pain_relief)
('Voltaren Emulgel 2% (50g)', 'Diclofenac diethylammonium 2% topical gel — 12-hour relief for back, muscle and joint pain. 50g tube.', 'pain_relief', 25.15, 22.64, 10, '2027-12-31', 1000, '/products/71021784.png', true),

-- Aquafresh (oral_care)
('Aquafresh Kids Little Teeth Toothpaste 3-5 yrs (50ml)', 'Fluoride toothpaste with a mild mint flavour, formulated for children''s baby teeth. 50ml tube.', 'oral_care', 7.60, 6.84, 10, '2027-12-31', 1000, '/products/72016713.png', true),
('Aquafresh Kids Big Teeth Toothpaste 6+ yrs (50ml)', 'Fluoride toothpaste for children transitioning to adult teeth. Gentle mint flavour. 50ml tube.', 'oral_care', 7.60, 6.84, 10, '2027-12-31', 1000, '/products/72016720.png', true),
('Aquafresh Kids Little Teeth Toothpaste 3-5 yrs Value Pack (2 x 50ml)', 'Twin-pack of Aquafresh Little Teeth — fluoride toothpaste for kids aged 3-5. 2 x 50ml tubes.', 'oral_care', 12.35, 11.12, 10, '2027-12-31', 1000, '/products/72018810.png', true),
('Aquafresh Kids Big Teeth Toothpaste 6+ yrs Value Pack (2 x 50ml)', 'Twin-pack of Aquafresh Big Teeth — fluoride toothpaste for kids 6 and above. 2 x 50ml tubes.', 'oral_care', 12.35, 11.12, 10, '2027-12-31', 1000, '/products/72018827.png', true),
('Aquafresh Kids Milk Teeth Toothbrush 0-2 yrs', 'Ultra-soft toothbrush with a small head and easy-grip handle, designed for baby''s first teeth.', 'oral_care', 6.45, 5.81, 10, '2027-12-31', 1000, '/products/72010929.png', true),
('Aquafresh Kids Little Teeth Toothbrush 3-5 yrs', 'Soft-bristle toothbrush with a chunky handle, sized for little hands and little teeth.', 'oral_care', 6.45, 5.81, 10, '2027-12-31', 1000, '/products/72011759.png', true),
('Aquafresh Clean & Control Toothbrush Soft (3-pack)', 'Soft-bristle toothbrush with raised cleaning tips to reach between teeth. Pack of 3.', 'oral_care', 5.85, 5.27, 10, '2027-12-31', 1000, '/products/72011480.png', true),
('Aquafresh Clean & Control Toothbrush Medium (3-pack)', 'Medium-bristle toothbrush with raised cleaning tips for everyday plaque removal. Pack of 3.', 'oral_care', 5.85, 5.27, 10, '2027-12-31', 1000, '/products/72011473.png', true),
('Aquafresh Clean & Flex Toothbrush Soft (3-pack)', 'Flexible-neck toothbrush with soft bristles — gentle cleaning without gum irritation. Pack of 3.', 'oral_care', 5.85, 5.27, 10, '2027-12-31', 1000, '/products/72010142.png', true),
('Aquafresh Clean & Flex Toothbrush Medium (3-pack)', 'Flexible-neck toothbrush with medium bristles for thorough daily cleaning. Pack of 3.', 'oral_care', 5.85, 5.27, 10, '2027-12-31', 1000, '/products/72010159.png', true),

-- Parodontax (oral_care)
('Parodontax Daily Fluoride Toothpaste (90g)', 'Daily toothpaste with fluoride and stannous salts — helps stop and prevent bleeding gums. 90g tube.', 'oral_care', 9.65, 8.69, 10, '2027-12-31', 1000, '/products/72028506.png', true),
('Parodontax Daily Whitening Toothpaste (90g)', 'Whitening toothpaste that also helps prevent bleeding gums. Gently removes surface stains. 90g tube.', 'oral_care', 9.20, 8.28, 10, '2027-12-31', 1000, '/products/72023423.png', true),
('Parodontax Herbal Toothpaste (90g)', 'Herbal formulation with ginger, mint and eucalyptus — helps fight plaque and improve gum health. 90g tube.', 'oral_care', 9.65, 8.69, 10, '2027-12-31', 1000, '/products/72023447.png', true),

-- Polident (denture_care)
('Polident 3-Minute Daily Denture Cleanser (36 tablets)', 'Effervescent cleansing tablets kill 99.9% of odour-causing bacteria on dentures in just 3 minutes. 36 tablets.', 'denture_care', 9.10, 8.19, 10, '2027-12-31', 1000, '/products/72065160.png', true),
('Polident Whitening Daily Denture Cleanser (36 tablets)', 'Whitening effervescent tablets lift stains and freshen dentures daily. 36 tablets.', 'denture_care', 9.85, 8.87, 10, '2027-12-31', 1000, '/products/72061107.png', true),
('Polident Pro Retainer Daily Cleanser (36 tablets)', 'Gentle effervescent tablets formulated for retainers, aligners and mouth guards. 36 tablets.', 'denture_care', 10.50, 9.45, 10, '2027-12-31', 1000, '/products/72034758.png', true),
('Polident 3-Minute Daily Denture Cleanser Twin Pack (2 x 36 tablets)', 'Twin pack of Polident 3-Minute — effervescent tablets that clean dentures in minutes. 2 x 36 tablets.', 'denture_care', 13.85, 12.47, 10, '2027-12-31', 1000, '/products/72038292.png', true),
('Polident Whitening Denture Cleanser Twin Pack (2 x 36 tablets)', 'Twin pack of Polident Whitening — lifts stains and freshens dentures daily. 2 x 36 tablets.', 'denture_care', 14.95, 13.46, 10, '2027-12-31', 1000, '/products/72038285.png', true),
('Polident 3-Minute Daily Denture Cleanser Value Pack (16 + 2 tablets)', 'Starter value pack — 18 effervescent cleansing tablets for dentures. Cleans in 3 minutes.', 'denture_care', 5.00, 4.50, 10, '2027-12-31', 1000, '/products/72035922.png', true),
('Polident Denture Adhesive Cream Fresh Mint (60g)', 'All-day hold denture adhesive with a fresh mint flavour. Seals out food particles. 60g tube.', 'denture_care', 14.00, 12.60, 10, '2027-12-31', 1000, '/products/72035382.png', true),
('Polident Denture Adhesive Cream Flavour Free (60g)', 'All-day hold denture adhesive with no added flavour — for sensitive palates. 60g tube.', 'denture_care', 14.00, 12.60, 10, '2027-12-31', 1000, '/products/72039381.png', true),
('Polident Max Hold & Seal Denture Adhesive (40g)', 'Extra-strong hold and seal formula — locks out food particles all day. 40g tube.', 'denture_care', 11.90, 10.71, 10, '2027-12-31', 1000, '/products/72037841.png', true),
('Polident Max Hold & Seal Denture Adhesive (70g)', 'Extra-strong hold and seal formula in a larger value tube. Locks out food particles all day. 70g tube.', 'denture_care', 18.90, 17.01, 10, '2027-12-31', 1000, '/products/72037827.png', true);

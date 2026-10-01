/**
 * Tales of Telugu — Seed / Default Data
 * Exact copy of the original default gallery, about content, categories, and dishes.
 * Used by admin portal to restore originals or initialize empty storage.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TOT_SEED_DATA = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  return {
  "gallery": {
    "ambiance": [
      {
        "src": "assets/gallery/ambiance-1.jpg",
        "title": "Every meal has a memory.",
        "subtitle": "Tradition in Every Detail",
        "caption": "Every meal has a memory passed down through generations of Telugu households."
      },
      {
        "src": "assets/gallery/ambiance-2.jpg",
        "title": "Good food tells a story.",
        "subtitle": "Stories on Every Wall",
        "caption": "Good food tells a story framed by warm heritage and folk art."
      },
      {
        "src": "assets/gallery/ambiance-3.jpg",
        "title": "Some stories are best served warm.",
        "subtitle": "Craft & Heritage",
        "caption": "Some stories are best served warm, surrounded by classic Telugu hospitality."
      },
      {
        "src": "assets/gallery/ambiance-4.jpg",
        "title": "Food brings strangers to the same table.",
        "subtitle": "Gatherings & Celebration",
        "caption": "Food brings strangers together to share laughter, warmth, and timeless regional flavors."
      },
      {
        "src": "assets/gallery/ambiance-5.jpg",
        "title": "From kitchen to table, traditions travel.",
        "subtitle": "Nature & Harmony",
        "caption": "From kitchen to table, traditions travel in harmony with nature."
      }
    ],
    "food": [
      {
        "src": "assets/gallery/food-1.jpg",
        "title": "Paneer Lukhmi",
        "subtitle": "Stuffed Savory Pastry",
        "caption": "Golden crisp savory pastry pockets filled with spiced paneer, served on a banana leaf platter with house chutney."
      },
      {
        "src": "assets/gallery/food-2.jpg",
        "title": "Aru Akula Chutta",
        "subtitle": "A Taste Wrapped in Tradition",
        "caption": "Traditional rolled leaf appetizers delicately stuffed, fried to golden perfection, and served with flavorful accompaniments."
      },
      {
        "src": "assets/gallery/food-3.jpg",
        "title": "Royyala Iguru with Garlic Naan",
        "subtitle": "A Taste of Coastal Telugu Flavours",
        "caption": "Rich, slow-simmered prawn curry in a copper handi infused with coastal Andhra spices, paired with warm butter garlic naan."
      },
      {
        "src": "assets/gallery/food-4.jpg",
        "title": "Karivepaku Kodi Vepudu",
        "subtitle": "A Perfect Blend of Spice & Aroma",
        "caption": "Signature chicken fry tossed with fragrant fresh curry leaves and crushed spices in a traditional brass kadai."
      },
      {
        "src": "assets/gallery/food-5.jpg",
        "title": "Guntur Karam Kodi Kebab",
        "subtitle": "Authentic Guntur Flavours on Your Plate",
        "caption": "Fiery red-chilli marinated chicken kebabs roasted to juicy perfection, served with cooling onion raita."
      }
    ]
  },
  "about": {
    "heroTag": "HERITAGE & STORY",
    "heroTitle": "ABOUT",
    "heroSubtitle": "\"Where Telugu Stories Meet the Table\"",
    "lead": "Tales of Telugu is a celebration of the flavours, stories and traditions that have travelled through generations of Telugu kitchens. Inspired by the rich cultural tapestries of Telangana, Coastal Andhra, and Rayalaseema, we invite you to experience a culinary journey where every recipe carries an ancestral memory, and every spice tells a story.",
    "cards": [
      {
        "icon": "❁",
        "title": "Sacred Soil & Regional Spices",
        "desc": "From the fiery sun-dried chillies of Guntur and aromatic gongura leaves of Coastal Andhra to the earthy wood-fired handi curries of Telangana, our kitchens honor native grains, cold-pressed oils, and hand-ground spice blends."
      },
      {
        "icon": "❁",
        "title": "Storytelling at Every Gathering",
        "desc": "In Telugu folklore, meals were never eaten in haste. They were grand gatherings under neem verandas—where elders recounted ancient fables, folk songs echoed in the background, and food brought hearts together."
      },
      {
        "icon": "❁",
        "title": "Timeless Telugu Hospitality",
        "desc": "Served on pristine banana leaves, antique brassware, and clay pottery, every meal at Tales of Telugu reflects *Atithi Devo Bhava*—offering boundless warmth, affection, and respect to every guest."
      }
    ],
    "quote": "Rooted in the Soil, Seasoned by Heritage, Served with Love.",
    "quoteSign": "Tales of Telugu"
  },
  "categories": [
    {
      "id": "soups",
      "label": "Soups",
      "icon": "🥣"
    },
    {
      "id": "starters",
      "label": "Starters",
      "icon": "🍢"
    },
    {
      "id": "grill",
      "label": "From the Grill",
      "icon": "🔥"
    },
    {
      "id": "breads",
      "label": "Breads",
      "icon": "🫓"
    },
    {
      "id": "curries",
      "label": "Kooralu / Curries",
      "icon": "🥘"
    },
    {
      "id": "rice",
      "label": "Rice / Biryani / Pulao",
      "icon": "🍚"
    },
    {
      "id": "musttry",
      "label": "Must-Try",
      "icon": "⭐"
    },
    {
      "id": "desserts",
      "label": "Desserts",
      "icon": "🍨"
    }
  ],
  "menuItems": [
    {
      "id": "s1",
      "category": "soups",
      "subcategory": "Traditional & Vegetarian Soups",
      "title": "Chintapandu Rasam",
      "desc": "Traditional tamarind soup seasoned with crushed black pepper, cumin, and garlic.",
      "price": "₹ 120",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Tamarind extract, black pepper, cumin seeds, garlic, curry leaves, mustard seeds, ghee, coriander"
    },
    {
      "id": "s2",
      "category": "soups",
      "subcategory": "Traditional & Vegetarian Soups",
      "title": "Mixed Veg Ragi Soup",
      "desc": "Nourishing finger millet broth cooked with garden vegetables and home spices.",
      "price": "₹ 140",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Finger millet flour, carrots, French beans, sweet corn, black pepper, garlic, butter, spring onions"
    },
    {
      "id": "s3",
      "category": "soups",
      "subcategory": "Meat Soups",
      "title": "Kodi Shorba",
      "desc": "Fragrant chicken broth simmered slow with aromatic herbs and cracked spices.",
      "price": "₹ 180",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Chicken bone broth, cinnamon, cloves, green cardamom, ginger, garlic, fresh mint, black pepper"
    },
    {
      "id": "s4",
      "category": "soups",
      "subcategory": "Meat Soups",
      "title": "Mutton Marag Soup",
      "desc": "Hyderabadi style rich bone broth soup seasoned with green chillies, mint, and almonds.",
      "price": "₹ 220",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Tender mutton bone broth, green chillies, mint leaves, almonds, cashew paste, ghee, cardamom"
    },
    {
      "id": "st1",
      "category": "starters",
      "subcategory": "Vegetarian & Paneer Starters",
      "title": "Kandha Fry",
      "desc": "Crispy pan-fried yam slices seasoned with regional spice blend.",
      "price": "₹ 180",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Yam slices, Guntur red chilli powder, turmeric, rice flour, curry leaves, vegetable oil, mustard seeds"
    },
    {
      "id": "st2",
      "category": "starters",
      "subcategory": "Vegetarian & Paneer Starters",
      "title": "Chitti Garelu & Tamata Koora",
      "desc": "Mini lentil vada fried golden and served with tangy spiced tomato curry.",
      "price": "₹ 210",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Urad dal, ripe tomatoes, green chillies, ginger, mustard seeds, curry leaves, refined oil"
    },
    {
      "id": "st3",
      "category": "starters",
      "subcategory": "Vegetarian & Paneer Starters",
      "title": "Gollinchina Baby Corn",
      "desc": "Tender baby corn tossed in caramelized onions and crushed black pepper.",
      "price": "₹ 200",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Baby corn, sliced onions, crushed black pepper, curry leaves, garlic, ginger, vegetable oil"
    },
    {
      "id": "st4",
      "category": "starters",
      "subcategory": "Vegetarian & Paneer Starters",
      "title": "Mokkajonna Ullikaram",
      "desc": "Sweet corn kernel fry with fiery onion-chilli spice paste.",
      "price": "₹ 190",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Sweet corn kernels, red onion paste, dry red chillies, garlic, cumin, mustard seeds, cooking oil"
    },
    {
      "id": "st5",
      "category": "starters",
      "subcategory": "Vegetarian & Paneer Starters",
      "title": "Palleturi Puttagodugula Vepudu",
      "desc": "Village-style stir fried button mushrooms with curry leaves and garlic.",
      "price": "₹ 220",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Button mushrooms, shallots, garlic cloves, curry leaves, black pepper, turmeric, cold-pressed oil"
    },
    {
      "id": "st6",
      "category": "starters",
      "subcategory": "Vegetarian & Paneer Starters",
      "title": "Konaseema Paneer",
      "desc": "Cottage cheese cubes tossed in fresh coconut, mustard seeds, and green chillies.",
      "price": "₹ 240",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Paneer cubes, fresh grated coconut, green chillies, mustard seeds, curry leaves, desi ghee"
    },
    {
      "id": "st7",
      "category": "starters",
      "subcategory": "Vegetarian & Paneer Starters",
      "title": "Kara Kara Paneer",
      "desc": "Extra crunchy fried paneer strips coated in spicy batter.",
      "price": "₹ 230",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Paneer strips, cornflour, red chilli powder, ginger-garlic paste, curry leaves, aromatic spices"
    },
    {
      "id": "st8",
      "category": "starters",
      "subcategory": "Chicken Starters",
      "title": "Chicken Vepudu",
      "desc": "Classic Andhra style fried chicken tossed with caramelized onions and roasted spices.",
      "price": "₹ 280",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Tender chicken, caramelized onions, Guntur chilli powder, ginger, garlic, curry leaves, fennel seeds"
    },
    {
      "id": "st9",
      "category": "starters",
      "subcategory": "Chicken Starters",
      "title": "Kodi Sticks",
      "desc": "Crispy fried chicken skewers marinated in garlic ginger spice blend.",
      "price": "₹ 290",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Boneless chicken strips, ginger-garlic paste, red chilli flakes, gram flour, lemon juice, oil"
    },
    {
      "id": "st10",
      "category": "starters",
      "subcategory": "Chicken Starters",
      "title": "Kara Kara Kodi",
      "desc": "Crispy fried chicken bits seasoned with chilli powders and fresh curry leaves.",
      "price": "₹ 285",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Bite-sized chicken, spicy rice flour coating, curry leaves, green chillies, black pepper, oil"
    },
    {
      "id": "st11",
      "category": "starters",
      "subcategory": "Chicken Starters",
      "title": "Rayalaseema Kodi Vepudu",
      "desc": "Fiery dry chicken fry infused with Guntur red chillies and coriander seeds.",
      "price": "₹ 300",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Country chicken, roasted Guntur red chillies, coriander seeds, cumin, crushed garlic, ghee"
    },
    {
      "id": "st12",
      "category": "starters",
      "subcategory": "Chicken Starters",
      "title": "Chitti Garelu & Natukodi",
      "desc": "Mini lentil vadas served alongside country chicken curry reduction.",
      "price": "₹ 320",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Urad dal vadas, free-range country chicken, onion tomato reduction, roasted spices, curry leaves"
    },
    {
      "id": "st13",
      "category": "starters",
      "subcategory": "Chicken Starters",
      "title": "Gollinchina Natukodi",
      "desc": "Sautéed free-range country chicken in a rich wood-fired handi masala.",
      "price": "₹ 330",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Free-range chicken, shallots, green chillies, crushed black pepper, cloves, coriander seeds, ghee"
    },
    {
      "id": "st14",
      "category": "starters",
      "subcategory": "Mutton & Meat Starters",
      "title": "Chitti Garelu & Pottelu Mamsam",
      "desc": "Mini crispy garelu served with spicy tender mutton curry.",
      "price": "₹ 360",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Crispy urad dal garelu, tender mutton, caramelized onions, red chilli paste, coriander, ghee"
    },
    {
      "id": "st15",
      "category": "starters",
      "subcategory": "Mutton & Meat Starters",
      "title": "Gollinchina Kanjju Pitta",
      "desc": "Sautéed quail cooked with crushed black pepper, shallots, and ghee.",
      "price": "₹ 340",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Quail pieces, sliced shallots, crushed black pepper, garlic cloves, curry leaves, ghee, turmeric"
    },
    {
      "id": "st16",
      "category": "starters",
      "subcategory": "Mutton & Meat Starters",
      "title": "Boti with Roti",
      "desc": "Spiced lamb intestine fry served with hot wheat phulkas.",
      "price": "₹ 310",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Lamb intestines, whole wheat phulkas, red chilli powder, ginger, garlic, coriander, cloves"
    },
    {
      "id": "st17",
      "category": "starters",
      "subcategory": "Mutton & Meat Starters",
      "title": "Bheja-de-Roti",
      "desc": "Delicately cooked lamb brain masala served with hot soft rotis.",
      "price": "₹ 320",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Lamb brain, whole wheat rotis, onions, green chillies, turmeric, pepper powder, farm butter"
    },
    {
      "id": "st18",
      "category": "starters",
      "subcategory": "Mutton & Meat Starters",
      "title": "Kala Gosht Bone",
      "desc": "Slow-cooked dark roasted mutton bone chops in black pepper spice.",
      "price": "₹ 380",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Mutton bone chops, roasted black spice blend, onions, cracked black pepper, garlic, desi ghee"
    },
    {
      "id": "st19",
      "category": "starters",
      "subcategory": "Mutton & Meat Starters",
      "title": "Kala Gosht B/L",
      "desc": "Boneless dark roast mutton cooked in traditional roasted spice paste.",
      "price": "₹ 410",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Boneless mutton, dark roasted coriander seeds, black pepper, cloves, onion paste, ghee"
    },
    {
      "id": "st20",
      "category": "starters",
      "subcategory": "Mutton & Meat Starters",
      "title": "Mutton Kheema Shots",
      "desc": "Crispy bite-sized minced mutton balls served with green chutney.",
      "price": "₹ 350",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Minced mutton, fresh mint leaves, ginger-garlic paste, green chillies, breadcrumbs, garam masala"
    },
    {
      "id": "st21",
      "category": "starters",
      "subcategory": "Meat & Seafood Specials",
      "title": "Mamsam Ghee Roast",
      "desc": "Tender mutton pieces tossed in aromatic pure desi ghee roast spices.",
      "price": "₹ 390",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Tender mutton, desi ghee, Byadgi chillies, tamarind pulp, fennel seeds, garlic cloves"
    },
    {
      "id": "st22",
      "category": "starters",
      "subcategory": "Meat & Seafood Specials",
      "title": "Fish Sticks",
      "desc": "Golden fried fresh water fish strips with spicy tartar dips.",
      "price": "₹ 310",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Freshwater fish fillets, breadcrumbs, ginger-garlic paste, lemon juice, egg white, pepper"
    },
    {
      "id": "st23",
      "category": "starters",
      "subcategory": "Meat & Seafood Specials",
      "title": "Korramenu Chips",
      "desc": "Thin crispy marinated murrel fish chips fried with curry leaves.",
      "price": "₹ 340",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Murrel fish slices, cornstarch, red chilli powder, lemon juice, curry leaves, oil"
    },
    {
      "id": "st24",
      "category": "starters",
      "subcategory": "Meat & Seafood Specials",
      "title": "Kothurupaka Fish Kottu & Parota",
      "desc": "Shredded fish kottu seasoned with coastal spices, served with flaky parota.",
      "price": "₹ 350",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Shredded fish, maida parota, onions, green chillies, tomatoes, fennel seeds, curry leaves"
    },
    {
      "id": "st25",
      "category": "starters",
      "subcategory": "Meat & Seafood Specials",
      "title": "Kara Kara Prawns",
      "desc": "Crispy fried prawns coated in spicy red chilli butter coating.",
      "price": "₹ 360",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Fresh prawns, chilli garlic paste, cornstarch batter, curry leaves, butter, lemon juice"
    },
    {
      "id": "st26",
      "category": "starters",
      "subcategory": "Meat & Seafood Specials",
      "title": "Kadipatta Prawn",
      "desc": "Succulent prawns tossed with fresh curry leaves, mustard seeds, and pepper.",
      "price": "₹ 370",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Succulent prawns, abundant curry leaves, crushed black pepper, mustard seeds, garlic, coconut oil"
    },
    {
      "id": "st27",
      "category": "starters",
      "subcategory": "Meat & Seafood Specials",
      "title": "Chitti Royyala Vepudu",
      "desc": "Small fresh water prawns stir-fried in traditional Andhra onion-chilli paste.",
      "price": "₹ 380",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Small river prawns, red onion paste, green chillies, coriander seeds, curry leaves, cooking oil"
    },
    {
      "id": "g1",
      "category": "grill",
      "subcategory": "Vegetarian Grill",
      "title": "Hara Bhara Kebab",
      "desc": "Pan-grilled spinach and green pea patties infused with cardamom and herbs.",
      "price": "₹ 220",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Spinach puree, green peas, mashed potatoes, cardamom powder, fresh mint, breadcrumbs, ghee"
    },
    {
      "id": "g2",
      "category": "grill",
      "subcategory": "Vegetarian Grill",
      "title": "Tandoor Broccoli",
      "desc": "Fresh broccoli florets marinated in spiced yogurt and roasted in clay oven.",
      "price": "₹ 240",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Broccoli florets, hung curd, mustard oil, yellow chilli powder, garam masala, lemon juice"
    },
    {
      "id": "g3",
      "category": "grill",
      "subcategory": "Vegetarian Grill",
      "title": "Paneer Tikka",
      "desc": "Classic tandoor-roasted cottage cheese with bell peppers and onions.",
      "price": "₹ 260",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Paneer cubes, bell peppers, red onions, hung curd, Kashmiri chilli powder, kasuri methi"
    },
    {
      "id": "g4",
      "category": "grill",
      "subcategory": "Vegetarian Grill",
      "title": "Malai Paneer Tikka",
      "desc": "Creamy cashew marinated paneer cooked to perfection in tandoor.",
      "price": "₹ 270",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Paneer cubes, cashew nut paste, fresh cream, cardamom, cheese, green chillies, butter"
    },
    {
      "id": "g5",
      "category": "grill",
      "subcategory": "Chicken, Mutton & Seafood Grill",
      "title": "Curry Leaves Chicken Kebab",
      "desc": "Succulent chicken kebabs infused with curry leaves paste and lemon.",
      "price": "₹ 310",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Boneless chicken, fresh curry leaves paste, green chillies, hung curd, lemon juice, vegetable oil"
    },
    {
      "id": "g6",
      "category": "grill",
      "subcategory": "Chicken, Mutton & Seafood Grill",
      "title": "Kothimeera Ellipaya Kodi Kebab",
      "desc": "Charcoal grilled chicken marinated with fresh coriander, garlic, and green chillies.",
      "price": "₹ 320",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Chicken chunks, coriander leaves, garlic, green chillies, mustard oil, lemon juice"
    },
    {
      "id": "g7",
      "category": "grill",
      "subcategory": "Chicken, Mutton & Seafood Grill",
      "title": "Mutton Chops",
      "desc": "Tender mutton chops marinated in clay pot tandoori spices and seared.",
      "price": "₹ 420",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Mutton chops, raw papaya paste, tandoori masala, hung curd, mustard oil, farm butter"
    },
    {
      "id": "g8",
      "category": "grill",
      "subcategory": "Chicken, Mutton & Seafood Grill",
      "title": "Tandoori Fish",
      "desc": "Whole fresh catch marinated in red chilli yogurt paste and grilled in tandoor.",
      "price": "₹ 380",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Whole fresh fish, red chilli paste, carom seeds (ajwain), lemon juice, hung curd, mustard oil"
    },
    {
      "id": "g9",
      "category": "grill",
      "subcategory": "Chicken, Mutton & Seafood Grill",
      "title": "Khatta Meetha Prawn",
      "desc": "Grilled jumbo prawns coated in sweet & tangy tamarind glaze.",
      "price": "₹ 390",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Jumbo prawns, tamarind pulp, jaggery, chilli flakes, garlic cloves, mustard seeds, oil"
    },
    {
      "id": "b1",
      "category": "breads",
      "subcategory": "Indian Breads",
      "title": "Roti / Phulka / Laccha Paratha",
      "desc": "Freshly baked flatbreads prepared on hot tawa or clay tandoor.",
      "price": "₹ 40",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Whole wheat flour (atta), warm water, salt, desi ghee"
    },
    {
      "id": "b2",
      "category": "breads",
      "subcategory": "Indian Breads",
      "title": "Butter Roti / Naan",
      "desc": "Soft tandoor baked bread brushed with fresh farm butter.",
      "price": "₹ 50",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Refined wheat flour (maida), milk, yogurt, baking soda, farm butter"
    },
    {
      "id": "b3",
      "category": "breads",
      "subcategory": "Indian Breads",
      "title": "Butter Naan / Garlic Naan",
      "desc": "Leavened flatbread topped with minced garlic, coriander, and melted butter.",
      "price": "₹ 65",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Refined wheat flour, minced garlic, fresh coriander, butter, nigella seeds"
    },
    {
      "id": "b4",
      "category": "breads",
      "subcategory": "Indian Breads",
      "title": "Multi Grain Chapathi (Ragi, Jonnalu, Godhumalu, Sajijalu)",
      "desc": "Traditional healthy flatbread blend of millet, sorghum, ragi, and wheat.",
      "price": "₹ 60",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Finger millet (ragi), sorghum (jowar), pearl millet (bajra), whole wheat flour, warm water, salt"
    },
    {
      "id": "c1",
      "category": "curries",
      "subcategory": "Vegetarian Curries & Dal",
      "title": "Tomato Pappu",
      "desc": "Comforting yellow lentil stew cooked with ripe tomatoes and mustard seed tempering.",
      "price": "₹ 180",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Toor dal (yellow lentils), ripe tomatoes, green chillies, mustard seeds, cumin, garlic, ghee"
    },
    {
      "id": "c2",
      "category": "curries",
      "subcategory": "Vegetarian Curries & Dal",
      "title": "Dal (Tadka/Fry)",
      "desc": "Yellow lentils tempered with ghee, cumin seeds, garlic, and red chillies.",
      "price": "₹ 190",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Toor dal, moong dal, desi ghee, cumin seeds, dry red chillies, garlic, fresh coriander"
    },
    {
      "id": "c3",
      "category": "curries",
      "subcategory": "Vegetarian Curries & Dal",
      "title": "Kaju Tamata Koora / Fry",
      "desc": "Rich roasted cashews cooked in tangy tomato gravy or dry fry.",
      "price": "₹ 240",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Whole cashews, tomato gravy, onions, ginger-garlic paste, red chilli powder, cream"
    },
    {
      "id": "c4",
      "category": "curries",
      "subcategory": "Vegetarian Curries & Dal",
      "title": "Mushroom Masala",
      "desc": "Button mushrooms simmered in spiced onion tomato gravy with garnish herbs.",
      "price": "₹ 230",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Button mushrooms, onions, tomatoes, cashew paste, garam masala, kasuri methi"
    },
    {
      "id": "c5",
      "category": "curries",
      "subcategory": "Vegetable & Paneer Curries",
      "title": "Mix Veg Curry",
      "desc": "Homestyle assorted seasonal vegetables simmered in aromatic gravy.",
      "price": "₹ 210",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Carrots, French beans, green peas, potatoes, cauliflower, onion-tomato gravy, coriander"
    },
    {
      "id": "c6",
      "category": "curries",
      "subcategory": "Vegetable & Paneer Curries",
      "title": "Methi Chaman",
      "desc": "Kashmiri style paneer curry cooked with fresh fenugreek leaves and cream.",
      "price": "₹ 250",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Paneer cubes, fresh fenugreek leaves (methi), cream, cashew paste, green cardamom"
    },
    {
      "id": "c7",
      "category": "curries",
      "subcategory": "Vegetable & Paneer Curries",
      "title": "Kadai Paneer / Palak Paneer",
      "desc": "Cottage cheese cooked in bell pepper kadai gravy or fresh spinach puree.",
      "price": "₹ 260",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Paneer cubes, spinach puree, bell peppers, kadai masala, cream, garlic, ghee"
    },
    {
      "id": "c8",
      "category": "curries",
      "subcategory": "Vegetable & Paneer Curries",
      "title": "Paneer Kheema Koora",
      "desc": "Grated paneer cooked with spicy onion gravy and regional spices.",
      "price": "₹ 270",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Grated paneer, onions, tomatoes, green chillies, coriander seeds, farm butter"
    },
    {
      "id": "c9",
      "category": "curries",
      "subcategory": "Chicken Curries",
      "title": "Boiler Kodi Koora",
      "desc": "Homestyle tender chicken curry cooked with onions, tomatoes, and coriander.",
      "price": "₹ 290",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Tender chicken pieces, onions, tomatoes, ginger-garlic paste, coriander powder, chilli powder"
    },
    {
      "id": "c10",
      "category": "curries",
      "subcategory": "Chicken Curries",
      "title": "Andhra Chicken Curry",
      "desc": "Traditional spicy chicken curry prepared with poppy seeds and Guntur chilli paste.",
      "price": "₹ 300",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Chicken, Guntur red chillies, poppy seeds, grated coconut, coriander seeds, onions, oil"
    },
    {
      "id": "c11",
      "category": "curries",
      "subcategory": "Chicken Curries",
      "title": "Kadai Chicken",
      "desc": "Chicken pieces tossed in wok with bell peppers and crushed kadai spices.",
      "price": "₹ 310",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Chicken chunks, capsicum, onions, crushed coriander, dry red chillies, kadai gravy"
    },
    {
      "id": "c12",
      "category": "curries",
      "subcategory": "Chicken Curries",
      "title": "Butter Chicken",
      "desc": "Tandoori chicken pieces simmered in rich creamy tomato and butter gravy.",
      "price": "₹ 320",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Tandoori chicken, tomato puree, butter, fresh cream, kasuri methi, honey, spices"
    },
    {
      "id": "c13",
      "category": "curries",
      "subcategory": "Chicken Curries",
      "title": "Natukodi Iguru",
      "desc": "Country chicken cooked in thick semi-gravy reduction with roasted spices.",
      "price": "₹ 350",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Country chicken, shallots, Guntur chilli paste, roasted clove masala, curry leaves, ghee"
    },
    {
      "id": "c14",
      "category": "curries",
      "subcategory": "Chicken Curries",
      "title": "Dhaba Kodi Curry",
      "desc": "Rustic highway dhaba style rustic chicken curry with whole spices.",
      "price": "₹ 310",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Chicken on bone, mustard oil, whole spices, onion gravy, green chillies, coriander"
    },
    {
      "id": "c15",
      "category": "curries",
      "subcategory": "Mutton & Seafood Curries",
      "title": "Yaka Mamsam Koora (B/L)",
      "desc": "Boneless tender mutton curry prepared with wood-fired handi spices.",
      "price": "₹ 410",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Boneless tender mutton, handi spices, caramelized onions, ginger-garlic, tomatoes, ghee"
    },
    {
      "id": "c16",
      "category": "curries",
      "subcategory": "Mutton & Seafood Curries",
      "title": "Seema Style Pottelu Mamsam Curry",
      "desc": "Rayalaseema style rustic mutton curry with cracked black pepper.",
      "price": "₹ 420",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Mutton pieces, black pepper, dry coconut, poppy seeds, onions, Guntur chillies"
    },
    {
      "id": "c17",
      "category": "curries",
      "subcategory": "Mutton & Seafood Curries",
      "title": "Mutton Kheema (Koora / Fry / Semi Gravy)",
      "desc": "Minced mutton cooked with green peas, onions, and spicy handi masala.",
      "price": "₹ 390",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Minced mutton, green peas, onions, tomatoes, mint leaves, garam masala, ghee"
    },
    {
      "id": "c18",
      "category": "curries",
      "subcategory": "Mutton & Seafood Curries",
      "title": "Royyala Iguru",
      "desc": "Rich, slow-simmered prawn curry in a copper handi with coastal Andhra spices.",
      "price": "₹ 370",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Prawns, coconut milk, shallots, green chillies, tamarind, curry leaves, cooking oil"
    },
    {
      "id": "c19",
      "category": "curries",
      "subcategory": "Mutton & Seafood Curries",
      "title": "Kothurupaka Fish Kottu",
      "desc": "Coastal style shredded fish curry sautéed with herbs and spices.",
      "price": "₹ 350",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Shredded fish, onions, tomatoes, green chillies, curry leaves, coconut oil, pepper"
    },
    {
      "id": "r1",
      "category": "rice",
      "subcategory": "Traditional Rice",
      "title": "Avakaya Pappu Annam",
      "desc": "Comfort food mix of hot rice, yellow lentils, ghee, and mango avakaya pickle.",
      "price": "₹ 190",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Steamed rice, toor dal, Andhra mango avakaya pickle, desi ghee, salt"
    },
    {
      "id": "r2",
      "category": "rice",
      "subcategory": "Traditional Rice",
      "title": "Sambar Rice",
      "desc": "Traditional lentil vegetable rice tempered with ghee and aromatic spices.",
      "price": "₹ 170",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Rice, toor dal, mixed vegetables, tamarind, sambar powder, mustard seeds, ghee"
    },
    {
      "id": "r3",
      "category": "rice",
      "subcategory": "Traditional Rice",
      "title": "Sambar Rice Chicken/Mutton",
      "desc": "Sambar rice topped with tender fried chicken or mutton pieces.",
      "price": "₹ 240",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Sambar rice, fried chicken or mutton pieces, curry leaves, ghee, red chillies"
    },
    {
      "id": "r4",
      "category": "rice",
      "subcategory": "Traditional Rice",
      "title": "Tomato Pappu, Rasam & Rice",
      "desc": "Classic meal set of steamed rice served with tomato pappu and hot pepper rasam.",
      "price": "₹ 180",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Steamed rice, tomato toor dal, pepper rasam, crisp appalam, desi ghee"
    },
    {
      "id": "r5",
      "category": "rice",
      "subcategory": "Traditional Rice",
      "title": "Bagara Rice",
      "desc": "Fragrant basmati rice cooked with whole spices, mint, and caramelized onions.",
      "price": "₹ 160",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Basmati rice, bay leaves, cinnamon, cloves, cardamom, mint leaves, fried onions, ghee"
    },
    {
      "id": "r6",
      "category": "rice",
      "subcategory": "Traditional Rice",
      "title": "Ghee Rice / Steam Rice / Ragi Mudda / Millet Rice",
      "desc": "Choice of aromatic ghee rice, steamed rice, healthy ragi mudda, or millet rice.",
      "price": "₹ 140",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Basmati rice, finger millet flour (ragi), foxtail millet, pure desi ghee"
    },
    {
      "id": "r7",
      "category": "rice",
      "subcategory": "Traditional Rice",
      "title": "Curd Rice",
      "desc": "Cooling rice mixed with fresh yogurt, mustard seeds, curry leaves, and pomegranate.",
      "price": "₹ 130",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Steamed rice, fresh yogurt, milk, mustard seeds, curry leaves, pomegranate seeds, ginger"
    },
    {
      "id": "r8",
      "category": "rice",
      "subcategory": "Vegetarian & Paneer Biryani/Pulao",
      "title": "Veg Biryani / Pulao",
      "desc": "Fragrant rice dum-cooked with garden vegetables, mint, and whole spices.",
      "price": "₹ 240",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Basmati rice, carrots, beans, peas, potatoes, saffron, mint, fried onions, ghee"
    },
    {
      "id": "r9",
      "category": "rice",
      "subcategory": "Vegetarian & Paneer Biryani/Pulao",
      "title": "Paneer Biryani / Pulao",
      "desc": "Aromatic basmati rice cooked with spiced grilled paneer cubes and saffron.",
      "price": "₹ 270",
      "image": "assets/gallery/food-1.jpg",
      "ingredients": "Basmati rice, grilled paneer cubes, biryani spices, saffron milk, mint, fried onions"
    },
    {
      "id": "r10",
      "category": "rice",
      "subcategory": "Chicken Biryani & Pulao",
      "title": "Kodi Vepudu Pulao",
      "desc": "Spiced chittimuthyalu rice served with Andhra chicken fry.",
      "price": "₹ 310",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Chittimuthyalu rice, Andhra fried chicken, green chillies, mint, whole spices, ghee"
    },
    {
      "id": "r11",
      "category": "rice",
      "subcategory": "Chicken Biryani & Pulao",
      "title": "Chicken Fry Piece Biryani",
      "desc": "Hyderabadi biryani topped with crispy spicy chicken fry pieces.",
      "price": "₹ 320",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Basmati rice, fried chicken pieces, Hyderabadi biryani masala, saffron, mint, ghee"
    },
    {
      "id": "r12",
      "category": "rice",
      "subcategory": "Chicken Biryani & Pulao",
      "title": "Natukodi Biryani / Pulao",
      "desc": "Traditional country chicken dum biryani cooked with authentic spices.",
      "price": "₹ 360",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Chittimuthyalu rice, country chicken, Guntur chilli paste, cardamom, cloves, ghee"
    },
    {
      "id": "r13",
      "category": "rice",
      "subcategory": "Mutton & Seafood Biryani/Pulao",
      "title": "Kola Gosht (B/L) Biryani / Pulao",
      "desc": "Boneless tender mutton biryani cooked slow with saffron and herbs.",
      "price": "₹ 420",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Basmati rice, boneless mutton, saffron, kewra water, fried onions, mint, ghee"
    },
    {
      "id": "r14",
      "category": "rice",
      "subcategory": "Mutton & Seafood Biryani/Pulao",
      "title": "Prawns Biryani",
      "desc": "Succulent prawns dum-cooked with fragrant basmati rice and coastal herbs.",
      "price": "₹ 390",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Basmati rice, fresh prawns, coastal biryani spices, mint, lemon juice, ghee"
    },
    {
      "id": "r15",
      "category": "rice",
      "subcategory": "Mutton & Seafood Biryani/Pulao",
      "title": "Chitti Royyala Pulao",
      "desc": "Traditional small prawn pulao prepared with aromatic chittimuthyalu rice.",
      "price": "₹ 380",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Chittimuthyalu rice, small river prawns, onions, green chillies, coriander, ghee"
    },
    {
      "id": "r16",
      "category": "rice",
      "subcategory": "Mutton & Seafood Biryani/Pulao",
      "title": "Kheema Biryani / Pulao",
      "desc": "Spiced minced mutton cooked with basmati rice, mint, and fried onions.",
      "price": "₹ 410",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Basmati rice, minced mutton, mint, fried onions, cinnamon, cloves, ghee"
    },
    {
      "id": "r17",
      "category": "rice",
      "subcategory": "Mutton & Seafood Biryani/Pulao",
      "title": "Nalli Gosht Biryani",
      "desc": "Royal lamb shank dum biryani slow-cooked with Nizami spices.",
      "price": "₹ 460",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Basmati rice, lamb shank, Nizami spices, saffron, rose water, mint, ghee"
    },
    {
      "id": "mt1",
      "category": "musttry",
      "subcategory": "Traditional Must-Try",
      "title": "Mudha Pappu, Pachipulusu - Annam",
      "desc": "Signature Telugu combination of thick lentil, raw tamarind soup, and ghee rice.",
      "price": "₹ 210",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Steamed rice, thick toor dal, raw tamarind pulusu, onions, green chillies, ghee"
    },
    {
      "id": "mt2",
      "category": "musttry",
      "subcategory": "Traditional Must-Try",
      "title": "Bagara with Tamata Fry & Guthivankay",
      "desc": "Aromatic bagara rice served with fried tomato and stuffed brinjal curry.",
      "price": "₹ 250",
      "image": "assets/gallery/food-2.jpg",
      "ingredients": "Bagara rice, fried tomato curry, stuffed baby brinjal (guthivankaya), sesame, peanuts"
    },
    {
      "id": "mt3",
      "category": "musttry",
      "subcategory": "Traditional Must-Try",
      "title": "Ragi Sangati (served with mix vegetables/chicken/kheema)",
      "desc": "Steamed ragi millet ball served with choice of vegetable, chicken, or mutton curry.",
      "price": "₹ 280",
      "image": "assets/gallery/food-6.jpg",
      "ingredients": "Ragi (finger millet) ball, rice, choice of vegetable curry, chicken gravy, or mutton kheema"
    },
    {
      "id": "mt4",
      "category": "musttry",
      "subcategory": "Traditional Must-Try",
      "title": "Natukodi Shorva with Bagara Rice/Ragi Sangati/Millets",
      "desc": "Rich country chicken gravy served with bagara rice or ragi mudda.",
      "price": "₹ 340",
      "image": "assets/gallery/food-5.jpg",
      "ingredients": "Country chicken shorva, bagara basmati rice or ragi sangati, roasted spices, ghee"
    },
    {
      "id": "mt5",
      "category": "musttry",
      "subcategory": "Signature Meat & Fish Combos",
      "title": "Pottelu Mamsam with Bagara Rice/Ragi Sangati/Millets",
      "desc": "Signature Rayalaseema mutton curry paired with bagara rice or ragi sangati.",
      "price": "₹ 420",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Tender Rayalaseema mutton, bagara rice or ragi sangati, pepper, coriander seeds, ghee"
    },
    {
      "id": "mt6",
      "category": "musttry",
      "subcategory": "Signature Meat & Fish Combos",
      "title": "Parota & Boiler Kodi Koora",
      "desc": "Flaky layered Kerala parotas served with hot chicken curry.",
      "price": "₹ 310",
      "image": "assets/gallery/food-4.jpg",
      "ingredients": "Layered maida parotas, tender chicken curry, onions, green chillies, tomatoes"
    },
    {
      "id": "mt7",
      "category": "musttry",
      "subcategory": "Signature Meat & Fish Combos",
      "title": "Parota & Yaka Mamsam Koora",
      "desc": "Flaky parotas served with tender boneless mutton curry.",
      "price": "₹ 390",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Layered parotas, boneless mutton gravy, black pepper, cloves, ghee"
    },
    {
      "id": "mt8",
      "category": "musttry",
      "subcategory": "Signature Meat & Fish Combos",
      "title": "Kothurupaka Fish Kottu & Parota",
      "desc": "Shredded spicy fish kottu paired with warm flaky parotas.",
      "price": "₹ 360",
      "image": "assets/gallery/food-3.jpg",
      "ingredients": "Shredded fish kottu, flaky parotas, curry leaves, onions, green chillies, fennel"
    },
    {
      "id": "d1",
      "category": "desserts",
      "subcategory": "Desserts",
      "title": "Apricot Trifle",
      "desc": "Decadent Hyderabadi Qubani sweet layered with custard and sponge cake.",
      "price": "₹ 180",
      "image": "assets/gallery/ambiance-3.jpg",
      "ingredients": "Dried apricots (qubani), vanilla custard, sponge cake, fresh cream, sliced almonds"
    },
    {
      "id": "d2",
      "category": "desserts",
      "subcategory": "Desserts",
      "title": "NUT Crumble with Ice Cream",
      "desc": "Toasted almond and cashew crumble served over vanilla bean ice cream.",
      "price": "₹ 190",
      "image": "assets/gallery/ambiance-4.jpg",
      "ingredients": "Toasted almonds, cashews, pistachios, butter crumble, vanilla bean ice cream"
    },
    {
      "id": "d3",
      "category": "desserts",
      "subcategory": "Desserts",
      "title": "Desi Cake Jar",
      "desc": "Layered cake in jar infused with rabri and rose reduction.",
      "price": "₹ 170",
      "image": "assets/gallery/ambiance-5.jpg",
      "ingredients": "Sponge cake layers, cardamom rabri, rose syrup reduction, pistachio flakes"
    },
    {
      "id": "d4",
      "category": "desserts",
      "subcategory": "Desserts",
      "title": "Ferrero Rocher Jar",
      "desc": "Rich hazelnut chocolate mousse jar layered with wafer crunch.",
      "price": "₹ 220",
      "image": "assets/gallery/ambiance-1.jpg",
      "ingredients": "Hazelnut cocoa spread, chocolate sponge, crushed wafer cones, roasted hazelnuts, cream"
    }
  ]
};
});

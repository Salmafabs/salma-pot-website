// Salma Pot menu data.
//
// Two item shapes:
// 1) Simple item — has `sizes: [{label, price, stripeLink}]` directly.
// 2) Protein-variant item — has `proteins: [{label, sizes: [{label, price, stripeLink}]}]`.
//    The customer picks a protein first, then a size; price depends on both.
//    Use this whenever the same dish is offered with different protein options
//    (e.g. one "Nigerian Stew" product instead of five separate stew products).
//
// HOW TO ADD STRIPE LATER: once you have Payment Links from your Stripe dashboard,
// paste each link into the matching size's `stripeLink` value below — no other code
// changes needed. The cart automatically uses a direct Stripe link for any size that
// has one set, and falls back to the WhatsApp order flow for any size that doesn't.

const MENU = [
  {
    category: "Rice",
    items: [
      {
        id: "jollof-rice",
        name: "Jollof Rice",
        desc: "Our signature smoky-spiced tomato rice, cooked low and slow the Salma Pot way.",
        image: "assets/dish-jollof-rice.jpg",
        sizes: [
          { label: "2L", price: 30, stripeLink: null },
          { label: "4L", price: 55, stripeLink: null },
          { label: "6L", price: 78, stripeLink: null },
          { label: "10L", price: 120, stripeLink: null }
        ]
      },
      {
        id: "fried-rice",
        name: "Fried Rice",
        desc: "Vegetable-loaded fried rice with a gentle savoury kick.",
        image: null,
        sizes: [
          { label: "2L", price: 35, stripeLink: null },
          { label: "4L", price: 60, stripeLink: null },
          { label: "6L", price: 85, stripeLink: null },
          { label: "10L", price: 130, stripeLink: null }
        ]
      },
      {
        id: "white-rice",
        name: "White Rice",
        desc: "Simple, fluffy steamed rice — the perfect base for any soup.",
        image: null,
        sizes: [
          { label: "2L", price: 20, stripeLink: null },
          { label: "4L", price: 35, stripeLink: null },
          { label: "6L", price: 50, stripeLink: null },
          { label: "10L", price: 80, stripeLink: null }
        ]
      }
    ]
  },
  {
    category: "Rice Meals",
    items: [
      {
        id: "jollof-rice-meal",
        name: "Jollof Rice Meal",
        desc: "Our signature jollof rice, served with your choice of protein.",
        image: null,
        proteins: [
          {
            label: "Chicken",
            sizes: [
              { label: "2L", price: 40, stripeLink: null },
              { label: "4L", price: 70, stripeLink: null },
              { label: "6L", price: 95, stripeLink: null },
              { label: "10L", price: 150, stripeLink: null }
            ]
          },
          {
            label: "Beef",
            sizes: [
              { label: "2L", price: 42, stripeLink: null },
              { label: "4L", price: 75, stripeLink: null },
              { label: "6L", price: 100, stripeLink: null },
              { label: "10L", price: 155, stripeLink: null }
            ]
          },
          {
            label: "Turkey",
            sizes: [
              { label: "2L", price: 42, stripeLink: null },
              { label: "4L", price: 75, stripeLink: null },
              { label: "6L", price: 100, stripeLink: null },
              { label: "10L", price: 155, stripeLink: null }
            ]
          },
          {
            label: "Fish",
            sizes: [
              { label: "2L", price: 45, stripeLink: null },
              { label: "4L", price: 80, stripeLink: null },
              { label: "6L", price: 110, stripeLink: null },
              { label: "10L", price: 170, stripeLink: null }
            ]
          }
        ]
      },
      {
        id: "friedrice-chicken",
        name: "Fried Rice + Chicken",
        desc: "Fried rice paired with juicy, well-seasoned chicken.",
        image: null,
        sizes: [
          { label: "2L", price: 45, stripeLink: null },
          { label: "4L", price: 75, stripeLink: null },
          { label: "6L", price: 100, stripeLink: null },
          { label: "10L", price: 155, stripeLink: null }
        ]
      }
    ]
  },
  {
    category: "Soups",
    items: [
      {
        id: "egusi-soup",
        name: "Egusi Soup",
        desc: "Rich melon-seed soup with a deep, nutty flavour.",
        image: null,
        sizes: [
          { label: "2L", price: 55, stripeLink: null },
          { label: "4L", price: 100, stripeLink: null },
          { label: "6L", price: 140, stripeLink: null },
          { label: "10L", price: 220, stripeLink: null }
        ]
      },
      {
        id: "efo-riro",
        name: "Efo Riro",
        desc: "Vegetable soup simmered in a bold pepper base.",
        image: null,
        sizes: [
          { label: "2L", price: 55, stripeLink: null },
          { label: "4L", price: 100, stripeLink: null },
          { label: "6L", price: 140, stripeLink: null },
          { label: "10L", price: 220, stripeLink: null }
        ]
      },
      {
        id: "okra-soup",
        name: "Okra Soup",
        desc: "Silky okra soup, cooked the traditional way.",
        image: null,
        sizes: [
          { label: "2L", price: 55, stripeLink: null },
          { label: "4L", price: 100, stripeLink: null },
          { label: "6L", price: 140, stripeLink: null },
          { label: "10L", price: 220, stripeLink: null }
        ]
      },
      {
        id: "ogbono-soup",
        name: "Ogbono Soup",
        desc: "Hearty ogbono soup with a smooth, rich texture.",
        image: null,
        sizes: [
          { label: "2L", price: 55, stripeLink: null },
          { label: "4L", price: 100, stripeLink: null },
          { label: "6L", price: 140, stripeLink: null },
          { label: "10L", price: 220, stripeLink: null }
        ]
      }
    ]
  },
  {
    category: "Pepper Soup",
    items: [
      {
        id: "nigerian-peppersoup",
        name: "Nigerian Pepper Soup",
        desc: "A warming, aromatic peppery broth — choose your protein.",
        image: null,
        proteins: [
          {
            label: "Assorted",
            sizes: [
              { label: "2L", price: 50, stripeLink: null },
              { label: "4L", price: 90, stripeLink: null },
              { label: "6L", price: 125, stripeLink: null },
              { label: "10L", price: 200, stripeLink: null }
            ]
          },
          {
            label: "Fish",
            sizes: [
              { label: "2L", price: 55, stripeLink: null },
              { label: "4L", price: 100, stripeLink: null },
              { label: "6L", price: 140, stripeLink: null },
              { label: "10L", price: 220, stripeLink: null }
            ]
          },
          {
            label: "Chicken",
            sizes: [
              { label: "2L", price: 45, stripeLink: null },
              { label: "4L", price: 80, stripeLink: null },
              { label: "6L", price: 110, stripeLink: null },
              { label: "10L", price: 175, stripeLink: null }
            ]
          },
          {
            label: "Beef",
            sizes: [
              { label: "2L", price: 50, stripeLink: null },
              { label: "4L", price: 90, stripeLink: null },
              { label: "6L", price: 125, stripeLink: null },
              { label: "10L", price: 200, stripeLink: null }
            ]
          }
        ]
      }
    ]
  },
  {
    category: "Stew",
    items: [
      {
        id: "nigerian-stew",
        name: "Nigerian Stew",
        desc: "Rich, homemade Nigerian stew cooked with tomatoes, peppers, onions and authentic spices — choose your protein.",
        image: null,
        proteins: [
          {
            label: "Beef / Assorted",
            sizes: [
              { label: "2L", price: 45, stripeLink: null },
              { label: "4L", price: 80, stripeLink: null },
              { label: "6L", price: 110, stripeLink: null },
              { label: "10L", price: 175, stripeLink: null }
            ]
          },
          {
            label: "Chicken",
            sizes: [
              { label: "2L", price: 45, stripeLink: null },
              { label: "4L", price: 80, stripeLink: null },
              { label: "6L", price: 110, stripeLink: null },
              { label: "10L", price: 175, stripeLink: null }
            ]
          },
          {
            label: "Mackerel",
            sizes: [
              { label: "2L", price: 50, stripeLink: null },
              { label: "4L", price: 90, stripeLink: null },
              { label: "6L", price: 125, stripeLink: null },
              { label: "10L", price: 200, stripeLink: null }
            ]
          },
          {
            label: "Catfish",
            sizes: [
              { label: "2L", price: 55, stripeLink: null },
              { label: "4L", price: 100, stripeLink: null },
              { label: "6L", price: 140, stripeLink: null },
              { label: "10L", price: 220, stripeLink: null }
            ]
          }
        ]
      },
      {
        id: "ayamase",
        name: "Ayamase",
        desc: "Bold, peppery green stew — a Salma Pot favourite.",
        image: null,
        sizes: [
          { label: "2L", price: 50, stripeLink: null },
          { label: "4L", price: 90, stripeLink: null },
          { label: "6L", price: 125, stripeLink: null },
          { label: "10L", price: 200, stripeLink: null }
        ]
      }
    ]
  },
  {
    category: "Sides & Extras",
    items: [
      {
        id: "moi-moi",
        name: "Moi Moi",
        desc: "Steamed bean pudding, soft and satisfying.",
        image: null,
        sizes: [
          { label: "6 pieces", price: 15, stripeLink: null },
          { label: "12 pieces", price: 28, stripeLink: null },
          { label: "20 pieces", price: 45, stripeLink: null }
        ]
      },
      {
        id: "plantain",
        name: "Plantain",
        desc: "Sweet, golden fried plantain.",
        image: null,
        sizes: [
          { label: "Small tray", price: 12, stripeLink: null },
          { label: "Medium tray", price: 20, stripeLink: null },
          { label: "Large tray", price: 30, stripeLink: null }
        ]
      },
      {
        id: "puff-puff",
        name: "Puff Puff",
        desc: "Sweet, fluffy fried dough bites.",
        image: null,
        sizes: [
          { label: "20 pieces", price: 10, stripeLink: null },
          { label: "40 pieces", price: 18, stripeLink: null },
          { label: "60 pieces", price: 25, stripeLink: null }
        ]
      },
      {
        id: "akara",
        name: "Akara",
        desc: "Crispy bean fritters, a classic favourite.",
        image: null,
        sizes: [
          { label: "20 pieces", price: 12, stripeLink: null },
          { label: "40 pieces", price: 22, stripeLink: null },
          { label: "60 pieces", price: 30, stripeLink: null }
        ]
      },
      {
        id: "pounded-yam",
        name: "Pounded Yam",
        desc: "Traditional swallow, perfect with any soup.",
        image: null,
        sizes: [{ label: "Portion", price: 3, stripeLink: null }]
      },
      {
        id: "eba",
        name: "Eba",
        desc: "Traditional swallow, perfect with any soup.",
        image: null,
        sizes: [{ label: "Portion", price: 3, stripeLink: null }]
      },
      {
        id: "amala",
        name: "Amala",
        desc: "Traditional swallow, perfect with any soup.",
        image: null,
        sizes: [{ label: "Portion", price: 3, stripeLink: null }]
      }
    ]
  },
  {
    category: "Specials",
    items: [
      {
        id: "asun",
        name: "Asun",
        desc: "Spicy, smoky grilled goat meat.",
        image: null,
        sizes: [
          { label: "Small", price: 25, stripeLink: null },
          { label: "Medium", price: 45, stripeLink: null },
          { label: "Large", price: 70, stripeLink: null }
        ]
      },
      {
        id: "suya",
        name: "Suya",
        desc: "Char-grilled, spice-crusted skewers.",
        image: null,
        sizes: [
          { label: "Small", price: 20, stripeLink: null },
          { label: "Medium", price: 35, stripeLink: null },
          { label: "Large", price: 55, stripeLink: null }
        ]
      }
    ]
  },
  {
    category: "Drinks — Zobo",
    items: [
      {
        id: "zobo",
        name: "Zobo",
        desc: "Chilled hibiscus drink, naturally sweet and refreshing.",
        image: null,
        sizes: [
          { label: "500ml", price: 3.5, stripeLink: null },
          { label: "1L", price: 6, stripeLink: null },
          { label: "2L", price: 10, stripeLink: null },
          { label: "5L", price: 22, stripeLink: null },
          { label: "10L", price: 40, stripeLink: null }
        ]
      }
    ]
  }
];

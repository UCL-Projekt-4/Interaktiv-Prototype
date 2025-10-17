const shirtsCardigangs = [
  {
    id: 1,
    name: "grøn trøje",
    img: "img/trøje.png",
  },
];

const tshirtsAndTops = [
  {
    id: 1,
    name: "Sort T-shirt",
    img: "img/TikTok placeholder.png",
  },
];

const shirts = [
  {
    id: 1,
    name: "Pink skjorte",
    img: "img/shirt.png",
  },
];

const blouses = [];

const hoodiesAndSweatshirts = [];

export const categories = [
  {
    id: 1,
    category: "Alle Overdele",
    subCategories: [
      {
        id: 1,
        name: "Vis alt",
        products: [
          ...tshirtsAndTops,
          ...shirtsCardigangs,
          ...shirts,
          ...blouses,
          ...hoodiesAndSweatshirts,
        ],
      },
      {
        id: 2,
        name: "T-shirts og toppe",
        products: tshirtsAndTops,
      },
      {
        id: 3,
        name: "Trøjer og cardigans",
        products: shirtsCardigangs,
      },
      {
        id: 4,
        name: "Skjorter",
        products: shirts,
      },
      {
        id: 5,
        name: "Bluser",
        products: blouses,
      },
      {
        id: 6,
        name: "Hættetrøjer og sweatshirts",
        products: hoodiesAndSweatshirts,
      },
    ],
    description: "Alle overdeles produkter",
  },
  {
    id: 2,
    category: "Alle Underdele",
    subCategories: [],
    description: "Alle underdeles produkter",
  },
  {
    id: 3,
    category: "Træningstøj",
    subCategories: [],
    description: "Alle træningstøjs produkter",
  },
  {
    id: 4,
    category: "Jakker og Frakker",
    subCategories: [],
    description: "Alle jakker og frakkers produkter",
  },
  {
    id: 5,
    category: "Kjoler",
    subCategories: [],
    description: "Alle kjolers produkter",
  },
  {
    id: 6,
    category: "Playsuits og Jumpsuits",
    subCategories: [],
    description: "Alle playsuits og jumpsuits produkter",
  },
  {
    id: 7,
    category: "Sko",
    subCategories: [],
    description: "Alle skos produkter",
  },
];

export default categories;

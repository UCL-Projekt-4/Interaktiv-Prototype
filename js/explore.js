// Cecilie

import products from "./data.js";

const mainCategories = [
  // Array, der laver hovedkategorierne
  {
    name: "Overdele", // Navnet på hovedkategori
    subcategories: [
      // Laver et array med underkategorier, som laves som objekter med endnu et array indeni
      {
        name: "Vis alle",
        products: ["Sort T-shirt", "Hvid skjorte", "Blå sweatshirt"], // Nyt array med liste af produkter hentet fra "data.js"
      },
      {
        name: "T-shirts og toppe",
        // Har ingen produkter, da den bare skal vises i prototypen, og ikke fungere
      },
      {
        name: "Skjorter og bluser",
        // Har ingen produkter, da den bare skal vises i prototypen, og ikke fungere
      },
      {
        name: "Trøjer og cardigans",
        // Har ingen produkter, da den bare skal vises i prototypen, og ikke fungere
      },
      {
        name: "Hættetrøjer og sweatshirts",
        // Har ingen produkter, da den bare skal vises i prototypen, og ikke fungere
      },
    ],
  },

  {
    name: "Underdele", // Navnet på hovedkategori
    // Har ingen underkategorier, da den bare skal vises i prototypen, og ikke fungere
  },
  {
    name: "Træningstøj", // Navnet på hovedkategori
    // Har ingen underkategorier, da den bare skal vises i prototypen, og ikke fungere
  },
  {
    name: "Jakker og frakker", // Navnet på hovedkategori
    // Har ingen underkategorier, da den bare skal vises i prototypen, og ikke fungere
  },
  {
    name: "Kjoler", // Navnet på hovedkategori
    // Har ingen underkategorier, da den bare skal vises i prototypen, og ikke fungere
  },
];

// Tiffany
// Discover side - viser produkter baseret på valgte kategorier

import products from "./data.js";
import { createClothingItem, initLikeSystem } from "./likeItems.js";

// Vent på at DOM'en er loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialiser like systemet
  initLikeSystem();

  const wrapper = document.querySelector(".main__clothing-wrapper");

  // TODO: Tilføj logik til at filtrere produkter baseret på valgte kategorier
  // For nu vises alle produkter

  // Opret clothing items fra data
  products.forEach((product) => {
    const item = createClothingItem(product);
    wrapper.appendChild(item);
  });
});

// Funktion til at filtrere produkter baseret på kategori
export function filterByCategory(category) {
  const wrapper = document.querySelector(".main__clothing-wrapper");
  wrapper.innerHTML = ""; // Clear eksisterende items

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  filteredProducts.forEach((product) => {
    const item = createClothingItem(product);
    wrapper.appendChild(item);
  });
}

// Funktion til at vise alle produkter
export function showAllProducts() {
  const wrapper = document.querySelector(".main__clothing-wrapper");
  wrapper.innerHTML = ""; // Clear eksisterende items

  products.forEach((product) => {
    const item = createClothingItem(product);
    wrapper.appendChild(item);
  });
}

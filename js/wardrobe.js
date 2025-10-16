// Tiffany
// Wardrobe side - viser kun likede produkter

/* TODO Overall
 * TODO: Lav hjerterne funktionelle, samt at de bliver tilføjet til en liste som klædeskabet benytter
 *  Lav klædeskabet til at benytte en liste af likede ting
 *  Lav i outfits til at kun bruge det der ligger i klædeskab
 */

import {
  createClothingItem,
  initLikeSystem,
  getLikedProducts,
} from "./likeItems.js";

// Vent på at DOM'en er loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialiser like systemet og hent likede produkter
  initLikeSystem();

  const wrapper = document.querySelector(".main__clothing-wrapper");
  const likedProducts = getLikedProducts();

  // Vis kun likede produkter
  if (likedProducts.length === 0) {
    // Vis besked hvis ingen likede produkter
    const message = document.createElement("p");
    message.textContent = "Du har ikke liket nogen produkter endnu.";
    message.style.textAlign = "center";
    message.style.padding = "20px";
    message.style.color = "var(--text-primary)";
    wrapper.appendChild(message);
  } else {
    // Vis alle likede produkter
    likedProducts.forEach((product) => {
      const item = createClothingItem(product);
      wrapper.appendChild(item);
    });
  }
});

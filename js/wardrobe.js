// Tiffany
// Wardrobe side - viser kun likede produkter

// Importer funktioner fra likeItems.js modulet
import {
  createClothingItem, // Opretter HTML element for et tøjstykke med hjerte-ikon
  initLikeSystem, // Initialiserer like systemet og henter gemte likes fra localStorage
  getLikedProducts, // Returnerer array af alle likede produkter
} from "./likeItems.js";

// ========== GLOBAL STATE ==========
// Holder styr på hvilken view der er aktiv
let currentView = "wardrobe"; // Kan være 'wardrobe' (viser alle likede items) eller 'outfit' (dress-up doll)

// Holder styr på hvilket produkt der vises for hver kategori i outfit view
// Bruges til at huske positionen når man klikker på pilene
let currentIndices = {
  Overdele: 0, // Index for det aktuelle overdel (t-shirt, bluse, etc.)
  Underdele: 0, // Index for den aktuelle underdel (bukser, nederdel, etc.)
  Sko: 0, // Index for de aktuelle sko
};

// ========== HJÆLPEFUNKTIONER ==========
/**
 * Opretter en pil-knap til at navigere gennem tøj i outfit view
 * @param {string} direction - Retning af pilen: 'left' eller 'right'
 * @returns {HTMLButtonElement} - En knap med SVG pil-ikon
 */
function createArrow(direction) {
  // Opret knap element
  const arrow = document.createElement("button");
  arrow.className = `outfit__arrow outfit__arrow--${direction}`;

  // Tilføj SVG ikon afhængigt af retning (venstre eller højre)
  arrow.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M${
        direction === "left" ? "15 18L9 12L15 6" : "9 6L15 12L9 18" // En forkortet måde at lave en if statement på. Her er det hvis den er left så bruger den det efterfølgende path data, hvis ikke så bruger den det andet
      }" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  return arrow;
}

// ========== VIEW FUNKTIONER ==========
/**
 * Viser wardrobe view - et grid med alle likede produkter
 * Dette er den view hvor brugeren kan se alle deres gemte/likede tøjstykker
 */
function showWardrobeView() {
  // Find de to container elementer
  const wrapper = document.querySelector(".main__product-wrapper");
  const outfitWrapper = document.querySelector(".main__outfit-wrapper");

  // Vis wardrobe wrapper, skjul outfit wrapper
  wrapper.style.display = "flex";
  outfitWrapper.style.display = "none";

  // Ryd eksisterende indhold for at starte fra scratch
  wrapper.innerHTML = "";

  // Hent alle likede produkter fra localStorage
  const likedProducts = getLikedProducts();

  // Hvis der ikke er nogen likede produkter, vis en besked
  if (likedProducts.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Du har ikke liket nogen produkter endnu.";
    message.style.textAlign = "center";
    message.style.padding = "20px";
    message.style.color = "var(--text-primary)";
    wrapper.appendChild(message);
  } else {
    // Gennemgå alle likede produkter og opret et clothing item for hver
    likedProducts.forEach((product) => {
      const item = createClothingItem(product); // Opretter HTML med billede og hjerte
      wrapper.appendChild(item);
    });
  }
}

/**
 * Opdaterer display for en specifik tøj-kategori i outfit view
 * Viser det aktuelle produkt og tilføjer navigation pile
 *
 * @param {string} category - Kategorinavn: 'Overdel', 'Underdel' eller 'Sko'
 * @param {Array} categoryProducts - Array af produkter i denne kategori
 */
function updateCategoryDisplay(category, categoryProducts) {
  // Find det rigtige slot element baseret på kategori
  const slotId = `outfit-slot-${category.toLowerCase()}`;
  const slot = document.getElementById(slotId);

  console.log(
    `Updating ${category}, slot:`,
    slot,
    "products:",
    categoryProducts
  );

  // Hvis slot ikke findes eller ingen produkter, stop her
  if (!slot || categoryProducts.length === 0) return;

  // Hent det aktuelle index for denne kategori (hvilket produkt vi viser)
  const currentIndex = currentIndices[category];
  const currentProduct = categoryProducts[currentIndex];

  console.log(`Current product for ${category}:`, currentProduct);

  // Ryd slot for alt tidligere indhold
  slot.innerHTML = "";

  // Opret og tilføj billede af det aktuelle produkt
  const img = document.createElement("img");
  img.src = currentProduct.image;
  img.alt = currentProduct.description;
  img.className = "outfit__clothing-image";
  slot.appendChild(img);

  // Tilføj venstre pil (kun hvis der er mere end 1 produkt at vælge imellem)
  if (categoryProducts.length > 1) {
    const leftArrow = createArrow("left");

    // Når pilen klikkes: gå til forrige produkt (med wrap-around)
    leftArrow.addEventListener("click", () => {
      currentIndices[category] =
        (currentIndex - 1 + categoryProducts.length) % categoryProducts.length;
      updateCategoryDisplay(category, categoryProducts); // Genopbyg display
    });
    slot.appendChild(leftArrow);
  }

  // Tilføj højre pil (kun hvis der er mere end 1 produkt)
  if (categoryProducts.length > 1) {
    const rightArrow = createArrow("right");

    // Når pilen klikkes: gå til næste produkt (med wrap-around)
    rightArrow.addEventListener("click", () => {
      currentIndices[category] = (currentIndex + 1) % categoryProducts.length;
      updateCategoryDisplay(category, categoryProducts); // Genopbyg display
    });
    slot.appendChild(rightArrow);
  }
}

/**
 * Viser outfit view - en dress-up doll hvor brugeren kan prøve tøj
 * Viser en avatar med mulighed for at vælge et tøjstykke fra hver kategori
 */
function showOutfitView() {
  // Find de to container elementer
  const wrapper = document.querySelector(".main__product-wrapper");
  const outfitWrapper = document.querySelector(".main__outfit-wrapper");

  console.log("showOutfitView called");
  console.log("outfitWrapper:", outfitWrapper);

  // Skjul wardrobe wrapper, vis outfit wrapper
  wrapper.style.display = "none";
  outfitWrapper.style.display = "flex";

  // Ryd eksisterende indhold
  outfitWrapper.innerHTML = "";

  // ========== OPRET HOVEDCONTAINER ==========
  // Opret container til dress-up doll (avatar + tøj lagdelt ovenpå)
  const dressUpContainer = document.createElement("div");
  dressUpContainer.className = "outfit__dressup-container";

  // Tilføj avatar som baggrundsbillede (z-index: 1, nederste lag)
  const avatarImg = document.createElement("img");
  avatarImg.src = "img/avatarNoArms.svg"; // Avatar uden arme så tøjet passer bedre
  avatarImg.alt = "Avatar";
  avatarImg.className = "outfit__avatar-base";
  dressUpContainer.appendChild(avatarImg);

  // Tilføj container til DOM NU, så getElementById virker senere
  // Dette er vigtigt fordi vi bruger getElementById i updateCategoryDisplay
  outfitWrapper.appendChild(dressUpContainer);

  // ========== HENT OG FILTRER PRODUKTER ==========
  // Hent alle likede produkter
  const likedProducts = getLikedProducts();
  console.log("Liked products:", likedProducts);

  // Opdel produkter i kategorier (Overdel, Underdel, Sko)
  const categories = {
    Overdele: likedProducts.filter((p) => p.category === "Overdele"),
    Underdele: likedProducts.filter((p) => p.category === "Underdele"),
    Sko: likedProducts.filter((p) => p.category === "Sko"),
  };

  console.log("Categories:", categories);

  // ========== OPRET SLOTS FOR HVER KATEGORI ==========
  // Gennemgå hver kategori (Overdel, Underdel, Sko) i rækkefølge
  ["Overdele", "Underdele", "Sko"].forEach((category) => {
    // Opret en slot (position) for denne kategori
    const slot = document.createElement("div");
    slot.id = `outfit-slot-${category.toLowerCase()}`; // ID bruges til at finde elementet senere
    slot.className = `outfit__clothing-slot outfit__clothing-slot--${category.toLowerCase()}`;

    const categoryProducts = categories[category];

    console.log(`${category} products:`, categoryProducts);

    // Tilføj slot til container NU (før updateCategoryDisplay kaldes)
    // Dette sikrer at getElementById kan finde slot'en
    dressUpContainer.appendChild(slot);

    // ========== HÅNDTER TOM ELLER FYLDT KATEGORI ==========
    if (categoryProducts.length === 0) {
      // Hvis ingen produkter i denne kategori, vis placeholder besked
      const placeholder = document.createElement("div");
      placeholder.className = "outfit__placeholder";
      placeholder.textContent = `Ingen ${category.toLowerCase()} i klædeskabet`;
      slot.appendChild(placeholder);
    } else {
      // Der er produkter! Vis det første (eller det gemte index)

      // Sikr at index ikke er udenfor range (hvis produkter er blevet slettet)
      if (currentIndices[category] >= categoryProducts.length) {
        currentIndices[category] = 0;
      }

      // Byg display med billede og pile
      updateCategoryDisplay(category, categoryProducts);
    }
  });

  console.log("Outfit view built");
}

/**
 * Skifter mellem wardrobe view og outfit view
 * Opdaterer også top bar knappernes visuelle tilstand
 *
 * @param {string} view - Hvilken view der skal vises: 'wardrobe' eller 'outfit'
 */
function switchView(view) {
  // Opdater global state
  currentView = view;

  // Find top bar knapperne
  const wardrobeBtn = document.getElementById("wardrobeTopBtn");
  const outfitBtn = document.getElementById("outfitTopBtn");

  // Skift view baseret på hvilken knap der blev klikket
  if (view === "wardrobe") {
    // Marker wardrobe knap som selected, fjern selection fra outfit knap
    wardrobeBtn.classList.add("header__btn--selected");
    outfitBtn.classList.remove("header__btn--selected");
    // Vis wardrobe view (grid med alle likede items)
    showWardrobeView();
  } else {
    // Marker outfit knap som selected, fjern selection fra wardrobe knap
    wardrobeBtn.classList.remove("header__btn--selected");
    outfitBtn.classList.add("header__btn--selected");
    // Vis outfit view (dress-up doll)
    showOutfitView();
  }
}

// ========== INITIALISER NÅR SIDEN LOADER ==========
/**
 * Denne kode kører når HTML dokumentet er færdig med at loade
 * Sætter systemet op og tilføjer event listeners til knapperne
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialiser like systemet (henter gemte likes fra localStorage)
  initLikeSystem();

  // Find top bar knapperne
  const wardrobeBtn = document.getElementById("wardrobeTopBtn");
  const outfitBtn = document.getElementById("outfitTopBtn");

  // Tilføj click handlers til knapperne
  // Når "Klædeskab" klikkes, skift til wardrobe view
  wardrobeBtn.addEventListener("click", () => switchView("wardrobe"));

  // Når "Outfits" klikkes, skift til outfit view
  outfitBtn.addEventListener("click", () => switchView("outfit"));

  // Vis wardrobe view som standard når siden loader
  showWardrobeView();
});

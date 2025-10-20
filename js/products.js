// Import produkter og like-funktionalitet
// products importeres fra data.js (indeholder alle produkterne)
// createClothingItem og initLikeSystem importeres fra likeItems.js (håndterer visning og like-funktionalitet)
import products from "./data.js";
import { createClothingItem, initLikeSystem } from "./likeItems.js";

// Initialiser like systemet når siden loader
// DOMContentLoaded betyder at koden køres når HTML-dokumentet er fuldt indlæst
document.addEventListener("DOMContentLoaded", function () {
  initLikeSystem(); // Initialiser like-systemet (hjerte-ikoner osv.)

  // Produktside fra subcategories eller fra discover (Vis alt)
  // Tjek om vi er på products.html siden
  if (window.location.pathname.endsWith("products.html")) {
    // Hent data fra localStorage
    // subcategory: hvis brugeren kom fra subcategories-siden (f.eks. "Bukser")
    // category: hvis brugeren kom direkte fra discover-siden (f.eks. "Vis alt")
    const subcategory = JSON.parse(localStorage.getItem("selectedSubcategory"));
    const category = JSON.parse(localStorage.getItem("selectedCategory"));
    const wrapper = document.getElementById("product-wrapper"); // HTML-element hvor produkterne skal vises

    if (wrapper) {
      wrapper.innerHTML = ""; // Tøm wrapper først, så der ikke vises duplikerede produkter

      // PRIORITET 1: Hvis vi har en subcategory (mest specifik)
      // Dette sker når brugeren har valgt en specifik underkategori som "Bukser" eller "T-shirts og toppe"
      if (subcategory && subcategory.name) {
        let filteredProducts = []; // Array til at holde de filtrerede produkter

        // Hvis underkategorien er "Vis alt" og der er en parentCategory
        // Eksempel: "Vis alt" under "Overdele" skal vise alle overdele
        if (subcategory.name === "Vis alt" && subcategory.parentCategory) {
          // Filtrer produkter baseret på hovedkategori
          filteredProducts = products.filter(
            (product) => product.category === subcategory.parentCategory
          );
        } else {
          // Filtrer produkter baseret på den specifikke underkategori-navn
          // Eksempel: Hvis "Bukser" er valgt, vis kun produkter med underCategory === "Bukser"
          filteredProducts = products.filter(
            (product) => product.underCategory === subcategory.name
          );
        }

        // Hvis der er produkter der matcher filteret
        if (filteredProducts.length > 0) {
          // For hvert filtreret produkt, opret et produkt-element og tilføj det til siden
          filteredProducts.forEach((product) => {
            const item = createClothingItem(product); // Opret HTML for produktet
            wrapper.appendChild(item); // Tilføj produktet til wrapper
          });
        } else {
          // Hvis ingen produkter matcher, vis en besked
          wrapper.textContent =
            "Der er ingen produkter i denne kategori endnu.";
          console.warn("Ingen produkter matchede:", subcategory);
        }
      }
      // PRIORITET 2: Hvis vi kommer direkte fra discover med "Vis alt"
      // Dette sker når brugeren klikker på "Vis alt" på discover-siden
      else if (category && category.category === "Vis alt") {
        // Vis ALLE produkter uden filtrering
        products.forEach((product) => {
          const item = createClothingItem(product); // Opret HTML for produktet
          wrapper.appendChild(item); // Tilføj produktet til wrapper
        });
      }
      // FEJLHÅNDTERING: Hvis hverken subcategory eller "Vis alt" er valgt
      else {
        wrapper.textContent = "Der er ingen produkter i denne kategori endnu.";
        console.error(
          "Hverken selectedSubcategory eller selectedCategory (Vis alt) blev fundet:",
          { subcategory, category }
        );
      }
    }
  }
});

// Tilføj event listener til tilbage-knappen
// Når knappen klikkes, køres goBack-funktionen (defineret nedenfor)
document.getElementById("backButton").addEventListener("click", goBack);

// Funktion der håndterer navigation tilbage fra produktsiden
// Funktionen tjekker hvor brugeren kom fra, og sender dem tilbage til den rigtige side
function goBack() {
  // Hent data fra localStorage for at finde ud af hvor brugeren kom fra
  const subcategory = JSON.parse(localStorage.getItem("selectedSubcategory"));
  const category = JSON.parse(localStorage.getItem("selectedCategory"));

  // PRIORITET 1: Hvis vi har en subcategory, kom brugeren fra subcategories-siden
  if (subcategory) {
    localStorage.removeItem("selectedSubcategory"); // Ryd subcategory data
    window.location.href = "subcategories.html"; // Naviger tilbage til subcategories-siden
  }
  // PRIORITET 2: Hvis brugeren kom direkte fra discover med "Vis alt"
  else if (category && category.category === "Vis alt") {
    localStorage.removeItem("selectedCategory"); // Ryd category data
    window.location.href = "discover.html"; // Naviger tilbage til discover-siden
  }
  // FALLBACK: Hvis noget gik galt, ryd alt og gå til discover
  else {
    localStorage.removeItem("selectedCategory"); // Ryd category data
    localStorage.removeItem("selectedSubcategory"); // Ryd subcategory data
    window.location.href = "discover.html"; // Naviger til discover-siden
  }
}

// Tilføj event listener til tilbage-knappen
// Når knappen klikkes, køres goBack-funktionen (defineret længere nede)
document.getElementById("backButton").addEventListener("click", goBack);

// Funktion der dynamisk opretter knapper baseret på et array af items
// Parametrene er:
// - items: array af underkategorier, der skal laves knapper af
// - wrapperId: ID'et på det HTML-element, hvor knapperne skal indsættes
// - clickHandler: en funktion, der køres når en knap bliver klikket på
function createButtons(items, wrapperId, clickHandler) {
  const wrapper = document.getElementById(wrapperId); // Find det HTML-element, hvor knapperne skal indsættes
  wrapper.innerHTML = ""; // Tøm elementet først, så der ikke laves duplikerede knapper

  // Inspiration til 'forEach': https://youtu.be/uOZWH0KEUs4
  // For hver underkategori i items-arrayet...
  items.forEach((item) => {
    const categoryButton = document.createElement("button"); // ... oprettes der et nyt button-element
    categoryButton.classList.add("main__category-btn"); // Tilføj CSS-klassen "main__category-btn" til knappen
    categoryButton.textContent = item.name; // Sæt knappens tekst til underkategoriens navn
    categoryButton.onclick = () => clickHandler(item); // Når knappen klikkes, kør clickHandler-funktionen med den valgte underkategori
    wrapper.appendChild(categoryButton); // Tilføj knappen til wrapper-elementet i HTML
  });
}

// Underkategorier på 'subcategory'-siden

// Hent den valgte hovedkategori fra localStorage
// JSON.parse konverterer tekst-strengen tilbage til et JavaScript-objekt
const category = JSON.parse(localStorage.getItem("selectedCategory"));

// Hvis den valgte kategori har underkategorier (f.eks. "Overdele" har "T-shirts og toppe", "Bluser", osv.)
if (category.subCategories) {
  // Opret knapper for hver underkategori
  createButtons(category.subCategories, "subcategory-wrapper", (sub) => {
    // Hvis underkategorien er "Vis alt", tilføj information om hvilken hovedkategori den hører til
    // Dette bruges senere i products.js til at vise alle produkter fra hovedkategorien
    if (sub.name === "Vis alt") {
      sub.parentCategory = category.category;
    }

    // Gem den valgte underkategori i localStorage
    // JSON.stringify konverterer objektet til en tekst-streng
    localStorage.setItem("selectedSubcategory", JSON.stringify(sub));

    // Naviger til produktsiden
    window.location.href = "products.html";
  });
}

// Funktion der køres når tilbage-knappen klikkes
function goBack() {
  // Fjern den gemte kategori fra localStorage, så den ikke påvirker næste besøg
  localStorage.removeItem("selectedCategory");

  // Naviger tilbage til discover-siden
  window.location.href = "discover.html";
}

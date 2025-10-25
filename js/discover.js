// Array med alle hovedkategorier, der vises på discover-siden
// Hver kategori har:
// - id: unikt nummer for kategorien
// - category: navnet på kategorien, der vises på knappen
// - subCategories: et array med underkategorier (tomt hvis kategorien ikke har underkategorier)
// - description: beskrivelse af kategorien
const categories = [
  {
    id: 0,
    category: "Vis alt",
    subCategories: [],
    description: "Alle produkter",
  },
  {
    id: 1,
    category: "Overdele",
    subCategories: [
      {
        id: 1,
        name: "Vis alt",
      },
      {
        id: 2,
        name: "T-shirts og toppe",
      },
      {
        id: 3,
        name: "Trøjer og cardigans",
      },
      {
        id: 4,
        name: "Jakker",
      },
      {
        id: 5,
        name: "Bluser",
      },
      {
        id: 6,
        name: "Hættetrøjer og sweatshirts",
      },
    ],
    description: "Alle overdeles produkter",
  },
  {
    id: 2,
    category: "Underdele",
    subCategories: [
      {
        id: 1,
        name: "Vis alt",
      },
      {
        id: 2,
        name: "Bukser",
      },
      {
        id: 3,
        name: "Nederdele",
      },
      {
        id: 4,
        name: "Shorts",
      },
      {
        id: 5,
        name: "Jeans",
      },
    ],
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
    category: "Kjoler",
    subCategories: [],
    description: "Alle kjolers produkter",
  },
  {
    id: 5,
    category: "Playsuits og Jumpsuits",
    subCategories: [],
    description: "Alle playsuits og jumpsuits produkter",
  },
  {
    id: 6,
    category: "Sko",
    subCategories: [
      {
        id: 1,
        name: "Vis alt",
      },
      {
        id: 2,
        name: "Ballerinasko",
      },
    ],
    description: "Alle skos produkter",
  },
];

// Funktion der dynamisk opretter knapper baseret på et array af items
// Parametrene er:
// - items: array af kategorier, der skal laves knapper af
// - wrapperId: ID'et på det HTML-element, hvor knapperne skal indsættes
// - clickHandler: en funktion, der køres når en knap bliver klikket på
function createButtons(items, wrapperId, clickHandler) {
  const wrapper = document.getElementById(wrapperId); // Find det HTML-element, hvor knapperne skal indsættes
  wrapper.innerHTML = ""; // Tøm elementet først, så der ikke laves duplikerede knapper

  // Inspiration til 'forEach': https://youtu.be/uOZWH0KEUs4
  // For hver kategori i items-arrayet...
  items.forEach((item) => {
    const categoryButton = document.createElement("button"); // ... oprettes der et nyt button-element
    categoryButton.classList.add("main__category-btn"); // Tilføj CSS-klassen "main__category-btn" til knappen
    categoryButton.textContent = item.category; // Sæt knappens tekst til kategoriens navn
    categoryButton.onclick = () => clickHandler(item); // Når knappen klikkes, kør clickHandler-funktionen med den valgte kategori
    wrapper.appendChild(categoryButton); // Tilføj knappen til wrapper-elementet i HTML
  });
}

// Hovedkategorier på 'discover'-siden
// Der er til nedenstående brugt ChatGPT til at navigere mellem HTML-siderne og samtidig "overføre data",
// så det er de rigtige underkategorier, der kommer frem. Se bilag XXX for prompt (jeg har ændret lidt på navnene).

// Opret kategori-knapper og definer hvad der skal ske når de bliver klikket på
createButtons(categories, "category-wrapper", (chosenCategory) => {
  // localStorage bruges til at gemme data mellem forskellige HTML-sider
  // JSON.stringify konverterer objektet til en tekst-streng, da localStorage kun kan gemme tekst

  // Ryd gammel subcategory data først, så tidligere valg ikke påvirker den nye navigation
  localStorage.removeItem("selectedSubcategory");

  // Gem den valgte kategori i localStorage, så den kan hentes på næste side
  localStorage.setItem("selectedCategory", JSON.stringify(chosenCategory));

  // Hvis "Vis alt" er valgt, spring subcategories-siden over og gå direkte til produktsiden
  if (chosenCategory.category === "Vis alt") {
    window.location.href = "products.html"; // Naviger til products.html
  } else {
    // Ellers skal brugeren vælge en underkategori først
    window.location.href = "subcategories.html"; // Naviger til subcategories.html
  }
});

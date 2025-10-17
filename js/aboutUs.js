// Tiffany
// Accordion-logik for "Alkohol" sektionen på Om os-siden
// Denne fil opbygger og toggler indholdet inde i en accordion, når brugeren klikker.

/**
 * Indhold af accordion for alkohol
 *
 * Strukturen her beskriver den rækkefølge og de elementtyper,
 * der indsættes dynamisk i accordionens indhold.
 *
 * - type: "p" (afsnit) eller "ul" (punktliste)
 * - text: bruges når type === "p"
 * - items: bruges når type === "ul" (array af listepunkter)
 */
const alcoholContents = [
  { type: "p", text: "Vi arbejder for en sundere alkoholkultur i Danmark" },
  {
    type: "ul",
    items: [
      "Vi ønsker, at mennesker med misbrug kommer tidligere i behandling",
      "Vi ønsker, at dobbelt så mange kommer i behandling",
      "Vi vil nedbryde tabu om misbrug",
      "Vi vil hjælpe mennesker i misbrug og deres pårørende",
    ],
  },
];

// Finder det element, som der skal klikkes på for at toggle accordion'en.
const alcoholAccordion = document.getElementById("alcoholAccordion");
// Tilføj event listener til accordion-elementet
alcoholAccordion.addEventListener("click", accordion);

/**
 * Bruges til at tjekke om accordion er åben eller lukket
 * Denne starter som lukket
 */
let alcoholView = false;

/**
 * Toggler visningen af indholdet inde i accordion'en baseret på `alcoholView`.
 *
 * Når lukket (alcoholView === false):
 *  - Opretter en .accordion__content container
 *  - Bygger indhold fra alcoholContents og tilføjer til containeren
 *  - Skifter ikon fra ned-pil til op-pil
 *
 * Når åben (alcoholView === true):
 *  - Fjerner .accordion__content containeren
 *  - Skifter ikon fra op-pil til ned-pil
 */
function accordion() {
  if (!alcoholView) {
    // Viser indholdet fra alcoholContents arrayet (OPBYGGER DOM'en)
    const contentDiv = document.createElement("div"); // Container for alt accordion-indholdet
    contentDiv.classList.add("accordion__content"); // Class til styling/selektor

    // Tilføjer indholdet for hver ting i alcoholContents arrayet
    alcoholContents.forEach((content) => {
      if (content.type === "p") {
        // Afsnit
        const p = document.createElement("p"); // Opret afsnit
        p.classList.add("accordion__description"); // Class til styling
        p.textContent = content.text; // Indsæt tekst
        contentDiv.appendChild(p); // Tilføj til container
      } else if (content.type === "ul") {
        // Punktliste
        const ul = document.createElement("ul"); // Opret liste
        ul.classList.add("accordion__list"); // Class til styling
        content.items.forEach((item) => {
          // Opret et <li> for hver tekst i items
          const li = document.createElement("li");
          li.classList.add("accordion__list-item"); // Class til styling
          li.textContent = item; // Sæt tekst
          ul.appendChild(li); // Tilføj til listen
        });
        contentDiv.appendChild(ul); // Tilføj liste til container
      }
    });
    // Indsæt hele indholdscontaineren i accordion-elementet
    alcoholAccordion.appendChild(contentDiv);

    // Ændrer ikonet for at vise at accordion er åben
    // Finder første <i> ikon inde i accordion og skifter klasser
    alcoholAccordion.querySelector("i").classList.remove("fa-chevron-down");
    alcoholAccordion.querySelector("i").classList.add("fa-chevron-up");
    alcoholView = true;
  } else {
    // Skjul indhold (FJERN DOM'en igen)

    const contentDiv = alcoholAccordion.querySelector(".accordion__content");
    if (contentDiv) {
      alcoholAccordion.removeChild(contentDiv); // Fjern containeren
    }
    // Skift ikon tilbage til ned-pil
    alcoholAccordion.querySelector("i").classList.remove("fa-chevron-up");
    alcoholAccordion.querySelector("i").classList.add("fa-chevron-down");
    alcoholView = false;
  }
}

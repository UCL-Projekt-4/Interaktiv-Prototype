import { categories } from "./data.js";

function createButtons(items, wrapperId, clickHandler) {
  // (items, wrapperId, clickHandler) er parametre, som udfyldes senere. Funktionen fortæller altså hvad der skal ske, når disse parametre udfyldes. De kan ses lidt som placeholdere.
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML = "";
  items.forEach((item) => {
    // Inspiration til 'forEach': https://youtu.be/uOZWH0KEUs4. For hvert item (kategori)...
    const categoryButton = document.createElement("button"); // ... laves der et element, som er en button. Den laves som en variabel (const), for at vi kan "hente" den igen og genbruge den flere gange...
    categoryButton.classList.add("main__category-btn"); // ... og til knappen tilføjes der en class
    categoryButton.textContent = item.category; // Her hentes den tekstværdi, der er i item (kategorien), og det er specifikt dens navn, der indsættes.
    categoryButton.onclick = () => clickHandler(item);
    wrapper.appendChild(categoryButton);
  });
}

// Hovedkategorier på 'dicover'-siden
// der er til nedenstående brugt ChatGPT til at navigere mellem HTML-siderne og samtidig "overføre data", så det er de rigtige underkategorier, der kommer frem. Se bilag XXX for promt (jeg har ændret lidt på navnene).

// vurderer hvilken side, vi er på
createButtons(categories, "category-wrapper", (chosenCategory) => {
  // nedenfor bruges der localStorage, da vi skal navigere mellem flere forskellige HTML-sider, men samtidig skal huske hvilken knap der blev trykket på.
  // der bruges også JSON.stringify, da localStorage kun kan gemme tekst, og ikke objekter
  localStorage.setItem("selectedCategory", JSON.stringify(chosenCategory)); // her sættes den valgte kategori ind i localStorage via selectedCategory, så den kan hentes på næste side (kommer længere nede).
  window.location.href = "subcategories.html";
});

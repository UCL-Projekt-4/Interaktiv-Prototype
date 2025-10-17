document.getElementById("backButton").addEventListener("click", goBack);

function createButtons(items, wrapperId, clickHandler) {
  // (items, wrapperId, clickHandler) er parametre, som udfyldes senere. Funktionen fortæller altså hvad der skal ske, når disse parametre udfyldes. De kan ses lidt som placeholdere.
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML = "";
  items.forEach((item) => {
    // Inspiration til 'forEach': https://youtu.be/uOZWH0KEUs4. For hvert item (kategori)...
    const categoryButton = document.createElement("button"); // ... laves der et element, som er en button. Den laves som en variabel (const), for at vi kan "hente" den igen og genbruge den flere gange...
    categoryButton.classList.add("main__category-btn"); // ... og til knappen tilføjes der en class
    categoryButton.textContent = item.name; // Her hentes den tekstværdi, der er i item (kategorien), og det er specifikt dens navn, der indsættes.
    categoryButton.onclick = () => clickHandler(item);
    wrapper.appendChild(categoryButton);
  });
}

// Underkategorier på 'subcategory'-siden
// vurderer hvilken side, vi er på
const category = JSON.parse(localStorage.getItem("selectedCategory")); // her
// const title = document.getElementById("subcategory-title");
// title.textContent = category.name;

if (category.subCategories) {
  createButtons(category.subCategories, "subcategory-wrapper", (sub) => {
    localStorage.setItem("selectedSubcategory", JSON.stringify(sub));
    window.location.href = "products.html";
  });
}

function goBack() {
  localStorage.removeItem("selectedCategory");
  window.location.href = "discover.html";
}

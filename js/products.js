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

// Produktside
if (window.location.pathname.endsWith("products.html")) {
  const subcategory = JSON.parse(localStorage.getItem("selectedSubcategory"));

  const wrapper = document.getElementById("product-wrapper");
  wrapper.innerHTML = "";

  if (subcategory.products && subcategory.products.length > 0) {
    subcategory.products.forEach((product) => {
      const img = document.createElement("img");
      img.src = product.img; //produkt punktum navn viser name, produkt . img viser billedet
      img.alt = product.name;
      wrapper.appendChild(img);
    });
  } else {
    wrapper.textContent = "Der er ingen produkter i denne kategori endnu.";
  }
}

function goBack() {
  localStorage.removeItem("selectedSubcategory");
  window.location.href = "subcategories.html";
}

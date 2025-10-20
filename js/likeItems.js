// Tiffany
// Fælles modul til at håndtere like-funktionalitet

// Liste til at holde likede produkter
let likedProducts = [];

// Funktion til at gemme likede produkter i localStorage
function saveLikedProducts() {
  localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
}

// Funktion til at hente likede produkter fra localStorage
function loadLikedProducts() {
  const saved = localStorage.getItem("likedProducts");
  if (saved) {
    likedProducts = JSON.parse(saved);
  }
  return likedProducts;
}

// Funktion til at få alle likede produkter
export function getLikedProducts() {
  return likedProducts;
}

// Funktion til at oprette et clothing item element med hjerte
export function createClothingItem(product) {
  const item = document.createElement("div");
  item.className = "main__product-item";
  item.dataset.productId = product.id;

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.description;

  const heartSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  heartSvg.setAttribute("class", "main__heart-icon");
  heartSvg.setAttribute("width", "24");
  heartSvg.setAttribute("height", "24");
  heartSvg.setAttribute("viewBox", "0 0 24 24");
  heartSvg.setAttribute("fill", "currentColor");

  // Tjek om produktet allerede er liked
  if (likedProducts.some((p) => p.id === product.id)) {
    heartSvg.classList.add("main__heart-icon--liked");
  }

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999Z"
  );
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  heartSvg.appendChild(path);
  item.appendChild(img);
  item.appendChild(heartSvg);

  // Tilføj event listener til hjertet
  heartSvg.addEventListener("click", function () {
    toggleLike(product, heartSvg);
  });

  return item;
}

// Funktion til at toggle like status
function toggleLike(product, heartElement) {
  heartElement.classList.toggle("main__heart-icon--liked");

  const isLiked = heartElement.classList.contains("main__heart-icon--liked");

  if (isLiked) {
    // Tilføj produktet til listen hvis det ikke allerede er der
    if (!likedProducts.some((p) => p.id === product.id)) {
      likedProducts.push(product);
      console.log("Produkt tilføjet til liked liste:", product);
    }
  } else {
    // Fjern produktet fra listen
    likedProducts = likedProducts.filter((p) => p.id !== product.id);
    console.log("Produkt fjernet fra liked liste:", product);
  }

  saveLikedProducts();
  console.log("Alle likede produkter:", likedProducts);
}

// Initialiser liked products ved start
export function initLikeSystem() {
  loadLikedProducts();
}

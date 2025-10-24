// CECILIEs DEL
// Denne del er en "miniversion" af dét kodestykke, som skal sørge for at når man trykke på et stykke tøj, er det dét der åbnes på avataren.
// Grundet misforståelser i gruppen er dette kodestykke lavet to gange, på to forskellige måder -- derfor vises dette stykke for sig som en lille prototype med eget HTML, CSS og JS. 

let clothingItems = [ // arrayet indeholder tøjet med type og billede, som bruges senere. Hvis det var "rigtigt" skulle disse hentes fra data.js. Dette er altså derfor bare et lille udvalg for at vise at koden fungerer. 
  { type: "shirt", src: "../img/toj/adidasTroje.webp" },
  { type: "shirt", src: "../img/toj/cowboyJakke.webp" },
  { type: "shirt", src: "../img/toj/sortTop.webp" },
  { type: "pants", src: "../img/toj/ternetNederdel.webp" },
  { type: "pants", src: "../img/toj/bruneBukser.webp" },
  { type: "pants", src: "../img/toj/cowboyBukser.webp" },
];

/*const defaultOutfit = { // denne funktion gør, at der altid er et default outfit på avataren. 
  shirt: "images/default/default_shirt.png",
  pants: "images/default/default_pants.png"
};*/

function displayClothingOptions() {
  const grid = document.getElementById("clothingGrid"); // der tages fat i elementet (en div), der har id'et "clothingGrid". Det er her tøjstykkerne vises og kan trykkes på. 

  clothingItems.forEach(item => { // loopet 'forEach' sætter nedenstående specifikationer (img, type, class name etc.) på hvert item. Dette gør, at der i "clothingGrid", vises et "net" af tøjprodukter.
    let img = document.createElement("img");
    img.src = item.src;
    img.alt = item.type;
    img.className = "clothing";
    img.addEventListener("click", () => {
      selectClothing(item);
    });

    grid.appendChild(img);
  });
}

function selectClothing(item) {
  localStorage.setItem("selectedType", item.type); // "gemmer"/"sætter" item'et lokalt, så det er det rigtige stykke tøj, der følger med over på avataren 
  localStorage.setItem("selectedImage", item.src); // - || -
  window.location.href = "avatar.html"; // navigerer over til avataren i avatar.html
}

function showClothingOnAvatar() {
  const shirt = document.getElementById("shirt");
  const pants = document.getElementById("pants");
  if (shirt == null || pants == null) {
  return; // hvis 'shirt' eller 'pants' ikke findes stoppes funktionen.
}

  // her hentes det midlertidige valg fra localStorage (brugeren har klikket på dette tøjstykke)
  let selectedType = localStorage.getItem("selectedType");
  let selectedImage = localStorage.getItem("selectedImage");

  // hent det tøj, der allerede er vist på avataren, eller brug default hvis der ikke er gemt noget (chatGPT har lavet denne forklaring (har bare sat de to nedenstående linjer ind og bedst den lave en note))
  let savedShirt = localStorage.getItem("currentShirt") //|| defaultOutfit.shirt; // eksisterende bluse eller default
  let savedPants = localStorage.getItem("currentPants")//|| defaultOutfit.pants; // eksisterende bukser eller default

  // her opdateres *kun* det stykke tøj, der er valgt
  if (selectedType === "shirt") savedShirt = selectedImage; // hvis der er valgt en bluse, opdateres blusen
  if (selectedType === "pants") savedPants = selectedImage; // hvis der er valgt bukser, opdateres bukser

  shirt.src = savedShirt || " ";
  pants.src = savedPants || " ";
}

document.addEventListener("DOMContentLoaded", () => { // venter med at gøre noget, indtil alt contentet i DOM'en er loaded
  if (document.getElementById("clothingGrid")) { // hvis elementet med id'et "clothingGrid" kan findes i documentet, så...
    displayClothingOptions(); // ... kører den funktionen "displayClothingOptions", som er forklaret længere oppe.
  }
  if (document.getElementById("shirt")) { // 
    showClothingOnAvatar();
  }
});
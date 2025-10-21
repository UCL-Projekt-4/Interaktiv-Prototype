let clothingItems = [
  { type: "shirt", src: "shirt.png" },
  { type: "shirt", src: "shirt.png" },
  { type: "pants", src: "pants.png" },
  { type: "pants", src: "pants.png" }
];

const defaultOutfit = {
  shirt: "default_shirt.png",
  pants: "default_pants.png"
};

function displayClothingOptions() {
  const grid = document.getElementById("clothingGrid");

  clothingItems.forEach(item => {
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
  localStorage.setItem("selectedType", item.type);
  localStorage.setItem("selectedImage", item.src);
  window.location.href = "avatar.html";
}

function showClothingOnAvatar() {
  const shirt = document.getElementById("shirt");
  const pants = document.getElementById("pants");
  if (shirt == null || pants == null) {
  return; 
}

  let selectedType = localStorage.getItem("selectedType");
  let selectedImage = localStorage.getItem("selectedImage");

  let savedShirt = localStorage.getItem("currentShirt") || defaultOutfit.shirt;
  let savedPants = localStorage.getItem("currentPants") || defaultOutfit.pants;

  if (selectedType === "shirt") savedShirt = selectedImage;
  if (selectedType === "pants") savedPants = selectedImage;

  shirt.src = savedShirt;
  pants.src = savedPants;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("clothingGrid")) {
    displayClothingOptions();
  }
  if (document.getElementById("shirt")) {
    showClothingOnAvatar();
  }
});
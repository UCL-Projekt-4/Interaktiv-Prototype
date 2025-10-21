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
    img.alt = `${item.type}`;
    img.className = "clothing";
    img.addEventListener("click", () => {
      selectClothing(item);
    });

    grid.appendChild(img);
  });
}
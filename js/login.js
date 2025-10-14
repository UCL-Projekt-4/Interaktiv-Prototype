// ------------------------------------------ //
//               SCRIPT TIL LOGIN             //
//                  Josefine                  //
// ------------------------------------------ //

// ------ Henter elementer fra DOM'en ------ //
// Jeg gemmer elementer fra HTML’en i variabler, så jeg nemt kan arbejde med dem i JavaScript.
const loginBtn = document.querySelecto(".header__icon-btn"); // Hent login-knap
const loginModal = document.getElementById("loginModal"); // Hent modal
const closeBtn = document.querySelector(".login-modal__close"); // Hent luk-knap
const loginForm = document.getElementById("loginForm"); // Hent login-formular

// --- Liste over brugere med deres email og password. ---//
// Hvert element i arrayet er et objekt, der samler en email med den tilhørende adgangskode.
// Dette bruges senere til at tjekke login.
const users = [
	{ email: "blåkors@ucl.dk", password: "halløj" },
	{ email: "genbrug@ucl.dk", password: "detteerbareenkode" },
];

// -- Funktioner til at åbne og lukke loginmodal -- //
// Her laver jeg to funktioner: én til at åbne modalen og én til at lukke den.
function openModal() {
	loginModal.classList.add("open"); // Tilføj 'open' klasse for at vise modal
	document.body.style.overflow = "hidden"; // Forhindr baggrund i at scrolle
}

function closeModal() {
	loginModal.classList.remove("open"); // Fjern 'open' klasse for at skjule modal
	document.body.style.overflow = "auto"; // Tillad baggrund at scrolle igen
}

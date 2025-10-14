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
} // Close the login function

function closeModal() {
	loginModal.classList.remove("open"); // Fjern 'open' klasse for at skjule modal
	document.body.style.overflow = "auto"; // Tillad baggrund at scrolle igen
}

// ----------- Funktion til login ----------- //
// Her tjekker jeg, om email og password matcher en bruger i arrayet.

function login(event) {
	event.preventDefault(); // Forhindre formular i genindlæse siden.

	const email = document.getElementById("email").value; // Hent indtastet email.
	const password = document.getElementById("password").value; // Hent indtastet password.

	let isValid = false; // Starter med at antage, at login ikke er korrekt.

	//Loop igennem alle brugere for at tjekke email og password.
	for (let i = 0; i < users.length; i++) {
		if (email === users[i].email && password === users[i].password) {
			isValid = true; // Sæt isValid til true, hvis der er et match.
			break; // Stop loopet, da vi har fundet en match.
		}
	}

	// Hvis login er korrekt, luk modalen og vis en velkomstbesked.
	if (isValid) {
		closeModal(); // Luk modalen.
		alert("Velkommen!"); // Vis velkomstbesked.
		loginForm.reset(); // Nulstil formularen.

		// Hvis login ikke er korrekt, vis en fejlbesked.
	} else {
		alert("Forkert email eller password. Prøv igen."); // Vis fejlbesked.
	}
}

// ------- Event listeners ------- //
// Her tilføjer jeg event listeners til knapperne og formularen.
loginBtn.addEventListener("click", openModal); // Åbn modal ved klik på login-knap
closeBtn.addEventListener("click", closeModal); // Luk modal ved klik på luk-knap
loginForm.addEventListener("submit", login); // Tjek login ved formularindsendelse

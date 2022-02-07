/*function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}*/

/*****
DOM Elements
*****/
const modal = document.querySelector(".bground");
const openModal = document.querySelectorAll(".openModal");
const formData = document.querySelectorAll(".formData");

// On "Je m'inscris" button click, open Modal (function launchModal)
openModal.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modal.style.display = "block";
}

/***************************************************/
const menuResp = document.querySelectorAll(".navResp");

//RESPONSIVE MENU REORGANISATION
menuResp.forEach((el) =>
  el.addEventListener("click", (e) => {
    document.body.classList.toggle("menu__open");
  })
);

/*****
TO DO 1/5 : CLOSE MODAL
*****/
//Je récupère ma classe ".close" qui correspond à l'icon de fermeture
//de la modale.
const closeForm = document.querySelector(".closeForm");
//Gestionnaire d'évènement : Au clic sur l'icon de fermeture
closeForm.addEventListener("click", closeModal);
//Fermer la modale avec l'ajout d'un display "none"
function closeModal() {
  modal.style.display = "none";
}

/*****
TO DO 2/5 & 3/5 : 
IMPLEMENTER LES DONNEES DU FORMULAIRE
MESSAGES ERREUR / VALIDATION
*****/
const lastnameEl = document.querySelector("#lastname");
const firstnameEl = document.querySelector("#firstname");
const emailEl = document.querySelector("#email");
const birthdateEl = document.querySelector("#birthdate");
const gameQuantityEl = document.querySelector("#quantity");
const conditionEl = document.querySelector("#checkbox1");
const form = document.querySelector("#signup");

//Validation du Nom
const checkLastname = () => {
  let valid = false;
  const min = 2;
  const lastnameRegex = /^[a-zA-ZèéêëïôöüñçÈÉÊËÏÔÖÜÑÇ ,.'-]/;
  const lastname = lastnameEl.value.trim();
  if (!isRequired(lastname)) {
    showError(lastnameEl, "Veuillez saisir votre nom");
  } else if (!isMinimum(lastname.length, min)) {
    showError(
      lastnameEl,
      `Votre saisie doit comporter au minimum ${min} caractères.`
    );
  } else if (!lastnameEl.value.trim().match(lastnameRegex)) {
    showError(
      lastnameEl,
      `Votre saisie ne peut contenir de caractères numériques.`
    );
  } else {
    showSuccess(lastnameEl);
    valid = true;
  }
  return valid;
};

//Validation du Prénom
const checkFirstname = () => {
  let valid = false;
  const min = 2;
  const firstnameRegex = /^[a-zA-ZèéêëïôöüñçÈÉÊËÏÔÖÜÑÇ ,.'-]/;
  const firstname = firstnameEl.value.trim();
  if (!isRequired(firstname)) {
    showError(firstnameEl, "Veuillez saisir votre prénom");
  } else if (!isMinimum(firstname.length, min)) {
    showError(
      firstnameEl,
      `Votre saisie doit comporter au minimum ${min} caractères.`
    );
  } else if (!firstnameEl.value.trim().match(firstnameRegex)) {
    showError(
      firstnameEl,
      `Votre saisie ne peut contenir de caractères numériques.`
    );
  } else {
    showSuccess(firstnameEl);
    valid = true;
  }
  return valid;
};

//Validation de l'adresse mail
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Veuillez saisir votre adresse mail");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Votre adresse mail n'est pas valide.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

//Validation de la date de naissance
const checkBirthdate = () => {
  let valid = false;
  const birthdate = birthdateEl.value.trim();
  if (!isRequired(birthdate)) {
    showError(birthdateEl, "Veuillez saisir votre date de naissance");
  } else {
    showSuccess(birthdateEl);
    valid = true;
  }
  return valid;
};

//Validation du nombre de participations
const checkGameQuantity = () => {
  let valid = false;
  const min = 0;
  const max = 100;
  const gameQuantity = gameQuantityEl.value.trim();
  if (!isRequired(gameQuantity)) {
    showError(gameQuantityEl, "Veuillez saisir un nombre");
  } else if (!isBetween(gameQuantity, min, max)) {
    showError(
      gameQuantityEl,
      `Le nombre de participations doit être compris entre ${min} et ${max} tournois GameOn.`
    );
  } else {
    showSuccess(gameQuantityEl);
    valid = true;
  }
  return valid;
};

//Validation de ville selectionnée
const checkLocation = () => {
  let valid = false;
  const errorRadioLocation = document.getElementById("error_radioLocation");
  const radioButtons = document.getElementsByName("location");
  let radioValue;
  radioButtons.forEach((el) => {
    if (el.checked) radioValue = el.value;
  });
  if (!radioValue) {
    errorRadioLocation.innerHTML = "Veuillez selectionner une ville";
    errorRadioLocation.style.display = "block";
  } else {
    valid = true;
  }
  return valid;
};

//Si une ville est selectionnée (au click), j'efface le message d'erreur
const hiddenMsg = document.querySelector("#error_radioLocation");
window.onload = function () {
  let btn = document.getElementsByClassName("radiobtn");
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
      hiddenMsg.style.display = "none";
    });
  }
};

//Bien que la case conditions d'utilisation soit déjà cochée dans le
//HTML avec la mention "checked" dans le input correspondant,
//Je m'assure que si l'utilisateur la décoche, un message d'erreur s'affiche
//Demandant de cocher les conditions afin de permettre la validation
const checkTerms = () => {
  let valid = false;
  const terms = document.getElementById("terms");
  if (!terms.checked) {
    showError(terms, "Veuillez accepter les conditions d'utilisation !");
  } else {
    showSuccess(terms);
    valid = true;
  }
  return valid;
};

//Je vérifie que l'ensemble de mes champs de formulaire est valide :
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isLastnameValid = checkLastname(),
    isFirstnameValid = checkFirstname(),
    isEmailValid = checkEmail(),
    isBirthdateValid = checkBirthdate(),
    isGameQuantityValid = checkGameQuantity(),
    isLocationValid = checkLocation(),
    isTermsValid = checkTerms();

  let isFormValid =
    isLastnameValid &&
    isFirstnameValid &&
    isEmailValid &&
    isBirthdateValid &&
    isGameQuantityValid &&
    isLocationValid &&
    isTermsValid;

  //Si mon formulaire s'avère valide, je le reset et
  //je fais apparaître un message de confirmation
  if (isFormValid) {
    form.reset(); //Reset du formulaire et remise à zéro des entrées
    showConfirmMessage(); //Message de confirmation d'envoi du formulaire
  }
});

/*****
TO DO 4/5 : RESET FORM + CONFIRMATION MESSAGE
*****/

//Lorsque mon formulaire remplit toutes les conditions : form.reset();
// ET j'ajoute un message de confirmation showConfirmMessage();
const modalConfirm = document.getElementById("confirm__message");
function showConfirmMessage() {
  form.style.display = "none";
  modalConfirm.style.display = "block";
}
//Sur mon message de confirmation, je créé un évènement afin de pouvoir fermer la modale au clic et revenir ainsi sur ma page d'accueil
const closeConfirmMessage = document.querySelector(".btn__message");
closeConfirmMessage.addEventListener("click", closeMessage);
function closeMessage() {
  modalConfirm.style.display = "none";
  window.location.reload();
}

/*****
TO DO 5/5 : TESTS MANUELS OK
*****/

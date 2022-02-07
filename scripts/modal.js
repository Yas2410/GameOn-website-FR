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

/******************
//RESPONSIVE MENU REORGANISATION
******************/

//On "click" on the icon with the class(".navResp")
//apply the "toggle()" method in order to hide/show the menu content
const menuResp = document.querySelectorAll(".navResp");
menuResp.forEach((el) =>
  el.addEventListener("click", (e) => {
    document.body.classList.toggle("menu__open");
  })
);

/*****
TO DO 1/5 : CLOSE MODAL
*****/
//On "click" on the icon with the class (".closeForm")
//apply a "display : none" in order to close the inscription form
const closeForm = document.querySelector(".closeForm");
closeForm.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
}

/*****
TO DO 2/5 & 3/5 : 
CREATE ERROR & VALIDATION MESSAGES
*****/
const lastnameEl = document.querySelector("#lastname");
const firstnameEl = document.querySelector("#firstname");
const emailEl = document.querySelector("#email");
const birthdateEl = document.querySelector("#birthdate");
const gameQuantityEl = document.querySelector("#quantity");
const conditionEl = document.querySelector("#checkbox1");
const form = document.querySelector("#signup");

//LastName Validation
const checkLastname = () => {
  let valid = false;
  const min = 2;
  const lastnameRegex = /^[a-zA-ZèéêëïôöüñçÈÉÊËÏÔÖÜÑÇ ,.'-]/;
  const lastname = lastnameEl.value.trim();
  // If input is empty :
  if (!isRequired(lastname)) {
    showError(lastnameEl, "Veuillez saisir votre nom");
    // Or if entry is less than 2 characters :
  } else if (!isMinimum(lastname.length, min)) {
    showError(
      lastnameEl,
      `Votre saisie doit comporter au minimum ${min} caractères.`
    );
    // Or if entry is numbers :
  } else if (!lastnameEl.value.trim().match(lastnameRegex)) {
    // Call the showError function in order to inform user that something went wrong
    showError(
      lastnameEl,
      `Votre saisie ne peut contenir de caractères numériques.`
    );
    // Call the showSuccess function in order to validate the entry
  } else {
    showSuccess(lastnameEl);
    valid = true;
  }
  return valid;
};

//FirstName Validation
//Same method as for the LastName Validation
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

//Email Validation
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  // If input is empty :
  if (!isRequired(email)) {
    showError(emailEl, "Veuillez saisir votre adresse mail");
    // If entry is invalid (// regex in utils.js file) :
  } else if (!isEmailValid(email)) {
    // Call the showError function in order to inform user that something went wrong
    showError(emailEl, "Votre adresse mail n'est pas valide.");
  } else {
    // Call the showSuccess function in order to validate the entry
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

//Birthdate Validation
const checkBirthdate = () => {
  let valid = false;
  const birthdate = birthdateEl.value.trim();
  // If input is empty :
  if (!isRequired(birthdate)) {
    showError(birthdateEl, "Veuillez saisir votre date de naissance");
  } else {
    showSuccess(birthdateEl);
    valid = true;
  }
  return valid;
};

//Participations Validation
const checkGameQuantity = () => {
  let valid = false;
  const min = 0;
  const max = 100;
  const gameQuantity = gameQuantityEl.value.trim();
  // If input is empty :
  if (!isRequired(gameQuantity)) {
    showError(gameQuantityEl, "Veuillez saisir un nombre");
    // Or if entry is not between 0 and 100 :
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

//City Validation
const checkLocation = () => {
  let valid = false;
  const errorRadioLocation = document.getElementById("error_radioLocation");
  const radioButtons = document.getElementsByName("location");
  let radioValue;
  //For each radio button :
  radioButtons.forEach((el) => {
    if (el.checked) radioValue = el.value;
  });
  //If a city (radio button) is not selected
  if (!radioValue) {
    //show an error message to advise the user that he must check a city
    errorRadioLocation.innerHTML = "Veuillez selectionner une ville";
    //"Display block" in order to show the error message
    errorRadioLocation.style.display = "block";
  } else {
    valid = true;
  }
  return valid;
};

//If a city is finally checked, the error message is in "display none" and disappears
const hiddenMsg = document.querySelector("#error_radioLocation");
window.onload = function () {
  let btn = document.getElementsByClassName("radiobtn");
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
      hiddenMsg.style.display = "none";
    });
  }
};

//Even if "terms" are already cheched when opening the form
//(See HTML document, input "checked")
//MORE SECURITY WITH ADDING A CONDITION WHICH SAYS:
//If user "unchecked" terms, show an error message that explains
// terms must be checked in order to validate form
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

//All form inputs are checked
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

  //if form is valid : reset method
  //And show a box with a confirmation message
  if (isFormValid) {
    form.reset(); //form reset
    showConfirmMessage(); //confirmation message
  }
});

/*****
TO DO 4/5 : RESET FORM + CONFIRMATION MESSAGE
*****/

//If form is valid : form.reset();
//+ confirmation message :showConfirmMessage();
const modalConfirm = document.getElementById("confirm__message");
function showConfirmMessage() {
  form.style.display = "none";
  modalConfirm.style.display = "block";
}
//On "click" on my confirmation message box "close" button
//the box disappears ("display none") : return to main page + refresh ("reload" method)
const closeConfirmMessage = document.querySelector(".btn__message");
closeConfirmMessage.addEventListener("click", closeMessage);
function closeMessage() {
  modalConfirm.style.display = "none";
  window.location.reload();
}

/*****
TO DO 5/5 : TESTS OK
*****/

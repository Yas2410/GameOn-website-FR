//Je créé les variables qui vont permettre de mettre en place des
//obligations quant aux entrées dans le formulaire
const isRequired = (value) => (value === "" ? false : true);
const isMinimum = (length, min) => (length < min ? false : true);
const isBetween = (num, min, max) => (num < min || num > max ? false : true);
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//En cas d'erreur sur mon champ de formulaire :
// Je fais apparaître ma classe "error" qui va encadrer l'input en rouge
// Et informer l'utilisateur avec un message indiquant l'erreur
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

//Si tout est OK sur mon champ de formulaire :
// Je fais apparaître ma classe "success" qui va encadrer l'input en vert
// Et informer l'utilisateur que l'entrée est valide
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

/*****
BONUS
 *****/
//Faire apparaitre "en direct" si un input est valide ou non
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "lastname":
        checkLastname();
        break;
      case "firstname":
        checkFirstname();
        break;
      case "email":
        checkEmail();
        break;
      case "birthdate":
        checkBirthdate();
        break;
      case "quantity":
        checkGameQuantity();
        break;
      case "terms":
        checkTerms();
        break;
    }
  })
);

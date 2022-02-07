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

// If the input is incorrect (regarding the required methods):
// An error message will appear to inform the user (red color with red borders on the inputs)
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

//If everything is OK :
// If the input is incorrect (regarding the required methods):
// success message will appear (greenborders on the inputs + error messages display none)
// To inform the user that the entry is valid
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
//Let appear if the entry is valid or not
//while completing the form
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    //setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

//Each input is checked and regarding the entry :
//error with red legend
//success with green legend
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

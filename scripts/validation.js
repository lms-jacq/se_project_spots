const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
};

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMsg;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputElement) {
  return inputElement.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
  }
}

function disabledButton(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
    return;
  }
}

function enableButton(inputList, buttonElement, { inactiveButtonClass }) {
  if (!hasInvalidInput(inputList)) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      checkInputValidity(formElement, inputElement, errorMessage, options);
      toggleButtonState(inputList, submitButton, options);
    });
  });
}

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach;
  (formElement) => {
    setEventListeners(formElement, config);
  };
}

enableValidation(settings);

/*
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMsg;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
};

// use the settings object in all functions instead of hard-coded strings

const setEventListeners = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach;
  (formElement) => {
    setEventListeners(formElement, config);
  };
};

enableValidation(settings);
*/

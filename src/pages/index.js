import { enableValidation, settings } from "../scripts/validation.js";

import "./index.css";

// import avatarSrc from "./images/avatar.jpg";

// const avatarImage = document.getElementById("avatar");
// avatarImage.src = avatarSrc;

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

// profile elements

const profileEditButton = document.querySelector(".profile__edit-button");
const cardModalButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// edit profile elements

const modals = document.querySelectorAll(".modal");
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector("#edit-profile");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

// add cards elements

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector("#add-card-form");
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardNameInput = cardModal.querySelector("#add-card-name-input");

// preview modal elements

const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = previewModal.querySelector(".modal__image");
const previewModalCaptionElement =
  previewModal.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);
const previewModalErrorMsg = previewModal.querySelector(".modal__error");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameElement.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openModal(previewModal);

    previewModalCaptionElement.textContent = data.name;
    previewModalImageElement.src = data.link;
    previewModalImageElement.alt = data.name;
  });
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
}

function closeModalEsc(event) {
  if (event.key === "Escape") {
    const modalOpen = document.querySelector(".modal_opened");
    closeModal(modalOpen);
  }
}

function closeOverlay(event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", closeOverlay);
});

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;

  closeModal(editModal);
}

function handleAddCardSubmit(event) {
  event.preventDefault();

  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);

  cardsList.prepend(cardElement);
  event.target.reset();

  disabledButton(cardSubmitButton, settings);

  closeModal(cardModal);
}

// function checkFormValidity() {
//   if (modalForm.checkValidity()) {
//     cardSubmitButton.classList.remove("modal__submit-button_disabled");
//     cardSubmitButton.disabled = false;
//   } else {
//     cardSubmitButton.classList.add("modal__submit-button_disabled");
//     cardSubmitButton.disabled = true;
//   }
// }

// modalForm.querySelectorAll("input").forEach((input) => {
//   input.addEventListener("input", checkFormValidity);
// });

// checkFormValidity();

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editModal);
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

enableValidation(settings);

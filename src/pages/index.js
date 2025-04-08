import { enableValidation, settings } from "../scripts/validation.js";

import "./index.css";
import { setButtonText, setDeleteButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

// import avatarSrc from "./images/avatar.jpg";

// const avatarImage = document.getElementById("avatar");
// avatarImage.src = avatarSrc;

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Golden Gate bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9dc8a432-5aa9-497e-9664-0823aa53c25f",
    "Content-Type": "application/json",
  },
});

// api
//   .getInitialCards()
//   .then((cards) => {})
//   .catch(console.error);

// destructure the second item in the callback of the .then()
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileAvatar.src = userInfo.avatar;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    // handle the user's information
    // set src of the avatar image
    // set the textContent of both the text elements
  })
  .catch(console.error);

// profile elements

const profileEditButton = document.querySelector(".profile__edit-button");
const cardModalButton = document.querySelector(".profile__add-button");
const avatarModalButton = document.querySelector(".profile__avatar-button");
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

// avatar form elements

const profileAvatar = document.querySelector(".profile__avatar");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector("#edit-avatar");
const avatarModalSubmitButton = avatarModal.querySelector(
  ".modal__submit-button"
);
const avatarModalCloseButton = avatarModal.querySelector(
  ".modal__close-button"
);
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");

// delete form elements

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modan__form");

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

let selectedCard;
let selectedCardId;

function handleLike(event, id) {
  // remove - event.target.classList.toggle("card__like-button_liked");
  // 1. check whether card is currently liked or not
  // 2. call the changeLikeStatus method, passing it the approrpaite arguments
  // 3. handle the respnse (.then and .catch)
  // 4. in the .then, toggle active class

  const isLiked = event.target.classList.contains("card__like-button_liked");

  api
    .changeLikeStatus(id, !isLiked)
    .then((data) => {
      event.target.classList.toggle("card__like-button_liked", data.isLiked);
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // if the card is liked, set the active class on the card
  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }

  cardNameElement.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardLikeButton.addEventListener("click", (event) =>
    handleLike(event, data._id)
  );

  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

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

  //change text content to "Saving..."
  const submitButton = event.submitter;
  // submitButton.textContent = "Saving...";
  setButtonText(cardSubmitButton, true, "Save", "Saving...");

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      // use data argument instead of the input values
      profileName.textContent = editModalNameInput.value;
      profileDescription.textContent = editModalDescriptionInput.value;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      // call setButtonText instead
      setButtonText(cardSubmitButton, true, "Save", "Saving...");
    });
}

// implement loading text for all other form submissions

function handleAddCardSubmit(event) {
  event.preventDefault();

  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardModalSubmitButton = event.submitter;
  setButtonText(cardModalSubmitButton, true, "Save", "Saving...");

  // cardsList.prepend(cardElement);
  // event.target.reset();

  api
    .postCard(inputValues)
    .then((card) => {
      const cardElement = getCardElement(inputValues);
      cardsList.prepend(cardElement);
      disabledButton(cardModalSubmitButton, settings);
      closeModal(cardModal);
      cardForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardModalSubmitButton, false, "Save", "Saving...");
    });
}

// finish avatar submission handler
function handleAvatarSubmit(event) {
  event.preventDefault();
  const avatarSubmitButton = event.submitter;
  setButtonText(avatarModalSubmitButton, true, "Save", "Saving...");

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      // make this work
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
      disabledButton(avatarModalSubmitButton, settings);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(avatarModalSubmitButton, false, "Save", "Saving...");
    });
}

function handleDeleteSubmit(event) {
  event.preventDefault();
  const deleteButton = event.submitter;
  setDeleteButtonText(deleteButton, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId) // pass the ID the the api function
    .then(() => {
      selectedCard.remove(); // remove the card from the DOM
      closeModal(deleteModal); // close the modal
    })
    .catch(console.error)
    .finally(() => {
      setDeleteButtonText(deleteButton, false, "Delete", "Deleting...");
    });
}

function handleDeleteCard(cardElement, cardId) {
  // evt.target.closest(".card").remove();
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
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

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);

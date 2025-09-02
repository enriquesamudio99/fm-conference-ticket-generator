// Globals State
let state = {
  fullName: "",
  email: "",
  username: "",
  avatar: "",
}

// DOM Selectors
const heroTitle = document.querySelector("#hero-title");
const heroSubtitle = document.querySelector("#hero-subtitle");
const formSection = document.querySelector("#form-section");
const ticketSection = document.querySelector("#section-ticket");
const form = document.querySelector(".form");
const formButton = document.querySelector(".form__button");
const fullNameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const usernameInput = document.querySelector("#username");
const avatarInput = document.querySelector("#avatar");
const ticketName = document.querySelector("#ticket-name");
const ticketUsername = document.querySelector("#ticket-username");
const ticketNumber = document.querySelector("#ticket-number");
const ticketAvatar = document.querySelector("#ticket-avatar");
const uploadDropzone = document.querySelector("#upload-dropzone");
const uploadInfo = document.querySelector(".upload__info");
const uploadPreview = document.querySelector("#upload-preview");
const previewImg = document.querySelector("#preview-img");
const removeBtn = document.querySelector("#remove-btn");
const changeBtn = document.querySelector("#change-btn");

document.addEventListener("DOMContentLoaded", () => {
  initApp();
})

const initApp = () => {
  form.addEventListener("submit", handleSubmit);
  avatarInput.addEventListener("change", generateAvatar);
  removeBtn.addEventListener("click", removeAvatar);
  changeBtn.addEventListener("click", changeAvatar);

  // Drag and Drop
  uploadDropzone.addEventListener("dragover", handleDragOver);
  uploadDropzone.addEventListener("dragleave", handleDragLeave);
  uploadDropzone.addEventListener("drop", handleDrop);
}

const handleSubmit = (e) => {
  e.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  };

  state.fullName = fullNameInput.value;
  state.email = emailInput.value;
  state.username = usernameInput.value.includes("@") ? usernameInput.value : `@${usernameInput.value}`;

  renderTicket(state.fullName, state.email, state.username, state.avatar);
}

const validateForm = () => {
  const isFullNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isUsernameValid = validateUsername();
  const isAvatarValid = validateAvatar();

  const isFormValid = isFullNameValid && isEmailValid && isUsernameValid && isAvatarValid;

  return isFormValid;
}

const validateFullName = () => {
  const fullNameValue = fullNameInput.value;
  const error = fullNameInput.nextElementSibling;

  if (fullNameValue === "") {
    error.querySelector(".form__error-text").textContent = "Full Name is required";
    error.style.display = "flex";
    fullNameInput.classList.add("form__input--error");
    return false;
  }

  error.querySelector(".form__error-text").textContent = "";
  error.style.display = "none";
  fullNameInput.classList.remove("form__input--error");
  return true;
}

const validateEmail = () => {
  const emailValue = emailInput.value;
  const error = emailInput.nextElementSibling;

  if (emailValue === "") {
    error.querySelector(".form__error-text").textContent = "Email is required";
    error.style.display = "flex";
    emailInput.classList.add("form__input--error");
    return false;
  }

  if (!validEmail(emailValue)) {
    error.querySelector(".form__error-text").textContent = "Please enter a valid email address.";
    error.style.display = "flex";
    emailInput.classList.add("form__input--error");
    return false;
  }

  error.querySelector(".form__error-text").textContent = "";
  error.style.display = "none";
  emailInput.classList.remove("form__input--error");
  return true;
}

const validEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const validateUsername = () => {
  const usernameValue = usernameInput.value;
  const error = usernameInput.nextElementSibling;

  if (usernameValue === "") {
    error.querySelector(".form__error-text").textContent = "Username is required";
    error.style.display = "flex";
    usernameInput.classList.add("form__input--error");
    return false;
  }

  error.querySelector(".form__error-text").textContent = "";
  error.style.display = "none";
  usernameInput.classList.remove("form__input--error");
  return true;
}

const validateAvatar = () => {
  const avatar = avatarInput.files[0];
  const maxSize = 500 * 1024;
  const uploadInfoIcon = uploadInfo.querySelector(".upload__info-icon");
  const uploadInfoText = uploadInfo.querySelector(".upload__info-text");

  if (!avatar) {
    uploadInfoIcon.src = "./assets/images/icon-warning.svg";
    uploadInfoText.style.color = "var(--clr-orange-500)";
    uploadInfoText.textContent = "Avatar is required";
    return false;
  }

  if (avatar.size > maxSize) {
    uploadInfoIcon.src = "./assets/images/icon-warning.svg";
    uploadInfoText.style.color = "var(--clr-orange-500)";
    uploadInfoText.textContent = "File too large. Please upload a photo under 500KB.";
    return false;
  }

  uploadInfoIcon.src = "./assets/images/icon-info.svg";
  uploadInfoText.style.color = "var(--clr-neutral-300)";
  uploadInfoText.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
  return true;
}

const renderTicket = (fullName, email, username, avatar) => {
  formSection.style.display = "none";

  heroTitle.innerHTML = `Congrats, <span class="hero__title-span">${fullName}!</span> Your ticket is ready.`;
  heroSubtitle.innerHTML = `We've emailed your ticket to <span class="hero__subtitle-span">${email}</span> and will send updates in the run up to the event.`;

  ticketName.textContent = fullName;
  ticketUsername.textContent = username;
  ticketNumber.textContent = `#${generateTicketNumber()}`;
  ticketAvatar.src = avatar;

  ticketSection.style.display = "block";
}

const generateTicketNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

const generateAvatar = () => {

  if (!validateAvatar()) {
    return;
  }

  const avatarFile = avatarInput.files[0];

  const imageURL = URL.createObjectURL(avatarFile);

  state.avatar = imageURL;

  uploadDropzone.style.display = "none";
  uploadPreview.style.display = "flex";
  previewImg.src = imageURL;
}

const removeAvatar = () => {
  uploadDropzone.style.display = "flex";
  uploadPreview.style.display = "none";
  avatarInput.value = "";
  previewImg.src = "";
  state.avatar = "";
}

const changeAvatar = () => {
  avatarInput.click();
}

const handleDragOver = (e) => {
  e.preventDefault();
  uploadDropzone.classList.add("upload__dropzone--dragover");
}

const handleDragLeave = (e) => {
  e.preventDefault();
  uploadDropzone.classList.remove("upload__dropzone--dragover");
}

const handleDrop = (e) => {
  e.preventDefault();
  uploadDropzone.classList.remove("upload__dropzone--dragover");
  const avatarFile = e.dataTransfer.files[0];

  if (!avatarFile) {
    return;
  }

  const imageURL = URL.createObjectURL(avatarFile);
  previewImg.src = imageURL;
  uploadDropzone.style.display = "none";
  uploadPreview.style.display = "flex";

  state.avatar = imageURL;

  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(avatarFile);
  avatarInput.files = dataTransfer.files;
}
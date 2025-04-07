export function setButtonText(
  button,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    // set the loading text
    button.textContent = loadingText;
  } else {
    // set the default text
    button.textContent = defaultText;
  }
}

export function setDeleteButtonText(
  button,
  isDeleting,
  defaultText = "Delete",
  deletingText = "Deleting..."
) {
  if (isDeleting) {
    button.textContent = deletingText;
  } else {
    button.textContent = defaultText;
  }
}

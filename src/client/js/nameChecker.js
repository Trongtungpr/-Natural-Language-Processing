function checkEmptyTxt(inputText) {
  if (inputText.trim().length === 0) {
    return true;
  } else {
    return false;
  }
}

export { checkEmptyTxt };

function AppException(text, innerError) {
  this.innerError = innerError;
  this.text = text;
}

export default AppException;

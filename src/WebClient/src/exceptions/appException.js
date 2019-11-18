function appException(text, innerError) {
  this.innerError = innerError;
  this.text = text;
}

export default appException;

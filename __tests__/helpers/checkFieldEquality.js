module.exports = (firstField, secondField) => {
  if (!firstField || !secondField) {
    return false;
  }

  const isSameType = typeof firstField === typeof secondField;
  const isSameValue = firstField === secondField;

  return isSameType && isSameValue;
};

function generateID(length = 4) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

export default generateID;

const getNumber = (curGuess) => {
  const i = curGuess + 1;
  var phrase = i.toString();
  switch (phrase) {
    case "1":
      phrase += "st";
      break;
    case "2":
      phrase += "nd";
      break;
    case "3":
      phrase += "rd";
      break;
    default:
      phrase += "th";
      break;
  }
  return phrase;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export { getNumber, getRandomInt };

const NORRIS_IMAGES = [
  "https://imgur.com/P3dBnWi.jpeg",
  "https://imgur.com/7rGJS0S.jpeg",
  "https://imgur.com/qPcIHOz.jpeg",
  "https://imgur.com/cAD1cYB.jpeg",
  "https://imgur.com/EoAzBU1.jpeg",
  "https://imgur.com/1Z58peT.jpeg",
  "https://imgur.com/hYUhDvI.jpeg",
  "https://imgur.com/Ygz1SBs.jpeg",
  "https://imgur.com/2JhPGOw.jpeg",
  "https://imgur.com/mXScSN6.jpeg",
];

export const shuffledNorrisImageIndexes = (numIndexesNeeded) => {
  //shuffles an array of numbers.
  function shuffle(array) {
    var i = array.length,
      j = 0,
      temp;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));

      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  function createBaseIndexArr() {
    let indexArr = [];

    //create an array of numbers that is equal to the number of indexes in IMG_ARR.
    for (let i = 0; i < NORRIS_IMAGES.length; i++) {
      indexArr.push(i);
    }

    return indexArr;
  }

  let shuffledIndexes = shuffle(createBaseIndexArr());

  while (shuffledIndexes.length < numIndexesNeeded) {
    shuffledIndexes = [...shuffledIndexes, ...shuffle(createBaseIndexArr())];
  }
  return shuffledIndexes;
};

const NorrisThumb = ({ chosenIndex }) => {
  return (
    <img
      style={{ objectFit: "cover", borderRadius: 4 + "px" }}
      src={NORRIS_IMAGES[chosenIndex]}
      alt="Chuck Norris"
      width="100"
      height="100"
    />
  );
};

export default NorrisThumb;

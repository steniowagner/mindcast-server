const shuffleArray = require('../../../src/utils/shuffleArray');

describe('Testign shuffleArray', () => {
  const arr = Array(10)
    .fill(0)
    .map((item, index) => item + index);

  it('should shuffle an array', () => {
    const arrCopy = JSON.parse(JSON.stringify(arr));

    shuffleArray(arr);

    let atLeastOneChanged = false;

    for (let i = 0; i < arrCopy.length; i++) {
      atLeastOneChanged = arr[i] !== arrCopy[i];
      if (atLeastOneChanged) {
        break;
      }
    }

    expect(atLeastOneChanged).toBe(true);
  });
});

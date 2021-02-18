export function randomInt(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export function shuffleArray<T>(array: Array<T>): Array<T> {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function shiftArray(array, n){
  let l = array.length
  n = ((n%l)+l)%l;
  return array.slice(l-n).concat(array.slice(0, l-n))
}

export function pickRandom<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

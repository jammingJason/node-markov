/** Textual markov chain generator */
export { MarkovMachine };
class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== '');
    this.newDict = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let words = this.words;
    let strWords = [];
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (this.checkForKey(word)) {
        this.newDict[words[i]] = this.getListOfWords(word);
      } else {
        this.newDict[words[i]] = [words[i + 1]];
      }
    }
    // console.log(this.newDict);
    this.makeText();
    // TODO
  }

  getListOfWords(word) {
    const listOfWords = this.words;
    let newArray = [];
    for (let i = 0; i < listOfWords.length; i++) {
      if (word === listOfWords[i]) {
        if (listOfWords[i + 1]) {
          newArray.push(listOfWords[i + 1]);
        } else {
          newArray.push(null);
        }
      }
    }
    return newArray;
  }

  checkForKey(keyword) {
    let count = 0;
    for (let i = 0; i < this.words.length; i++) {
      if (keyword === this.words[i]) {
        count++;
      }
    }
    if (count > 1) {
      return true;
    } else {
      return false;
    }
    console.log(keyword + ' - ' + count);
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let newArray = [];
    for (const key in this.newDict) {
      if (Object.hasOwnProperty.call(this.newDict, key)) {
        const element = this.newDict[key];
        newArray.push(key);
      }
    }
    let nextWord = '';
    let strSentence = '';
    let count = 0;
    while (nextWord != null && count <= numWords) {
      // console.log(count);
      count = count + 2;
      const rndNumber = Math.round(Math.random() * (newArray.length - 1));
      const mainWord = newArray[rndNumber];
      const nextWordArray = this.newDict[mainWord];
      const anotherRndNum = Math.round(
        Math.random() * (nextWordArray.length - 1)
      );
      nextWord = nextWordArray[anotherRndNum];
      strSentence = strSentence + mainWord + ' ' + nextWord + ' ';
    }
    strSentence = strSentence.replace(' null', '');
    return strSentence;
  }
}

// let mm = new MarkovMachine('the cat in the hat is in the hat');

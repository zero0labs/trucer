
# Zero Forgery Common
### Lightweight string format library for every use case.
### What is ZeroForgery - ZeroForgeryCommon?
ZeroForgery is a blockchain project that.. (will be added)



# Getting Started
### Installation

```
npm install @zero-forgery/common
```

# Usage
### Sample Tests
### ES6
```javascript
import { format } from "@zero-forgery/common";
import { getHash } from "@zero-forgery/common";


const hashTest = (toHash: string) => {
  const hash = getHash(toHash);
  return typeof hash === "string" && hash.length === 32;
};

const formatTest = (char: string) => {
  if (char.length !== 1) {
    console.log("ERROR:", char);
    return false;
  }

  const formatted = format(char);
  return formatted === char.toLowerCase();
};

const singularHashTest = (str: string) => {
  const hash = getHash(str);
  return typeof hash === "string" && hash.length === 32;
};


// what happened if we give emoji as an input?
const buggyString = "👨‍👩‍👧‍👦";
const buggyStringHash = getHash(buggyString);
console.log("buggyStringHash", buggyStringHash);
const fmt = format(buggyString);
console.log("fmt", fmt);

// string with spaces and *!- kind of special characters
const stringWithSpaces = "a CdğD* efğEFie üf,i.";
const fmt_two = format(stringWithSpaces);
console.log("fmt_two", fmt_two);

const elonmuskchild = "X Æ A-Xii ";
const fmt_three = format(elonmuskchild);
console.log("fmt_three", fmt_three);


// with half arabic half japanese half swedish half english letters
const halfArabicHalfJapaneseHalfSwedishHalfEnglishLetters =
  "مرحبا بالعالم こんにちは世界 你好，世界 สวัสดีชาวโลก abcdef";

// get format of str
const fmt_four = format(halfArabicHalfJapaneseHalfSwedishHalfEnglishLetters);
console.log("fmt_four", fmt_four);

// get hash of formatted str
const hash_four = getHash(fmt_four);
console.log("hash_four", hash_four);

```

### Non-ES6
```javascript
const { format } = require("@zero-forgery/common");

const formatSTR = format("Hello *23i 3ş223di23 .");

console.log(formatSTR);

```


  
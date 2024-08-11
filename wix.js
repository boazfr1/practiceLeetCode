console.log('hello boaz');

const howMuchTimesWordInMatrix = () => {
    let matrix = [
        ["a", "b", "c", "d", "a", "a", "c", "d", "g"],
        ["a", "a", "c", "d", "g", "a", "a", "c", "d", "g"],
        ["a", "b", "c", "d", "a", "a", "c", "d", "g"],
        ["a", "a", "c", "d", "g", "a", "a", "c", "d", "g"],
        ["a", "a", "c", "d", "g", "a", "a", "c", "d", "g"],
        ["a", "b", "c", "d", "a", "a", "c", "d", "g"],
        ["a", "a", "c", "d", "g", "a", "a", "c", "d", "g"],
        ["a", "b", "c", "d", "a", "a", "c", "d", "g"],
        ["a", "a", "c", "d", "g", "a", "a", "c", "d", "g"],
        ["a", "a", "c", "d", "g", "a", "a", "c", "d", "g"]
    ];

    const word = "ab"


    const checkSlant = () => {
        let slantsRight = [];
        let sum = 0;

        let numRows = matrix.length
        let numCols = matrix[0].length

        const collectDiagonal = (row, col) => {
            let diagonal = [];
            while (row < numRows && col < numCols) {
                diagonal.push(matrix[row][col])
                row++;
                col++;
            }
            sum += checkHowMuchWordExist(diagonal);
        }

        for (let col = 0; col < numCols; col++) {
            collectDiagonal(0, col);
        }

        for (let row = 1; row < numRows; row++) {
            collectDiagonal(row, 0);
        }


        return sum;
    }

    const checkVerticalArr = () => {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
            let verticals = [];
            for (let j = 0; j < matrix.length; j++) {
                verticals.push(matrix[j][i])
            }
            sum += checkHowMuchWordExist(verticals);
        }
        return sum;
    }

    const checkHorizontalArr = () => {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
            sum += checkHowMuchWordExist(matrix[i]);
        }
        return sum;
    }

    const checkHowMuchWordExist = (arr) => {
        let counter = 0;
        if (arr.length >= word.length) {
            for (let i = 0; i < arr.length; i++) {
                if (arr.slice(i, i + word.length).join("") === word) {
                    counter++;
                }
                if (arr.slice(i - word.length, i).reverse().join("") === word) {
                    counter++;
                }
            }
        }
        return counter;
    }

    const howMuchWordExistInMatrix = () => {
        return checkHorizontalArr() + checkVerticalArr() + checkSlant();
    }

    console.log(howMuchWordExistInMatrix());

}

const getIndexOfLetter = (matrix, letter) => {
    let value = 0;
    for (let i = 0; i < matrix.length; i++) {
        value = matrix[i].indexOf(letter);
        if (value != -1) {
            break;
        }
    }
    return value + 1;
}

const howMuchTimeWordAppear = (str, targetChar) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === targetChar) {
            count++;
        }
    }
    return count;
}

const sortWordManyFirst = (word) => {
    const arr = [];
    let maxTime = 0;
    let value = 0;
    for (let i = 0; i < word.length; i++) {
        value = howMuchTimeWordAppear(word, word[i]);
        if (value >= maxTime) {
            arr.unshift(word[i]);
            maxTime = value;
        } else {
            arr.push(word[i])
        }
    }
    let arrToStr = arr.join("");
    return arrToStr;
}

const minimumPushes = (word) => {

    let numOfButtons = 8;
    const sortedWord = sortWordManyFirst(word)

    const myLetters = new Set;
    for (let i = 0; i < sortedWord.length; i++) {
        myLetters.add(sortedWord[i]);
    }

    const letters = Array.from(myLetters)

    if (letters.length <= numOfButtons) {
        return word.length;
    }

    let phonButtons = [];
    for (let i = 0; i < numOfButtons; i++) {
        phonButtons.push([])
    }

    let counter = 0
    for (let i = 0; i < letters.length; i++) {
        phonButtons[counter].push(letters[i])
        if (counter === numOfButtons - 1) {
            counter = 0;
        }
        counter++;
    }

    let sum = 0;
    for (let i = 0; i < sortedWord.length; i++) {
        sum += getIndexOfLetter(phonButtons, sortedWord[i]);
    }

    return sum;
};


const flatArr = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            for (let j = 0; j < arr[i].length; j++) {
                newArr.push(arr[i][j]);
            }
        } else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}


const flat = (arr, n) => {
    let newArr = arr;
    for (let i = 0; i < n; i++) {
        newArr = flatArr(newArr);
    }
    return newArr;
};

const myClosure = (one) => {
    return (two) => {
        return (three) => {
            console.log("one = ", one);
            console.log("two = ", two);
            console.log("three = ", three);
        }
    }
}



const myCounter = () => {
    let counter = 0;
    return () => {
        counter++;
        console.log("counter = ", counter);
    }
}



var debounce = function (fn, t) {
    let id;
    return function (...args) {
        clearTimeout(id)
        id = setTimeout(() => { fn(...args) }, t);
    }
};



Array.prototype.groupBy = function (fn) {
    let res = {}

    for (const obj of this) {
        const key = fn(obj)
        if (!res.hasOwnProperty(key)) {
            res[key] = [];
        }
        res[key].push(obj);
    }
    return res;
};

var timeLimit = function (fn, t) {

    return async function (...args) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("Time Limit Exceeded")
            }, t);
            fn(...args)
                .then((res) => resolve(res))
                .catch((e) => reject(e))
        })
    }
};


var inorderTraversal = function* (arr) {
    for (const i of arr) {
        console.log("i = ", i);
        if (Array.isArray(i)) {
            yield* inorderTraversal(i);
        } else {
            yield i;
        }
    }
};




var compactObject = function (obj) {
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            let temp = [];
            for (const i of obj) {
                if (i) {
                    temp.push(compactObject(i))
                }
            }
            return temp
        } else {
            let temp = {}
            for (const i in obj) {
                console.log("obj[i] = ", obj[i]);
                console.log("i = ", i);
                if (obj[i]) {
                    temp[i] = compactObject(obj[i])
                }
            }
            return temp;
        }
    }
    return obj
};

var promiseAll = async function (functions) {
    return new Promise((resole, reject) => {
        let counter = 0;
        let ans = new Array(functions.length)
        for (let i = 0; i < functions.length; i++) {
            functions[i]()
                .then((value) => {
                    ans[i] = value
                    counter++;
                    if (counter === functions.length) {
                        resole(ans)
                    }
                })
                .catch((a) => {
                    reject(a);
                })
        }

    })
};

arr1 = [
    { "id": 3, "x": 1 },
    { "id": 2, "x": 9 },
    { "id": 1, "x": 9 }
],
    arr2 = [
        { "id": 3, "x": 5 }
    ]

// var join = function(arr1, arr2) {
//     const map = new Map
// };

function memoize(fn) {

    let cache = {}

    return function (...args) {
        const strArgs = JSON.stringify(args)
        if (fn.name in cache && cache[fn.name] === strArgs) {
            return cache[fn.name](JSON.parse(strArgs))
        }
        cache[fn.name] = strArgs
        return fn(JSON.parse(strArgs));

    }
}


let callCount = 0;
const memoizedFn = memoize(function (a, b) {
    callCount += 1;
    return a + b;
})


const curry = (fn) => {

    let nums = [];

    return curried = (...args) => {
        nums = [...nums, ...args];
        if (fn.length === nums.length) {
            const res = fn(...nums)
            nums = []
            curry(...args);
        } else {
            return curried;
        }

    }
}

const curry2 = (fn) => {
    return curried = (...args) => {
        if (fn.length === args.length) {
            fn(...args)
        } else {
            return (...nawArgs) => {
                curried(...args, ...nawArgs)
            }
        }
    }
}

Array.prototype.last = function () {
    if (this.length === 0) {
        return -1
    }
    return this.reverse()[0];
};

const createCounter = function (n) {
    let counter = n
    return function () {
        counter++;
        return counter - 1;
    };
};

const grid = [
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
]

const minDays = function (grid) {
    let counter = 0;
    let num = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                num++
            }
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    if ((grid[i][j] === 1) && ((grid[i][j - 1] === 1) || (grid[i][j + 1] === 1))) {
                        counter++;
                    }
                }
            } else {
                if (j % 2 !== 0) {
                    if ((grid[i][j] === 1) && ((grid[i][j - 1] === 1) || (grid[i][j + 1] === 1))) {
                        counter++;
                    }
                }
            }
            
        }        
    }
    if (num === 2) {
        return num
    }
    return counter;
};

console.log(minDays(grid));

const minDays1 = function (grid) {
    if (minDays > 2) {
        return 2
    }
}



const theLongestPalindrome = (str) => {
    let palindrome = "";
    for (let i = 0; i < str.length; i++) {
        let counter = 0;
        while ((str.slice(i, i + counter)) === (str.slice(i, i - counter))) {
            counter++;
        }
        if ((str.slice(i, i + counter)) + (str.slice(i, i - counter)).length > palindrome.length) {
            palindrome = (str.slice(i, i + counter)) + (str.slice(i, i - counter))
        }
    }
    return palindrome;
}

const jsonStringify = (obj) => {
    let newObj = "";

    
}

console.log(JSON.stringify({"y": 1, "x": 2}));



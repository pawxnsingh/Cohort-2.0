// Array handbook

// Array:   push(), pop(), shift(), unshift(), splice(), slice(),
// concat(), forEach(), map(), filter(), reduce(), find(), sort()

// Run each function to see the output, play and learn by doing.

// push()
function pushExample(arr, element) {
    console.log("Original Array:", arr);

    arr.push(element);
    console.log("After push:", arr);
}
pushExample([1, 2, 3], 4);

// pop()
function popExample(arr) {
    console.log("Original Array:", arr);

    arr.pop();
    console.log("After pop:", arr);
}
popExample([1, 2, 3]);

// shift() - it is used to remove the first element in the array
function shiftExample(arr) {
    console.log("Original Array:", arr);

    arr.shift();
    console.log("After shift:", arr);
}
shiftExample([1, 2, 3]);

// unshift() - it is used to add to the first element in the string
function unshiftExample(arr, element) {
    console.log("Original Array:", arr);

    arr.unshift(element);
    console.log("After unshift:", arr);
}
unshiftExample([1, 2, 3], 0);

// concat() - it is used to merge to array and make a new array
function concatExample(arr1, arr2) {
    console.log("Original Arrays:", arr1, arr2);

    let arr3 = arr1.concat(arr2);
    console.log("After concat:", arr3);
}
concatExample([1, 2, 3], [4, 5, 6]);

// forEach() - forEach() is the higher ordered function and that it taking the callback function as an argument
function forEachExample(arr) {
    console.log("Original Array:", arr);

    arr.forEach(function (item, index) {
        console.log(item, index);
    });
}
forEachExample([1, 2, 3]);

// map() - map function will transform the array
function mapExample(arr) {
    console.log("Original Array:", arr);

    let newArr = arr.map(function (item) {
        return item * 2;
    });
    console.log("After map:", newArr);
}
mapExample([1, 2, 3]);

// filter() - use to filter the array as per the condition
function filterExample(arr) {
    console.log("Original Array:", arr);

    let newArr = arr.filter(function (item) {
        return item > 3;
    });
    console.log("After filter:", newArr);
}
filterExample([1, 2, 3, 4, 5]);

// find() - it is used to find the first element of when conditon satisfy
function findExample(arr) {
    console.log("Original Array:", arr);

    let found = arr.find(function (item) {
        return item > 3;
    });
    console.log("After find:", found);
}
findExample([1, 2, 3, 4, 5]);

// sort() - simply sort the array
function sortExample(arr) {
    console.log("Original Array:", arr);

    arr.sort(function (a, b) {
        return a - b;
    });
    console.log("After sort:", arr);
}
sortExample([5, 2, 3, 4, 1]);

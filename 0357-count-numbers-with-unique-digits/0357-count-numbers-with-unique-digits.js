/**
 * @param {number} n
 * @return {number}
 */
// var countNumbersWithUniqueDigits = function(n) {
//     // backtracking uses the depth-first search method
//     let result = ['0', '1', '2', '3','4','5','6','7','8','9'];
    
//     doMagic(result);
//     // run a loop to generate the first digit

    
//     return result.length;
// };

// var doMagic = function(array) {
//     for (let i = 0; i < array.length; i++){
//         for (let j = 0; j < 10; j++){
//             let newNum = array[i] + j.toString()
//             array.push(newNum);
//         }
//     }
//     console.log(array);
//     // depth-first search
//         // insert an item
//         // run a for loop
//         // recursively call the function
//     // add the second digit to the number
//     // if the numbers does not have unique digits, count++
//     // else do nothing
// }

var countNumbersWithUniqueDigits = function(n) {
    let ans = 1;
    for (let i = 1; i <=n; i+=1) {
        ans += backtracking(i, 0, 0);
    }
    return ans;
}

// count the number of n digits numbers with unique digits
// where we are building the i-th digits
var backtracking = function(n, i, map) {
    if (i == n) {
        return 1;
    }
    
    let ans = 0;
    // Pick a first digit
    for (let k = (i === 0 ? 1 : 0); k <= 9; k++) {
        if ((map & (1 << k)) === 0)
            ans += backtracking(n, i+1, map | 1 << k);
    }

    return ans;
}
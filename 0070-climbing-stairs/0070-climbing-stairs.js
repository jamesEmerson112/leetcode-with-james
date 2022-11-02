/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let left = 1;
    let right = 1;
    
    for (let i = n-1; i != 0; i-=1) {
        let temp = left;
        left = left + right;
        right = temp;
    }
    
    return left
};
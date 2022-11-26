/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
   let visited = [];
    
    while(!visited.includes(n)) {
        visited.push(n);
        
        n = sumOfSquares(n);
        
        if (n==1) return true;
    }
    
    return false;
};

let sumOfSquares = (n) => {
    let result = 0;
    while(n) {
        digit = n % 10;
        digit = Math.pow(digit, 2);
        result += digit;
        n = Math.floor(n / 10);
    }
    return result;
}
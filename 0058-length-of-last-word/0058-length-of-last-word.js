/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let count = 0;
    let foundWord = false;
    
    for (let index = s.length-1; index != -1; index-=1) {
        console.log(s[index])
        if (s[index] === ' ') {
            if(foundWord) return count;
            count = 0;
        } else {
            foundWord = true;
            count += 1;   
        }
    }
    
    return count;
};
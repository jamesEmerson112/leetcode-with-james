/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let index = s.length-1;
    let count = 0;
    
    while (s[index] == ' ') {
        index -=1;
    }
    while (index >= 0 && s[index] != ' ') {
        console.log(s[index])
        count += 1;
        index -= 1;
    }
    return count;
};
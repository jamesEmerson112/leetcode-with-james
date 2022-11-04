/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    let list = {")":"(",
               "]":"[",
               "}":"{"}
    
    for (let character of s) {
        if (list[character]) {
            if(stack && (stack[stack.length-1] === list[character])) {
                stack.pop();
            }
            else {
                return false;
            }            
        } else {
            stack.push(character);
        }
    }
    
    console.log(stack);
    if(stack.length != 0)
        return false;
    else
        return true;
};
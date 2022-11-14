/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function(arr) {
    let rightMax = -1;
    
    for (let i = arr.length-1; i >= 0; i-=1) {
        newMax = Math.max(rightMax, arr[i]);
        arr[i] = rightMax;
        rightMax = newMax;
    }
    
    return arr;
};
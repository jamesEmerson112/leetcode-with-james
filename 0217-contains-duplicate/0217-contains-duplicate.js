/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    if (nums.length === 1) return false;
    let obj = {};
    
    for (let num of nums) {
        if(!obj.hasOwnProperty(num)) {
            obj[num] = 1;
        } else {
            obj[num] += 1;
        }
    }
    
    for (let index in obj) {
        if (obj[index] > 1) {
            return true;
        }
    }
    return false;
};
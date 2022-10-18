/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let result = [];
    let remainder;
    for (let i = 0; i < nums.length; i+=1) {
        remainder = target - nums[i];
        let otherIndex = nums.indexOf(remainder, i+1);
        if (otherIndex !== -1) {
            result.push(i);
            result.push(otherIndex);
            return result;
        }
    }
    return [];
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let sum = 0;
    for (let i in nums) {
        sum += nums[i];
    }
    
    return ((nums.length*(nums.length+1)) >> 1) - sum;
};
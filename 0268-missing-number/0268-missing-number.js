/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let sum = nums.length;
    
    for (let i in nums) {
        sum += i - nums[i];
    }
    
    return sum;
};
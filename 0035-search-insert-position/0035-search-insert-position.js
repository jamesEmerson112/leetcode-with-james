/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0;
    let right = nums.length-1;

    while (left <= right) {
        let mid = Math.round((left + right) / 2);
        if(target > nums[mid]) {
            left = mid + 1;
            console.log('left ', left);
        } else if (target < nums[mid]) {
            right = mid - 1;
        } else if (target === nums[mid]) {
            return mid;
        } 
    }
    
    return left;
};
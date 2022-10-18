/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let hashMap = {};
    
    // hash {value, key}
    for(let i = 0; i < nums.length; i+=1) {
        let remainer = target - nums[i];
        if (hashMap[remainer] >= 0) 
            return [hashMap[remainer], i];
        hashMap[nums[i]] = i;
    }
    return [];
};
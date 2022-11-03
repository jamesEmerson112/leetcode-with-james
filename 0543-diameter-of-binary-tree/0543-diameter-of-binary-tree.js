/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    let result = 0;
    
    let dfs = (root) => {
        if(!root) {
            return -1;
        }
        
        let left = dfs(root.left);
        let right = dfs(root.right);
        
        let diameter = 2 + left + right;
        result = Math.max(result, diameter);
        
        let height = 1 + Math.max(left, right);
        
        return height;
    }
    
    dfs(root);
    
    return result;
};
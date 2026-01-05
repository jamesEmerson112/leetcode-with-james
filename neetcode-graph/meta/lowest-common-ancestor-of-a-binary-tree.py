# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root:
            return None
        
        # given a tree, traverse with dfs and keep track of depth
        if root == p or root == q:
            return root
        
        lca = None

        def dfs(node):
            nonlocal lca
            if not node:
                return [False, False]

            if lca:
                return [False, False]
            
            left = dfs(node.left)
            right = dfs(node.right)

            result = [left[0] or right[0] or (node == p), left[1]   or right[1] or (node == q)]
            if result

        dfs(root)

        return result
        
        
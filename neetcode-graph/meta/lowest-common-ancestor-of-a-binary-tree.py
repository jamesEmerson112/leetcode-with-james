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
        

        # keep track of which node is the lowest
        # in other words, the lowest node with two descendants is the answer


        # dfs to print out the node
        def dfs(node, depth=0):
            if not node:
                return None
            
            print(node.val)
            depth += 1
            print("depth:", depth)
            
            left = dfs(node.left, depth)
            right = dfs(node.right, depth)

        dfs(root)

        return None
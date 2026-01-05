# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

# class Solution:
    # def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # if not root:
        #     return None
        
        # # given a tree, traverse with dfs and keep track of depth
        # if root == p or root == q:
        #     return root
        
        # lca = None

        # def dfs(node):
        #     nonlocal lca
        #     if not node:
        #         return [False, False]

        #     if lca:
        #         return [False, False]
            
        #     left = dfs(node.left)
        #     right = dfs(node.right)

        #     result = [left[0] or right[0] or (node == p), left[1]   or right[1] or (node == q)]
        #     if result[0] and result[1] and not lca:
        #         lca = node

        #     return result

        # dfs(root)

        # return lca
        

# class Solution:
#     def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':

#         if root is None or root == p or root == q:
#             return root
        
#         left = self.lowestCommonAncestor(root.left, p, q)
#         right = self.lowestCommonAncestor(root.right, p, q)

#         if left and right:
#             return root
        
#         return left if left else right # return whichever is not None
        

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        parent = {root: None}

        queue = deque([root])

        while p not in parent or q not in parent:
            node = queue.popleft()

            if node.left:
                parent[node.left] = node
                queue.append(node.left)
            if node.right:
                parent[node.right] = node
                queue.append(node.right)

        ancestors = set()
        while p:
            ancestors.add(p)
            p = parent[p]

        while q not in ancestors:
            q = parent[q]

        return q
"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def test(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None
        
        # create a new node with value of node.val
        new_node = Node(node.val)

        visited = []

        # clone the neighbors of the node to new_node
        for neighbor in node.neighbors:
            if neighbor.val not in visited:
                visited.append(neighbor.val)
                new_neighbor = self.test(neighbor)
                new_node.neighbors.append(new_neighbor)
        
        return new_node

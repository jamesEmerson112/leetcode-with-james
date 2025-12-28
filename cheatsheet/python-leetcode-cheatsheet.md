# Python LeetCode Cheatsheet

A comprehensive study guide for Python LeetCode problems.

---

## Table of Contents
1. [Data Structures](#1-data-structures)
2. [Algorithm Patterns](#2-algorithm-patterns)
3. [Python Syntax Quick Reference](#3-python-syntax-quick-reference)
4. [Time/Space Complexity Reference](#4-timespace-complexity-reference)

---

## 1. Data Structures

### Dictionary / HashMap

**When to use:**
- Need O(1) lookup, insertion, deletion
- Counting frequency of elements
- Mapping relationships (value → index, char → count)
- Two Sum style problems (find complement)

**Template:**
```python
# Basic operations
d = {}
d[key] = value          # Insert/Update: O(1)
value = d[key]          # Access: O(1)
value = d.get(key, default)  # Safe access with default
del d[key]              # Delete: O(1)
key in d                # Check existence: O(1)

# Iteration
for key in d:           # Keys
for key, value in d.items():  # Key-value pairs
```

**Example - Two Sum:**
```python
def twoSum(nums: List[int], target: int) -> List[int]:
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

**Time:** O(1) average for all operations
**Space:** O(n) where n = number of entries

---

### Stack

**When to use:**
- LIFO (Last In, First Out) operations
- Matching pairs (parentheses, brackets)
- Nested structures
- Undo operations
- DFS (iterative)

**Template:**
```python
stack = []
stack.append(item)      # Push: O(1)
item = stack.pop()      # Pop: O(1)
top = stack[-1]         # Peek: O(1)
len(stack)              # Size: O(1)
if stack:               # Check not empty
```

**Example - Valid Parentheses:**
```python
def isValid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping:  # Closing bracket
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:  # Opening bracket
            stack.append(char)

    return len(stack) == 0
```

**Time:** O(n)
**Space:** O(n)

---

### Heap / Priority Queue (heapq)

**When to use:**
- Find k largest/smallest elements
- Merge k sorted lists
- Continuous median
- Task scheduling by priority

**Key concept:** Python's heapq is a MIN-HEAP. For max-heap, negate values.

**Template:**
```python
import heapq

# Min-heap operations
heap = []
heapq.heappush(heap, item)    # Push: O(log n)
item = heapq.heappop(heap)    # Pop smallest: O(log n)
smallest = heap[0]            # Peek smallest: O(1)
heapq.heapify(list)           # Convert list to heap: O(n)

# Max-heap (negate values)
heapq.heappush(heap, -item)
largest = -heapq.heappop(heap)

# Get k smallest/largest
heapq.nsmallest(k, iterable)  # O(n log k)
heapq.nlargest(k, iterable)   # O(n log k)
```

**Example - Kth Largest Element:**
```python
def findKthLargest(nums: List[int], k: int) -> int:
    # Keep a min-heap of size k
    min_heap = []

    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Remove smallest

    return min_heap[0]  # Kth largest is the smallest in heap
```

**Time:** O(n log k)
**Space:** O(k)

---

### Set

**When to use:**
- O(1) membership testing
- Remove duplicates
- Find intersection/union/difference
- Track visited elements

**Template:**
```python
s = set()
s.add(item)             # Add: O(1)
s.remove(item)          # Remove (raises error if missing): O(1)
s.discard(item)         # Remove (no error if missing): O(1)
item in s               # Check membership: O(1)

# Set operations
s1 | s2                 # Union
s1 & s2                 # Intersection
s1 - s2                 # Difference
s1 ^ s2                 # Symmetric difference
```

**Example - Contains Duplicate:**
```python
def containsDuplicate(nums: List[int]) -> bool:
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# Or simply:
def containsDuplicate(nums: List[int]) -> bool:
    return len(nums) != len(set(nums))
```

---

### Deque (Double-Ended Queue)

**When to use:**
- BFS traversal (efficient popleft)
- Sliding window maximum/minimum
- Implement queue with O(1) operations at both ends

**Template:**
```python
from collections import deque

q = deque()
q.append(item)          # Add to right: O(1)
q.appendleft(item)      # Add to left: O(1)
item = q.pop()          # Remove from right: O(1)
item = q.popleft()      # Remove from left: O(1)
q[0]                    # Peek left: O(1)
q[-1]                   # Peek right: O(1)
```

**Example - BFS:**
```python
from collections import deque

def bfs(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        node = queue.popleft()
        result.append(node.val)

        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)

    return result
```

---

## 2. Algorithm Patterns

### Two Pointers

**When to use:**
- Sorted array problems
- Palindrome validation
- Remove duplicates in-place
- Container with most water
- Merge sorted arrays

**Template - Opposite Ends:**
```python
def twoPointers(arr):
    left, right = 0, len(arr) - 1

    while left < right:
        # Process arr[left] and arr[right]
        if condition:
            left += 1
        else:
            right -= 1
```

**Template - Same Direction (Fast/Slow):**
```python
def fastSlow(arr):
    slow = 0
    for fast in range(len(arr)):
        if condition:
            arr[slow] = arr[fast]
            slow += 1
    return slow
```

**Example - Valid Palindrome:**
```python
def isPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1

    while left < right:
        # Skip non-alphanumeric
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True
```

---

### DFS (Depth-First Search)

**When to use:**
- Tree/graph traversal
- Path finding
- Connected components
- Grid/matrix exploration
- Backtracking problems

**Template - Recursive (Tree):**
```python
def dfs(node):
    if not node:
        return

    # Process node (preorder)
    dfs(node.left)
    # Process node (inorder)
    dfs(node.right)
    # Process node (postorder)
```

**Template - Grid DFS:**
```python
def dfs(grid, row, col, visited):
    # Boundary check
    if (row < 0 or row >= len(grid) or
        col < 0 or col >= len(grid[0]) or
        visited[row][col] or grid[row][col] == 0):
        return 0

    visited[row][col] = True

    # Explore 4 directions
    result = 1
    for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
        result += dfs(grid, row + dr, col + dc, visited)

    return result
```

**Example - Max Area of Island:**
```python
def maxAreaOfIsland(grid: List[List[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    visited = [[False] * cols for _ in range(rows)]
    max_area = 0

    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            visited[r][c] or grid[r][c] == 0):
            return 0

        visited[r][c] = True
        area = 1
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            area += dfs(r + dr, c + dc)
        return area

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1 and not visited[r][c]:
                max_area = max(max_area, dfs(r, c))

    return max_area
```

---

### BFS (Breadth-First Search)

**When to use:**
- Shortest path (unweighted graph)
- Level-order traversal
- Finding nearest/minimum steps
- Multi-source BFS

**Template:**
```python
from collections import deque

def bfs(start):
    queue = deque([start])
    visited = {start}
    level = 0

    while queue:
        level_size = len(queue)
        for _ in range(level_size):  # Process entire level
            node = queue.popleft()

            for neighbor in get_neighbors(node):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        level += 1

    return level
```

**Example - Binary Tree Level Order:**
```python
def levelOrder(root: TreeNode) -> List[List[int]]:
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level = []
        level_size = len(queue)

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result
```

---

### Sliding Window

**When to use:**
- Subarray/substring problems with constraints
- Maximum/minimum in window
- Fixed or variable size window

**Template - Variable Size:**
```python
def slidingWindow(s):
    left = 0
    result = 0
    window = {}  # or other state

    for right in range(len(s)):
        # Expand: add s[right] to window
        window[s[right]] = window.get(s[right], 0) + 1

        # Contract: shrink window while invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0:
                del window[s[left]]
            left += 1

        # Update result
        result = max(result, right - left + 1)

    return result
```

**Example - Longest Substring Without Repeating:**
```python
def lengthOfLongestSubstring(s: str) -> int:
    char_index = {}
    left = 0
    max_len = 0

    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1

        char_index[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len
```

---

### Binary Search

**When to use:**
- Sorted array search
- Search space reduction
- Finding boundary (first/last occurrence)
- Minimize maximum / Maximize minimum

**Template - Standard:**
```python
def binarySearch(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
```

**Template - Find Left Boundary:**
```python
def findLeftBoundary(nums, target):
    left, right = 0, len(nums)

    while left < right:
        mid = left + (right - left) // 2

        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid

    return left
```

**Template - Search on Answer:**
```python
def searchOnAnswer(nums):
    left, right = min_possible, max_possible

    while left < right:
        mid = left + (right - left) // 2

        if is_valid(mid):  # Can achieve this answer
            right = mid    # Try smaller
        else:
            left = mid + 1

    return left
```

---

### Dynamic Programming

**When to use:**
- Optimal substructure (optimal solution uses optimal sub-solutions)
- Overlapping subproblems
- Counting paths/ways
- Min/max problems

**Template - Memoization (Top-Down):**
```python
def dp_memo(n):
    memo = {}

    def helper(state):
        if state in memo:
            return memo[state]

        if base_case:
            return base_value

        result = recurrence_relation
        memo[state] = result
        return result

    return helper(initial_state)
```

**Template - Tabulation (Bottom-Up):**
```python
def dp_table(n):
    dp = [0] * (n + 1)
    dp[0] = base_case

    for i in range(1, n + 1):
        dp[i] = recurrence(dp[i-1], dp[i-2], ...)

    return dp[n]
```

**Example - Climbing Stairs:**
```python
def climbStairs(n: int) -> int:
    if n <= 2:
        return n

    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    return prev1
```

**Example - House Robber:**
```python
def rob(nums: List[int]) -> int:
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    prev2, prev1 = 0, nums[0]
    for i in range(1, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2 = prev1
        prev1 = curr

    return prev1
```

---

## 3. Python Syntax Quick Reference

### List Operations
```python
# Creation
arr = []
arr = [0] * n                    # [0, 0, 0, ...]
arr = [i for i in range(n)]      # [0, 1, 2, ...]
matrix = [[0] * cols for _ in range(rows)]  # 2D array

# Common operations
arr.append(x)        # Add to end
arr.pop()            # Remove from end
arr.pop(i)           # Remove at index
arr.insert(i, x)     # Insert at index
arr.reverse()        # In-place reverse
arr[::-1]            # Reversed copy
arr.sort()           # In-place sort
sorted(arr)          # Sorted copy
arr.sort(key=lambda x: x[1])  # Sort by custom key
```

### String Operations
```python
s.lower()            # Lowercase
s.upper()            # Uppercase
s.isalnum()          # Is alphanumeric?
s.isalpha()          # Is alphabetic?
s.isdigit()          # Is digit?
s.split()            # Split by whitespace
s.split(',')         # Split by delimiter
''.join(list)        # Join list to string
s.strip()            # Remove leading/trailing whitespace
s.replace(old, new)  # Replace substring
s.find(sub)          # Find index (-1 if not found)
s.count(sub)         # Count occurrences
s[start:end:step]    # Slicing
```

### Collections Module
```python
from collections import Counter, defaultdict, deque

# Counter - frequency counting
count = Counter("abracadabra")  # {'a': 5, 'b': 2, 'r': 2, ...}
count.most_common(2)            # [('a', 5), ('b', 2)]

# defaultdict - dict with default value
d = defaultdict(int)            # Default 0
d = defaultdict(list)           # Default []
d[key] += 1                     # No KeyError

# deque - already covered above
```

### Useful Built-ins
```python
# Iteration
enumerate(arr)       # Index + value pairs
zip(arr1, arr2)      # Pair elements
range(start, end, step)

# Math
min(a, b)
max(a, b)
abs(x)
sum(arr)
float('inf')         # Positive infinity
float('-inf')        # Negative infinity
divmod(a, b)         # (quotient, remainder)
pow(base, exp, mod)  # Modular exponentiation

# Type conversion
int("123")
str(123)
list("abc")          # ['a', 'b', 'c']
set([1, 2, 2])       # {1, 2}
```

### Nested Functions & nonlocal
```python
def outer():
    count = 0

    def inner():
        nonlocal count  # Access outer variable
        count += 1

    inner()
    return count
```

### Type Hints
```python
from typing import List, Optional, Dict, Set, Tuple

def func(nums: List[int], target: int) -> int:
    pass

def func(root: Optional[TreeNode]) -> List[int]:
    pass
```

---

## 4. Time/Space Complexity Reference

| Pattern | Time | Space | Example |
|---------|------|-------|---------|
| HashMap lookup | O(1) | O(n) | Two Sum |
| Stack operations | O(n) | O(n) | Valid Parentheses |
| Min-heap (k elements) | O(n log k) | O(k) | Kth Largest |
| Two Pointers | O(n) | O(1) | Valid Palindrome |
| DFS (tree) | O(n) | O(h) | Tree traversal |
| DFS (grid) | O(m×n) | O(m×n) | Max Area Island |
| BFS (tree) | O(n) | O(w) | Level Order |
| BFS (graph) | O(V+E) | O(V) | Shortest Path |
| Sliding Window | O(n) | O(k) | Longest Substring |
| Binary Search | O(log n) | O(1) | Search in Sorted |
| Sort | O(n log n) | O(n) | - |
| DP (1D) | O(n) | O(n) or O(1) | Climbing Stairs |
| DP (2D) | O(m×n) | O(m×n) | Unique Paths |

**Where:**
- n = input size
- h = tree height
- w = max tree width
- V = vertices, E = edges
- k = window/heap size
- m, n = grid dimensions

---

## Quick Problem Recognition Guide

| See this... | Think... |
|-------------|----------|
| "Find pair/complement" | HashMap |
| "Valid parentheses/brackets" | Stack |
| "Kth largest/smallest" | Heap |
| "Sorted array" | Binary Search / Two Pointers |
| "Tree traversal" | DFS (recursive) |
| "Level by level" | BFS (queue) |
| "Shortest path (unweighted)" | BFS |
| "Connected components" | DFS/BFS + visited |
| "Substring/subarray" | Sliding Window |
| "Optimization (min/max)" | DP or Greedy |
| "Count ways/paths" | DP |
| "In-place modification" | Two Pointers |

---

Good luck on your exam!

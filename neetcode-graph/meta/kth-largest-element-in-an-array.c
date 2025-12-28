// class Solution:
//     def findKthLargest(self, nums: List[int], k: int) -> int:
//         import heapq

//         min_heap = []

//         for num in nums:
//             heapq.heappush(min_heap, num)
//             print(min_heap)
//             if len(min_heap) > k:
//                 heapq.heappop(min_heap)
//                 print(min_heap)

//         return min_heap[0]

#include <stdio.h>
#include <stdlib.h>

// Min-heap helper functions
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapifyUp(int* heap, int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;
        if (heap[parent] > heap[index]) {
            swap(&heap[parent], &heap[index]);
            index = parent;
        } else {
            break;
        }
    }
}

void heapifyDown(int* heap, int size) {
    int index = 0;
    while (1) {
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        int smallest = index;

        if (left < size && heap[left] < heap[smallest]) {
            smallest = left;
        }
        if (right < size && heap[right] < heap[smallest]) {
            smallest = right;
        }
        if (smallest != index) {
            swap(&heap[index], &heap[smallest]);
            index = smallest;
        } else {
            break;
        }
    }
}

void heapPush(int* heap, int* size, int val) {
    heap[*size] = val;
    heapifyUp(heap, *size);
    (*size)++;
}

int heapPop(int* heap, int* size) {
    int result = heap[0];
    (*size)--;
    heap[0] = heap[*size];
    heapifyDown(heap, *size);
    return result;
}

int findKthLargest(int* nums, int numsSize, int k) {
    int* minHeap = (int*)malloc((k + 1) * sizeof(int));
    int heapSize = 0;

    for (int i = 0; i < numsSize; i++) {
        heapPush(minHeap, &heapSize, nums[i]);

        if (heapSize > k) {
            heapPop(minHeap, &heapSize);
        }
    }

    int result = minHeap[0];
    free(minHeap);
    return result;
}

#include <stdio.h>
#include <stdlib.h>
// declare structure to store block information (id, starting address, ending address, link to next block)
struct block {
    int id;
    int start;
    int end;
    struct block* next;
};
// declare linked list to connect allocation block
struct block* head = NULL;
// declare global variables
int pm_size = 0;
int remaining = 0;
int algorithm = 0;
/********************************************************************/
void enterParameters() {
    // declare local variables (if any)

    // prompt for size of physical memory and choice of hole-fitting algorithm (0=first-fit, 1=best-fit), initialize remaining memory
    printf("Enter size of physical memory: ");
    scanf("%d", &pm_size);
    printf("Enter hole-fitting algorithm (0=first fit, 1=best fit): ");
    scanf("%d", &algorithm);
    remaining = pm_size;    
    // initilize linked list with "dummy" block of size 0
    head = (struct block*)malloc(sizeof(struct block));
    head->id = -1;
    head->start = 0;
    head->end = 0;
    head->next = NULL;

    return;
}
/********************************************************************/
void printTable() {
    // declare local variables
    struct block* current = head->next;
    // print table containing block id, starting address, ending address
    printf("ID    Start   End\n");
    printf("-------------------\n");
    while (current != NULL) {
        printf("%-6d%-8d%d\n", current->id, current->start, current->end);
        current = current->next;       
    }          
    return;
}
/********************************************************************/
void allocateMemory() {
    // declare local variables
    int id, size;
    struct block* new_block = NULL;
    struct block* current = head->next;
    struct block* prev = head;
    struct block* best_block = NULL;
    // initialize best hole so far to size of physical memory
    int best_hole = pm_size;
    int best_start, best_end;
    // prompt for block id & block size
    // prompt for block id & block size
    printf("Enter block id: ");
    scanf("%d", &id);
    printf("Enter block size: ");
    scanf("%d", &size); 
    // check if size of block is larger than remaining unallocated space, if so, print message and return
    if (size > remaining) {
        printf("Not enough memory.\n");
        return;
    }
    // allocate space for new block and set id
    new_block = (struct block*)malloc(sizeof(struct block));
    new_block->id = id;
    new_block->next = NULL;
    // if only "dummy" block exists, insert block at end of linked list, set fields, return
    if (current == NULL) {
        head->next = new_block;
        new_block->start = 0;
        new_block->end = size;
        remaining -= size;
        printTable();
        return;
    // else traverse list until either appropriate hole is found or the end of the list is reached
    } else {
        while (current != NULL) {
            // if id already exists, reject request and return
            if (current->id == id) {
                printf("ID %d already exists. Please choose a different ID.\n", id);
                return;                
            }
            // set values for start and end of currently found hole
            int hole_start = prev->end;
            int hole_end = current->start;
            // if hole is large enough for block
            if (hole_end - hole_start >= size) {
                // if first-fit algorithm
                if (algorithm == 0) {
                    // set start & end fields of new block & add block into linked list
                    new_block->start = hole_start;
                    new_block->end = hole_start + size;
                    new_block->next = current;
                    prev->next = new_block;
                    // reduce remaining available memory and return
                    remaining -= size;
                    printTable();
                    return;
                // else--best-fit algorithm
                } else {
                    // if hole is smaller than best so far
                    if (hole_end - hole_start < best_hole) {
                        // set values of best start & best end & best hole size so far
                        best_start = hole_start;
                        best_end = hole_end;
                        best_hole = best_end - best_start;
                        // update best block & advance next block
                        best_block->start = best_start
                    }
                }
            }
            prev = current;
            current = current->next;
        }
    }
    // set start & end fields of new block & add block into linked list
    new_block->start = best_block->end;
    new_block->end = best_block->end + size;
    new_block->next = best_block->next;
    best_block->next = new_block;

    // reduce remaining available memory and return
    remaining -= size;
    printTable();
    return;
}
/********************************************************************/
void deallocateMemory() {
    // declare local variables
    int id;
    struct block* current = head->next;
    struct block* prev = head;
    // prompt for block id
    printf("Enter block ID: ");
    scanf("%d", &id);    
    // until end of linked list is reached or block id is found
    while (current != NULL && current->id != id) {
        // traverse list
        prev = current;
        current = current->next;
    }
    // if end of linked list reached, print block id not found
    if (current == NULL) {
        printf("Block ID not found.\n");   
    // else remove block and deallocate memory
    } else {
        prev->next = current->next;
        remaining += current->end - current->start;
    }
    printTable();
    return;

}
/********************************************************************/
void defragment() {
    // declare local variables
    struct block* current = head->next;
    struct block* prev = head;
    int old_start;
    // until end of list is reached
    while (current != NULL) {
        // calculate current hole size
        int hole_size = current->start - prev->end;
        // adjust start & end fields of current block to eliminate hole
        if (hole_size > 0) {
            old_start = current->start;
            current->start = prev->end;
            current->end = current->start + (current->end - old_start);
        }
        prev = current;
        current = current->next;
    }
    printTable();
    return;
}
/********************************************************************/
void quitProgram(struct block *node) {
    // if node is NULL, return
    if (node == NULL) {
        return;
    // else
    } else {
        //recursively call procedure on node->link
        quitProgram(node->next);
        // deallocate memory from node
        free(node);
    }

return;
}
/***************************************************************/
int main() {
    /* declare local vars */
    int choice;
    /* while user has not chosen to quit */
    while (1) {
        /* print menu of options */
        printf("\nMemory allocation\n");
        printf("-----------------\n");
        printf("1) Enter parameters\n");
        printf("2) Allocate memory for block\n");
        printf("3) Deallocate memory for block\n");
        printf("4) Defragment memory\n");
        printf("5) Quit program\n");

        /* prompt for menu selection */
        printf("Enter selection: ");
        scanf("%d", &choice);
        /* call appropriate procedure based on choice--use switch statement or series of if, else if, else statements */
        switch (choice) {
            case 1:
                enterParameters();
                break;
            case 2:
                allocateMemory();
                break;
            case 3:
                deallocateMemory();
                break;
            case 4:
                defragment();
                break;
            case 5:
                quitProgram(head->next);
                break;
            default:
                printf("Invalid option. Please try again.\n");
        }
    } /* while loop */
    return 0; /* indicates success */
} /* end of procedure */
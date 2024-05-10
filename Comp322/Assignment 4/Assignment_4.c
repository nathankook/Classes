#include <stdio.h>
#include <stdlib.h>
// declare structure to store block information (id, starting address,
ending address, link to next block)
// declare linked list to connect allocation block
// declare global variables
/********************************************************************/
void "OPTION #1"() {
// declare local variables (if any)
// prompt for size of physical memory and choice of hole-fitting
algorithm (0=first-fit, 1=best-fit), initialize remaining memory
// initilize linked list with "dummy" block of size 0
return;
}
/********************************************************************/
void "PROCEDURE TO PRINT ALLOCATION TABLE"() {
// declare local variables
// print table containing block id, starting address, ending address
return;
}
/********************************************************************/
void "OPTION #2"() {
// declare local variables
// initialize best hole so far to size of physical memory
// prompt for block id & block size
// check if size of block is larger than remaining unallocated
space, if so, print message and return
// allocate space for new block and set id
// if only "dummy" block exists, insert block at end of linked list,
set fields, return
// else traverse list until either appropriate hole is found or the
end of the list is reached
// if id already exists, reject request and return
// set values for start and end of currently found hole
// if hole is large enough for block
// if first-fit algorithm
// set start & end fields of new block
& add block into linked list
// reduce remaining available memory
and return
// else--best-fit algorithm
// if hole is smaller than best so far
// set values of best start
& best end & best hole size so far
// update best block &
advance next block
// set start & end fields of new block & add block into linked list
// reduce remaining available memory and return
return;
}
/********************************************************************/
void "OPTION #3"() {
// declare local variables
// prompt for block id
// until end of linked list is reached or block id is found
// traverse list
// if end of linked list reached, print block id not found
// else remove block and deallocate memory
return;
}
/********************************************************************/
void "OPTION #4"() {
// declare local variables
// until end of list is reached
// calculate current hole size
// adjust start & end fields of current block to
eliminate hole
return;
}
/********************************************************************/
void "OPTION #5"(parameter_type *node) {
// if node is NULL, return
// else
//recursively call procedure on node->link
// deallocate memory from node
return;
}
/***************************************************************/
int main() {
/* declare local vars */
/* while user has not chosen to quit */
/* print menu of options */
/* prompt for menu selection */
/* call appropriate procedure based on choice--use switch
statement or series of if, else if, else statements */
} /* while loop */
return 1; /* indicates success */
} /* end of procedure */
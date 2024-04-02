#include <stdio.h>
#include <stdlib.h>
/* Declare dynamic arrays and global variables*/
/***********************************************************/
void "PROCEDURE TO PRINT RESOURCE VECTOR"() {
/* declare local variables */
/* for loop: print each resource index */
/* for loop: print number of total units and available units of each
resource index */
return;
}
/***************************************************************/
void "PROCEDURE TO PRINT MATRIX"() {
/* declare local variables */
/* for loop: print each resource index */
/* for each process: */
/* for each resource: */
/* print maximum number of units each process
may request, is allocated, and needs from each resource */
return;
}
/****************************************************************/
void "OPTION #1"() {
/* declare local variables */
/* prompt for number of processes and number of resources */
/* allocate memory for vectors and arrays: resource, available,
max_claim, allocated, need */
/* for each resource, prompt for number of units, set resource and
available vectors indices*/
/* for each process, for each resource, prompt for maximum number of
units requested by process, update max_claim and need arrays */
/* for each process, for each resource, prompt for number of
resource units allocated to process */
/* print resource vector, available vector, max_claim array,
allocated array, need array */
return;
}
/********************************************************************/
void "OPTION #2"() {
/* declare local variables, including vector to indicate if process
is safely sequenced and "num_sequenced" count*/
/* while not all processed are sequenced */
/* for each process */
/* if process has not been safely sequenced
yet 8?
/* for each resource */
/* check for safe sequencing
by comparing process' need vector to available vector */
/* if each resource is
available */
/* print message that
process had been safely sequenced */
/* update number of
available units of resource */
/* for each resource */
free all
resources allocated to process */
/* increment
number of sequenced processes */
return;
}
/********************************************************************/
void "OPTION #3"() {
/* check if vectors/array are not NULL--if so, free each
vector/array */ );
return;
}
/***************************************************************/
int main() {
/* Declare local variables */
/* Until the user quits, print the menu, prompt for the menu choice,
call the appropriate procedure */
return 1;
}
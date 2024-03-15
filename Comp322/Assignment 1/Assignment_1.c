#include <stdio.h>
#include <stdlib.h>

#define MAX_PROCESSES 100

/* Define structures and global variables*/

typedef struct PCB {
    int parent;
    struct PCB* children;
} PCB;

int numProcesses = 0;
PCB* processes[MAX_PROCESSES] = {NULL};

/***************************************************************/
void printHierarchy() {
	/* declare local vars */
    PCB* current = NULL;
	/* for each PCB index i from 0 up to (but not including) maximum number*/
    for (int i = 0; i < numProcesses; i++) {
		/* check if PCB[i] has a parent and children */
        if (processes[i] != NULL && processes[i]->children != NULL) {
			/* print message about children of the current PCB[i] */
            printf("PCB[%d] is the parent of: ", i);
			/* intilize variable to head of list of children */
            current = processes[i]->children;
			/* while the end of the linked list of children is not reached */
            while (current != NULL) {			
				/* print message about current child process index */
                printf("PCB[%d]  ", current->parent);
				/* move to next node in linked list */
                current = current->children;
			} /* while */
			/* print newline */
            printf("\n");
		}/* if */
	} /* for */
} /* end of procedure */

/***************************************************************/
void enterParameters() {
	/* declare local vars */

	/* prompt for maximum number of processes */
    printf("Enter maximum number of processes: ");
    scanf("%d", &numProcesses);
	/* allocate memory for dynamic array of PCBs */
    for (int i = 0; i < numProcesses; i++) {
        processes[i] = (PCB*)malloc(sizeof(PCB));
    }
	/* Define PCB[0] */
    processes[0]->parent = -1;
    processes[0]->children = NULL;
	/* for-loop to intitialize all other indices' parent to -1 */
    for (int i = 1; i < numProcesses; i++) {
        processes[i]->parent = -1;
    }
	return;
} /* end of procedure */

	
/***************************************************************/
void create() {
	/* define local vars */
    int p;
    int q = 1;
    PCB *temp = (PCB*)malloc(sizeof(PCB));
	/* prompt for parent process index p */
    printf("Enter the parent process index: ");
    scanf("%d", &p);
	/* search for first available index q without a parent in a while loop */
    while (processes[q]->parent != -1) {
        q++;
    }
	/* allocate memory for new child process, initilize fields */
    PCB *link = (PCB*)malloc(sizeof(PCB));
	/* record the parent's index p in PCB[q] */
    processes[q]->parent = p;
	/* initialize the list of children of PCB[q] as empty */
    processes[q]->children = NULL;
	/* create a new link containing the child's index q and append the link to the end of the linked list of PCB[p] */
    link->parent = q;
    link->children = NULL;
    if (processes[p]->children == NULL) {
        processes[p]->children = link; // Directly link if no children yet
    } else {
        temp = processes[p]->children;
        while (temp->children != NULL) { // Correctly find the last child
            temp = temp->children;
        }
        temp->children = link; // Append the new child here
    }
	/* call procedure to print current hierachy of processes */
    printHierarchy();
	return;
} /* end of procedure */


/***************************************************************/
void destroy(int index) {
	/* declare local vars */
    PCB* check = NULL;
    int k;
    check = processes[index]->children;
	/* check if end of linked list--if so return */
    if (check == NULL) {
        return;
    } else {
        while (check != NULL) {
            k = check->parent;
            PCB* next = check->children;
            free(processes[k]);
            processes[k] = NULL; // Mark as freed
            check = next;
        }
    }
	return;
} /* end of procedure */


/***************************************************************/
void destroyDescendants() {
	/* declare local vars */
    int destroyIndex;
	/* prompt for process index p */
    printf("Enter the index of the process whose descendants are to be destroyed: ");
    scanf("%d", &destroyIndex);
	/* call recursive procedure to destroy children of PCB[p] */
    destroy(destroyIndex);
	/* reset children of PCB[p] to NULL */
    processes[destroyIndex]->children = NULL;
	/* call procedure to print current hierarchy of processes */
    printHierarchy();
	return;
} /* end of procedure */


/***************************************************************/
void quitProgram() {
	/* check if PCB is non null)*/
    if (processes[0] != NULL) {
		/* check if children of PCB[0] is not null */
        if (processes[0]->children != NULL) {
			/* call recursive procedure to destroy children of PCB[0] */
            destroy(0);
		} /* if */
	/* free memory of PCB */
    free(processes[0]);
	} /* if */
	printf("Quitting program...");
    exit(0);
} /* end of procedure */


/***************************************************************/
int main() {
	/* declare local vars */
    int choice;
	/* while user has not chosen to quit */
    while (1) {
		/* print menu of options */
        printf("\nProcess creation and destruction\n");
        printf("--------------------------------\n");
        printf("1) Enter parameters\n");
        printf("2) Create a new child process\n");
        printf("3) Destroy all descendants of a process\n");
        printf("4) Quit program and free memory\n");        
		/* prompt for menu selection */
        printf("Enter selection: ");
        scanf("%d", &choice);
		/* call appropriate procedure based on choice--use switch statement or series of if, else if, else statements */	
        switch (choice) {
            case 1:
                enterParameters();
                break;
            case 2:
                create();
                break;
            case 3:
                destroyDescendants();
                break;
            case 4:
                quitProgram();
                break;
            default:
                printf("Invalid choice. Please try again.\n");
        }
	} /* while loop */
	 return 1; /* indicates success */
} /* end of procedure */

#include <stdio.h>
#include <stdlib.h>
/* Declare dynamic arrays and global variables*/
int *resource = NULL;
int *available = NULL;
int **max_claim = NULL;
int **allocated = NULL;
int **need = NULL;

int num_processes;
int num_resources;

/***********************************************************/
void printResourceVector() {
    /* declare local variables */

    printf("        Units   Available\n");
    printf("-------------------------\n");
    /* for loop: print each resource index */
    /* for loop: print number of total units and available units of each resource index */
    for (int i = 0; i < num_resources; i++) {
        printf("r%-7d%-8d%-8d\n", i, resource[i], available[i]);
    }

    return;
}
/***************************************************************/
void printMatrix() {
    /* declare local variables */

    printf("        Max claim                       Current                         Potential\n");
    /* for loop: print each resource index */
    printf("        ");
    for (int i = 0; i < num_resources; i ++) {
        printf("r%-7d", i);
    }
    printf("        ");
    for (int i = 0; i < num_resources; i ++) {
        printf("r%-7d", i);
    }
    printf("        ");
    for (int i = 0; i < num_resources; i ++) {
        printf("r%-7d", i);
    }
    printf("\n------------------------------------------------------------------------------------------\n");
    /* for each process: */
    for (int i = 0; i < num_processes; i ++) {
        printf("p%-7d", i);
        /* for each resource: */
        for (int j = 0; j < num_resources; j++) {
            /* print maximum number of units each process may request */
            printf("%-8d", max_claim[i][j]);
        }
        printf("        ");
        for (int j = 0; j < num_resources; j++) {
            /* print allocated units from each resource */
            printf("%-8d", allocated[i][j]);
        }
        printf("        ");
        for (int j = 0; j < num_resources; j++) {
            /* print units needed from each resource */
            printf("%-8d", need[i][j]);
        }
        printf("\n");
    }
    return;
}

/****************************************************************/
void enterParameters() {
    /* declare local variables */

    /* prompt for number of processes and number of resources */
    printf("Enter number of processes: ");
    scanf("%d", &num_processes);
    printf("Enter number of resources: ");
    scanf("%d", &num_resources);
    /* allocate memory for vectors and arrays: resource, available, max_claim, allocated, need */
    resource = (int *)malloc(num_resources * sizeof(int));
    available = (int *)malloc(num_resources * sizeof(int));
    max_claim = (int **)malloc(num_processes * sizeof(int *));
    allocated = (int **)malloc(num_processes * sizeof(int *));
    need = (int **)malloc(num_processes * sizeof(int *));

    for (int i = 0; i < num_processes; i++) {
        max_claim[i] = (int *)malloc(num_resources * sizeof(int));
        allocated[i] = (int *)malloc(num_resources * sizeof(int));
        need[i] = (int *)malloc(num_resources * sizeof(int));
    }
    /* for each resource, prompt for number of units, set resource and available vectors indices*/
    printf("Enter number of units for resources (r0 to r%d): ", num_resources - 1);
    for (int i = 0; i < num_resources; i++) {
        scanf("%d", &resource[i]);
        available[i] = resource[i];
    }
    /* for each process, for each resource, prompt for maximum number of units requested by process, update max_claim and need arrays */
    for (int i = 0; i < num_processes; i++) {
        printf("Enter maximum number of units process p%d will request from each resource (r0 to r%d): ", i, num_resources - 1);
        for (int j = 0; j < num_resources; j++) {
            scanf("%d", &max_claim[i][j]);
        }
    }
    /* for each process, for each resource, prompt for number of resource units allocated to process */
    for (int i = 0; i < num_processes; i++) {
        printf("Enter number of units of each resource (r0 to r%d) allocated to process p%d: ", num_resources - 1, i);
        for (int j =0; j < num_resources; j++) {
            scanf("%d", &allocated[i][j]);
            need[i][j] = max_claim[i][j] - allocated[i][j];
        }
    }
    /* print resource vector, available vector, max_claim array, allocated array, need array */
    printResourceVector();
    printMatrix();

    return;
}
/********************************************************************/
void safeSequence() {
    /* declare local variables, including vector to indicate if process is safely sequenced and "num_sequenced" count*/
    int *done = (int *)calloc(num_processes * sizeof(int));
    int finished = 0;
    int at_least_one = 1;
    int i, j;
    int less_than = 1;
    /* while not all processed are sequenced */
    while ((finished < num_processes) && (at_least_one == 1)) {
        /* for each process */
        for (i = 0; i < num_processes; i ++) {
            /* if process has not been safely sequenced yet */
                /* for each resource */
                    /* check for safe sequencing by comparing process' need vector to available vector */
                    /* if each resource is available */
                    /* print message that process had been safely sequenced */
                    /* update number of available units of resource */
                    /* for each resource */
                        /* free all resources allocated to process */
                        /* increment number of sequenced processes */
        }
    }

return;
}
/********************************************************************/
void quitProgram() {
    /* check if vectors/array are not NULL--if so, free each vector/array */
    if(resource != NULL) free(resource);
    if(available != NULL) free(available);
    if(max_claim != NULL) {
        for(int i = 0; i < num_processes; i++)
            if(max_claim[i] != NULL) free(max_claim[i]);
        free(max_claim);
    }
    if(allocated != NULL) {
        for(int i = 0; i < num_processes; i++)
            if(allocated[i] != NULL) free(allocated[i]);
        free(allocated);
    }
    if(need != NULL) {
        for(int i = 0; i < num_processes; i++)
            if(need[i] != NULL) free(need[i]);
        free(need);
    }
    printf("Quitting program...\n");
    return;
}
/***************************************************************/
int main() {
    /* Declare local variables */
    int choice;
    /* Until the user quits, print the menu, prompt for the menu choice, call the appropriate procedure */
    do {
        printf("Banker's Algorithm\n");
        printf("------------------\n");
        printf("1) Enter parameters\n");
        printf("2) Determine safe sequence\n");
        printf("3) Quit program\n");
        printf("Enter selection: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                enterParameters();
                break;
            case 2:
                safeSequence();
                break;
            case 3:
                quitProgram();
                break;
            default:
                printf("Invalid option. Please try again. \n");
        }
    } while (choice != 3);

    return 0;
}
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

/* declare global variables including a table structure to hold scheduling information */
typedef struct Process {
    int id;
    int arrival;
    int total_cpu;
    int total_remaining;
    int done;
    int start_time;
    int already_started;
    int end_time;
    int turnaround_time;
} Process;

Process *process_table = NULL;
int total_processes = 0;

/* optional: define a function that finds the maximum of two integers */
/***************************************************************/
void printTable() {
    /* declare local variables */

    /* print table header */
    printf("ID      Arrival Total   Start   End     Turnaround\n");
    printf("--------------------------------------------------\n");
    /* for each process */
    for (int i = 0; i < total_processes; i++) {
        /* print the contents (id, arrival time, total_cycles) of each field of the table's index */
        printf("%-8d%-8d%-8d", process_table[i].id, process_table[i].arrival, process_table[i].total_cpu);
        /* if process has been scheduled ("done" field is 1) */
        if (process_table[i].done == 1) {
            /* print other contents (start time, end time, turnaround time) */ 
            printf("%-8d%-8d%-8d\n", process_table[i].start_time, process_table[i].end_time, process_table[i].turnaround_time);
        } else {
            printf("\n");
        }
    }
    return;
}
/***************************************************************/
void enterParameters() {
    /* declare local variables */

    /* prompt for total number of processes */
    printf("Enter total number of processes: ");
    scanf("%d", &total_processes);
    /* allocate memory for table to hold process parameters */
    process_table = (Process*)malloc(total_processes * sizeof(Process));
    /* for each process */
    for (int i = 0; i < total_processes; i++) {
        /* prompt for process id, arrival time, and total cycle time */
        printf("Enter process id: ");
        scanf("%d", &process_table[i].id);
        printf("Enter arrival cycle for process P[%d]: ", process_table[i].id);
        scanf("%d", &process_table[i].arrival);
        printf("Enter total cycles for process P[%d]: ", process_table[i].id);
        scanf("%d", &process_table[i].total_cpu);
    }
    /* print contents of table */
    printf("\n");
    printTable();
    return;
}
/***************************************************************/
void fifo() {
    /* declare (and initilize when appropriate) local variables */
    int scheduled = 0;
    int current_time = 0;
    /* for each process, reset "done" field to 0 */
    for (int i = 0; i < total_processes; i++) {
        process_table[i].done = 0;
    }
    /* while there are still processes to schedule */
    while (scheduled < total_processes) {
        /* initilize the earliest arrival time to INT_MAX (largest integer value) */
        int earliest = INT_MAX;
        int earliest_index = -1;
        /* for each process not yet scheduled */
        for (int i = 0; i < total_processes; i++) {
            /* check if process has earlier arrival time than current earliest and update */
            if (process_table[i].done != 1 && process_table[i].arrival < earliest) {
                earliest = process_table[i].arrival;
                earliest_index = i;
            }
        }
        /* set start time, end time, turnaround time, done fields for unscheduled process with earliest arrival time */
        process_table[earliest_index].start_time = current_time;
        process_table[earliest_index].end_time = process_table[earliest_index].start_time + process_table[earliest_index].total_cpu;
        process_table[earliest_index].turnaround_time = process_table[earliest_index].end_time - process_table[earliest_index].arrival;
        process_table[earliest_index].done = 1;
        /* update current cycle time and increment number of processes scheduled */
        current_time += process_table[earliest_index].total_cpu;
        scheduled++;
    }
    /* print contents of table */
    printTable();
    return;
}
/***************************************************************/
void sjf() {
    /* declare (and initilize when appropriate) local variables */
    int scheduled = 0;
    int current_time = 0;
    /* for each process, reset "done" field to 0 */
    for (int i = 0; i < total_processes; i++) {
        process_table[i].done = 0;
    }
    /* while there are still processes to schedule */
    while (scheduled < total_processes) {
        /* initilize the lowest total cycle time to INT_MAX(largest integer value) */
        int lowest_cycle = INT_MAX;
        int lowest_index = -1;
        /* for each process not yet scheduled */
        for (int i = 0; i < total_processes; i++) {
            /* check if process has lower total cycle time than current lowest and has arrival time less than current cycle time and update */
            if (process_table[i].done != 1 && process_table[i].total_cpu < lowest_cycle && process_table[i].arrival <= current_time) {
                lowest_cycle = process_table[i].total_cpu;
                lowest_index = i;
            }
        }
        /* set start time, end time, turnaround time, done fields for unscheduled process with lowest (and available) total cycle time */
        process_table[lowest_index].start_time = current_time;
        process_table[lowest_index].end_time = process_table[lowest_index].start_time + process_table[lowest_index].total_cpu;
        process_table[lowest_index].turnaround_time = process_table[lowest_index].end_time - process_table[lowest_index].arrival;
        process_table[lowest_index].done = 1;
        /* update current cycle time and increment number of processes scheduled */
        current_time += process_table[lowest_index].total_cpu;
        scheduled++;
    }
    /* print contents of table */
    printTable();
    return;
}
/***************************************************************/
void srt() {
    /* declare (and initilize when appropriate) local variables */
    int scheduled = 0;
    int current_time = 0;
    /* for each process, reset "done", "total_remaining" and "already_started" fields to 0 */
    for (int i = 0; i < total_processes; i++) {
        process_table[i].done = 0;
        process_table[i].total_remaining = process_table[i].total_cpu;
        process_table[i].already_started = 0;
    }
    /* while there are still processes to schedule */
    while (scheduled < total_processes) {
        /* initilize the lowest total remaining time to INT_MAX (largest integer value) */
        int lowest_remaining_time = INT_MAX;
        int lowest_index = -1;
        /* for each process not yet scheduled */
        for (int i = 0; i < total_processes; i++) {
            /* check if process has lower total remaining time than current lowest and has arrival time less than current cycle time and update */
            if (process_table[i].done != 1 && process_table[i].total_remaining < lowest_remaining_time && process_table[i].arrival <= current_time) {
                lowest_remaining_time = process_table[i].total_remaining;
                lowest_index = i;
            }
        }
        /* check if process already partially-scheduled */
        if (process_table[lowest_index].already_started != 1) {
            /* if so, set "start time", "already_started" fields of process with lowest (and available) total remaining cycle time */
            process_table[lowest_index].start_time = current_time;
            process_table[lowest_index].already_started = 1;
        }
        /* set end time, turnaround time of process with lowest (and available) total remaining cycle time */
        process_table[lowest_index].end_time = current_time + process_table[lowest_index].total_remaining;
        process_table[lowest_index].turnaround_time = process_table[lowest_index].end_time - process_table[lowest_index].arrival;
        /* decrement total remaining time of process with lowest (and available) total remaining cycle time */
        process_table[lowest_index].total_remaining--;
        /* if remaining time is 0, set done field to 1, increment cycle time and number of scheduled processes*/
        if (process_table[lowest_index].total_remaining == 0) {
            process_table[lowest_index].done = 1;
            scheduled++;
        }
        current_time++;
    }
    /* print contents of table */
    printTable();
    return;
}
/***************************************************************/
void quit() {
    /* free the schedule table if not NULL */
    if (process_table != NULL) {
        free(process_table);
    }
    return;
}
/***************************************************************/
int main() {
    /* declare local vars */
    int choice;
    /* while user has not chosen to quit */
    while (choice != 5) {
        /* print menu of options */
        printf("\nBatch scheduling\n");
        printf("----------------\n");
        printf("1) Enter parameters\n");
        printf("2) Schedule processes with FIFO algorithm\n");
        printf("3) Schedule processes with SJF algorithm\n");
        printf("4) Schedule processes with SRT algorithm\n");
        printf("5) Quit and free memory\n\n");

        /* prompt for menu selection */
        printf("Enter selection: ");
        scanf("%d", &choice);

        /* call appropriate procedure based on choice--use switch statement or series of if, else if, else statements */
        switch (choice) {
            case 1:
                enterParameters();
                break;
            case 2:
                fifo();
                break;
            case 3:
                sjf();
                break;
            case 4:
                srt();
                break;
            case 5:
                quit();
                break;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    } /* while loop */
return 1; /* indicates success */
} /* end of procedure */

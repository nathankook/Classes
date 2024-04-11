COMP 322/L—Introduction to Operating Systems and System Architecture  
Assignment #2 — Batch Process Scheduling  

Objective:  
To calculate the timing parameters of batch processes based on different scheduling algorithms.  
Specification:  
The program mimics the execution of different processes under different scheduling algorithms.
The simulation maintains a table that reflects the current state of the system, based on choosing
from a menu of choices, where each choice calls the appropriate procedure, where the choices
are:  
1) Enter parameters
2) Schedule processes with FIFO algorithm
3) Schedule processes with SJF algorithm (non-preemptive)
4) Schedule processes with SRT algorithm (preemptive version of SJF)
5) Quit program and free memory  
Assignment:  
- Create a table to record the status of different processes based on the following parameters:  
    - id: the unique identifier of the process
    - arrival: the point in time when the process enters the ready list to be executed by the
    CPU
    - total_cpu: the amount of CPU time the process will consume between arrival and
    departure
    - total_remaining: the amount of CPU time remaining for a process to complete {used
    for SRT scheduling only}
    - done: a flag that indicates whether the process has been successfully completed (1) or
    not (0)
    - start_time: the time when the process has begun being executed by the CPU
    - already_started: a flag that indicated whether the process has already begun (1) or
    not (0) {used for SRT scheduling only}
    - end_time: the time when the process has been completed by the CPU
    - turnaround_time: the sum of the total CPU time and the waiting time (alternatively:
    the difference between the end time and the arrival time)
- Calculate the values for the start_time, end_time, and turnaround_time for each process
based on the selected scheduling algorithm.

Sample output  
Batch scheduling  
----------------
1) Enter parameters
2) Schedule processes with FIFO algorithm
3) Schedule processes with SJF algorithm
4) Schedule processes with SRT algorithm
5) Quit and free memory  
Enter selection: 1  
Enter total number of processes: 3  
Enter process id: 1  
Enter arrival cycle for process P[1]: 0  
Enter total cycles for process P[1]: 6  
Enter process id: 2  
Enter arrival cycle for process P[2]: 1  
Enter total cycles for process P[2]: 3  
Enter process id: 3  
Enter arrival cycle for process P[3]: 3  
Enter total cycles for process P[3]: 2  
ID Arrival Total Start End Turnaround  
--------------------------------------------------
1 0 6  
2 1 3  
3 3 2  
Batch scheduling  
----------------
1) Enter parameters
2) Schedule processes with FIFO algorithm
3) Schedule processes with SJF algorithm
4) Schedule processes with SRT algorithm
5) Quit and free memory  
Enter selection: 2  
ID Arrival Total Start End Turnaround  
--------------------------------------------------
1 0 6 0 6 6  
2 1 3 6 9 8  
3 3 2 9 11 8  
Batch scheduling  
----------------
1) Enter parameters
2) Schedule processes with FIFO algorithm
3) Schedule processes with SJF algorithm
4) Schedule processes with SRT algorithm
5) Quit and free memory  
Enter selection: 3  
ID Arrival Total Start End Turnaround  
--------------------------------------------------
1 0 6 0 6 6  
2 1 3 8 11 10  
3 3 2 6 8 5  
Batch scheduling  
----------------
1) Enter parameters
2) Schedule processes with FIFO algorithm
3) Schedule processes with SJF algorithm
4) Schedule processes with SRT algorithm
5) Quit and free memory  
Enter selection: 4  
ID Arrival Total Start End Turnaround  
--------------------------------------------------
1 0 6 0 11 11  
2 1 3 1 4 3  
3 3 2 4 6 3  
Batch scheduling  
----------------
1) Enter parameters
2) Schedule processes with FIFO algorithm
3) Schedule processes with SJF algorithm
4) Schedule processes with SRT algorithm
5) Quit and free memory  
Enter selection: 5  
Quitting program...  

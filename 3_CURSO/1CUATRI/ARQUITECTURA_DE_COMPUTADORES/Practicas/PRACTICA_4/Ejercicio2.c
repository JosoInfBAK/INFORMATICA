#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

int main(int argc, char **argv)
{
    int rank, size;
    struct timespec ts;                  // Time struct for nanosleep
    ts.tv_sec = 100 / 1000;              // Time to sleep in seconds
    ts.tv_nsec = (100 % 1000) * 1000000; // Time to sleep in nanoseconds

    MPI_Init(&argc, &argv);

    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int send[4], recv[4];
    if (size == 4)
    {
        if (rank == 0)
        {
            printf("======================= Original Matrix =======================\n");
        }
        nanosleep(&ts, &ts);
        printf("Row %d: ", rank);
        for (int i = 0; i < size; i++)
        {
            send[i] = (i + 1) + rank * size;
            printf("%d ", send[i]);
        }
        printf("\n");
        nanosleep(&ts, &ts); // Sleep for 100ms to divide the output of the processes
        if (rank == 0)
        {
            printf("======================= Transposed Matrix =======================\n");
        }
        MPI_Alltoall(&send, 1, MPI_FLOAT, &recv, 1, MPI_INT, MPI_COMM_WORLD);
        printf("Row %d: ", rank);
        for (int i = 0; i < size; i++)
        {
            printf("%d ", recv[i]);
        }
        printf("\n");
    }
    else
    {
        printf("Error formato en los procesos\n");
    }

    MPI_Finalize();
}
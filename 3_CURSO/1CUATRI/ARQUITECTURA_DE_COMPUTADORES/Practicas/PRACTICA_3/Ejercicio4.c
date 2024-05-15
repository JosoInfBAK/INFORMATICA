#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void main(int argc, char **argv)
{
    int rank, count, rcv;

    MPI_Status status;
    MPI_Init(&argc, &argv);

    MPI_Comm_size(MPI_COMM_WORLD, &count);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    int buffer[count * 3];
    int recv[count * 3];
    for (int i = 0; i < count * 3; i++)
    {
        buffer[i] = rank + 1;
    }
    MPI_Reduce(&buffer, &recv, count * 3, MPI_INT, MPI_PROD, 0, MPI_COMM_WORLD);
    if (rank == 0)
    {
        printf("Soy el proceso %d y el factorial de %d es %d\n", rank,count, recv[0]);
    }

    MPI_Finalize();
}
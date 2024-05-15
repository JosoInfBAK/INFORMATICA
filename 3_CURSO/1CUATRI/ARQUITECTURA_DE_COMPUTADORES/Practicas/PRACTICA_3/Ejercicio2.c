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
    if (rank == 0)
    {
        for (int i = 0; i < count * 3; i++)
        {
            buffer[i] = i;
        }
    }
    MPI_Scatter(&buffer, 3, MPI_INT, &recv, 3, MPI_INT, 0, MPI_COMM_WORLD);
     for (int i = 0; i < 3; i++)
        {
            recv[i] = recv[i] + rank;
        }
    MPI_Gather(&recv, 3, MPI_INT, &buffer, 3, MPI_INT, 0, MPI_COMM_WORLD);
    if (rank == 0)
    {
        for (int i = 0; i < count * 3; i++)
        {
            printf("Soy el proceso %d (root) y he recibido: %d\n",rank, buffer[i]);
        }
    }

    MPI_Finalize();
}
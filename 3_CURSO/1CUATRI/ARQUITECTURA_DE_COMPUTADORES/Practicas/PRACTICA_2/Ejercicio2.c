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
    if (rank == 0)
    {
        for (int i = 1; i < count; i++)
        {
            MPI_Recv(&rcv, 1, MPI_INT, i, 100, MPI_COMM_WORLD, &status);
            printf("Soy el proceso 0 y he recibido %d del proceso %d\n", rcv, i);
        }
    }
    else
    {
        srand(time(0) + rank);
        rcv = rand() % 10;
        MPI_Send(&rcv, 1, MPI_INT, 0, 100, MPI_COMM_WORLD);
        printf("Soy el proceso %d y he inicializado la variable en : %d\n", rank, rcv);
    }

    MPI_Finalize();
}
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

int main(int argc, char **argv)
{

    int rank, size;

    MPI_Init(&argc, &argv);

    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    srand(time(NULL) + rank);

    int val = rand() % 2;
    int val2 = val * pow(2, rank);
    int recv = 0;
    int buff_recv[size];
    int buff_recv_bin[size];
    MPI_Allgather(&val2, 1, MPI_INT, &buff_recv, 1, MPI_INT, MPI_COMM_WORLD);
    MPI_Allgather(&val, 1, MPI_INT, &buff_recv_bin, 1, MPI_INT, MPI_COMM_WORLD);
    MPI_Reduce(&val2, &recv, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
    if (rank == 0)
    {
        for (int i = 0; i < size; i++)
        {
            printf("Bit from process %d: %d\n", i, buff_recv_bin[i]);
        }
        printf("Binary number: ");
        for (int i = size - 1; i >= 0; i--)
        {
            printf("%d", buff_recv_bin[i]);
        }
        printf("\nDecimal number: %d\n", recv);
    }
    MPI_Finalize();
}
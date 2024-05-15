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
    int array[size];
    int redSum[size];
    int allToall[size];
    int allGather[size];
    srand(time(NULL) + rank);
    int randAllGath = rand() % 10;

    printf("Sending number %d to process : %d through Allgather\n", randAllGath, rank);

    for (int i = 0; i < size; i++)
    {
        array[i] = i;
    }
    MPI_Reduce(&array, &redSum, size, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
    if (rank == 0)
    {
        for (int i = 0; i < size; i++)
        {
            printf("Reduce from process %d: %d\n", i, redSum[i]);
        }
    }
    MPI_Allgather(&randAllGath, 1, MPI_INT, &redSum, 1, MPI_INT, MPI_COMM_WORLD);
    if (rank == 0)
    {
        for (int i = 0; i < size; i++)
        {
            printf("Allgather from process %d: %d\n", i, redSum[i]);
        }
    }
    MPI_Alltoall(&array, 1, MPI_INT, &allToall, 1, MPI_INT, MPI_COMM_WORLD);

    for (int i = 0; i < size; i++)
    {
        printf("Alltoall from process %d: %d on iteration %d\n", rank, allToall[i],i);
    }
    MPI_Finalize();
}
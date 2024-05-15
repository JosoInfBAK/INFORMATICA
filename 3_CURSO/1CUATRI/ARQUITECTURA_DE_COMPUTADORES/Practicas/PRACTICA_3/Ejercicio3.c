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
    int recv2[count * 3];
    for (int i = 0; i < count*3; i++){
        buffer[i] = rank+1;
    }
    MPI_Reduce(&buffer, &recv, count*3, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
    MPI_Reduce(&buffer, &recv2, count*3, MPI_INT, MPI_PROD, 0, MPI_COMM_WORLD);
    if (rank == 0)
    {
            printf("Soy el proceso %d (root) y la suma es: %d\n",rank, recv[0]);
            printf("Soy el proceso %d (root) y la multiplicacion es: %d\n",rank, recv2[0]);
    }
   

    MPI_Finalize();
}

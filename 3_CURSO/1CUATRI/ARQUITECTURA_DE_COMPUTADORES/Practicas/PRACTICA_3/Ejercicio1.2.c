#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv)
{
    int rank, count, rcv;
   
    MPI_Status status;
    MPI_Init(&argc, &argv);

    MPI_Comm_size(MPI_COMM_WORLD, &count);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    char buffer[20];
      if (rank == 0)
    {
        printf("Mensaje a enviar desde root:\n");
        scanf("%s", buffer);
    }
    MPI_Bcast(&buffer, 20, MPI_CHAR, 0, MPI_COMM_WORLD);
    if (rank == 0)
    {
        printf("Soy el proceso %d y he enviado : %s\n", rank, buffer);
    }
    else
    {
        printf("Soy el proceso %d y he recibido el dato: %s\n", rank, buffer);
    }

    MPI_Finalize();
}

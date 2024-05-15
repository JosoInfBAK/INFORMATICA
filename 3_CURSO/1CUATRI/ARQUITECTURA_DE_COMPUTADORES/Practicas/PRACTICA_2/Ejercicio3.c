#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char *my_itoa(int num, char *str)
{
    if (str == NULL)
    {
        return NULL;
    }
    sprintf(str, "%d", num);
    return str;
}

int main(int argc, char **argv)
{
    int rank, count, rcv;
    char msg[20] = "";
    char init[200]="Hola en la iteracion:";
    char formatNum[20];
    int limit;
    int way = 1;
    int iter = 5;

    MPI_Status status;
    MPI_Init(&argc, &argv);

    MPI_Comm_size(MPI_COMM_WORLD, &count);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    for (int i = 1; i <= iter; i++)
    {
        if (rank == 0)
        {
        
            if (way == 1)
                MPI_Send(msg, 20, MPI_CHAR, 1, 100, MPI_COMM_WORLD);
            if (way == 0)
                MPI_Recv(&msg, 20, MPI_CHAR, 1, 100, MPI_COMM_WORLD, &status);
            printf("Soy el proceso 0 y he recibido %s del proceso 1 en iteracion %d \n", msg, i);
        }

        else if (rank == count - 1)
        {
            if (way == 0)
                MPI_Recv(&msg, 20, MPI_CHAR, rank - 1, 100, MPI_COMM_WORLD, &status);
            if (way == 1)
                MPI_Send(msg, 20, MPI_CHAR, rank - 1, 100, MPI_COMM_WORLD);
            printf("Soy el proceso %d y he recibido %s del proceso %d en iteracion %d\n", rank, msg, rank - 1, i);
        }
        else
        {
            if (way == 1)
            {
                MPI_Recv(&msg, 20, MPI_CHAR, rank - 1, 100, MPI_COMM_WORLD, &status);
                MPI_Send(msg, 20, MPI_CHAR, rank + 1, 100, MPI_COMM_WORLD);
                printf("Soy el proceso %d y he recibido %s del proceso %d en iteracion %d\n", rank, msg, rank - 1, i);
                way = 0;
            }
            else if (way == 0)
            {
                MPI_Recv(&msg, 20, MPI_CHAR, rank + 1, 100, MPI_COMM_WORLD, &status);
                MPI_Send(msg, 20, MPI_CHAR, rank - 1, 100, MPI_COMM_WORLD);
                printf("Soy el proceso %d y he recibido %s del proceso %d en iteracion %d\n", rank, msg, rank + 1, i);
                way = 1;
            }
        }
    }

    MPI_Finalize();
}


#include <stdio.h>
#include <mpi.h>

int main(int argc, char **argv)
{
    int nproc;
    int myrank;
    int datoInput;
    int contador = 0;
    MPI_Init(&argc, &argv);
    MPI_Comm_size(MPI_COMM_WORLD, &nproc);
    MPI_Comm_rank(MPI_COMM_WORLD, &myrank);
    if (myrank == 0)
    {
        printf("Intrduzca dato: ");
        scanf("%d", &datoInput);
        MPI_Send(&datoInput, 1, MPI_INT, (myrank + 1), myrank, MPI_COMM_WORLD);
    }

    do
    {
        if (myrank == 0)
        {
            MPI_Recv(&datoInput, 1, MPI_INT, nproc - 1, nproc - 1, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
            printf("(RECIBO)Proceso %d recibe dato : %d \n", myrank, datoInput);
            datoInput--;
        }
        else
        {
            if (datoInput != 1)
            {
                MPI_Recv(&datoInput, 1, MPI_INT, myrank - 1, myrank - 1, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
                printf("(RECIBO)Proceso %d recibe dato : %d \n", myrank, datoInput);
            }
            else
                break;
        }
        if (datoInput > 0)
        {
            if (myrank != nproc - 1)
            {
                MPI_Send(&datoInput, 1, MPI_INT, (myrank + 1), myrank, MPI_COMM_WORLD);
            }
            else
            {
                MPI_Send(&datoInput, 1, MPI_INT, 0, myrank, MPI_COMM_WORLD);
            }
        }
        else
            break;
    } while (datoInput >= 1);

    MPI_Finalize();
}
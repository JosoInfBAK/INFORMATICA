
#include <stdio.h>
#include <mpi.h>

int main(int argc, char** argv)
{
    int nproc;
    int myrank; 
    int datoInput;
    MPI_Init(&argc, &argv);
    MPI_Comm_size(MPI_COMM_WORLD, &nproc);
    MPI_Comm_rank(MPI_COMM_WORLD, &myrank);
    if(myrank == 0){
        printf("Intrduzca dato: ");
        scanf("%d",&datoInput);
        MPI_Send(&datoInput, 1, MPI_INT, (myrank + 1), myrank, MPI_COMM_WORLD);
    }else{
         MPI_Recv(&datoInput,1,MPI_INT,myrank-1,myrank-1,MPI_COMM_WORLD,MPI_STATUS_IGNORE);
         printf("Proceso %d recibe dato : %d \n",myrank,datoInput);
         if(myrank!=nproc-1) MPI_Send(&datoInput, 1, MPI_INT, (myrank + 1), myrank, MPI_COMM_WORLD);
    }
    MPI_Finalize();
}
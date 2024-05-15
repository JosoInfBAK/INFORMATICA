#include <mpi.h>
#include <stdio.h>


int main (int argc, char** argv) {

    int nproc;
    int myrank; 
    double start,finish,time;
    MPI_Init (&argc, &argv); 
    MPI_Barrier(MPI_COMM_WORLD);
    start = MPI_Wtime();
    MPI_Comm_size (MPI_COMM_WORLD, &nproc);
    MPI_Comm_rank (MPI_COMM_WORLD, &myrank); 
    MPI_Barrier(MPI_COMM_WORLD);
    finish = MPI_Wtime();
    time = finish-start;
    printf("Hola mundo, soy el proceso %d de un total de %d en %f tiempo.\n", myrank, nproc,time);
    MPI_Finalize();

}
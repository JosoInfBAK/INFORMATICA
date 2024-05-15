#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <assert.h>
#include <cuda.h>
#include <cuda_runtime.h>
#define N 10000000
#define MAX_ERR 1e-6

__global__ void vector_add(float *out, float *a, float *b, int n, unsigned int *Nth)
{
    int index = threadIdx.x;
    int stride = blockDim.x;
    Nth[0] = stride * gridDim.x;
    printf("Thread index: %d From block number: %d\n", index, blockIdx.x);
    for (int i = index; i < n; i += stride)
    {
        out[i] = a[i] + b[i];
    }
}
int main(int argc, char **argv)
{
    float *a, *b, *out;
    float *d_a, *d_b, *d_out;
    unsigned int *d_nth;
    int manBlockID;
    if (argc < 2)
    {
        printf("Utilizacion del programa : './ejecutable parametro'\nSiendo parametro :\n 0 : Numero de bloques = 10000000/256 (default) y 256 Hilos por bloque\n 1 : Entrada de Numero de bloques y numero de hilos por bloque manual\n");
        exit(0);
    }
    else
    {
        // Allocate host memory
        a = (float *)malloc(sizeof(float) * N);
        b = (float *)malloc(sizeof(float) * N);
        out = (float *)malloc(sizeof(float) * N);
        unsigned int *T_NThreads;
        int blockID;
        int nThreads;
        if (atoi(argv[1]) == 0)
        {
            blockID = N / 256;
            nThreads = 256;
        }
        else if (atoi(argv[1]) == 1)
        {
            printf("Ingrese el numero de bloques : ");
            scanf("%d", &manBlockID);
            blockID = manBlockID;
            printf("Ingrese el numero de hilos por bloque : ");
            scanf("%d", &nThreads);
        }
        else
        {
            printf("Parametro invalido\n");
            exit(0);
        }
        // Initialize host arrays
        for (int i = 0; i < N; i++)
        {
            a[i] = 1.0f;
            b[i] = 2.0f;
        }
        // Allocate device memory
        cudaMalloc((void **)&d_a, sizeof(float) * N);
        cudaMalloc((void **)&d_b, sizeof(float) * N);
        cudaMalloc((void **)&d_out, sizeof(float) * N);
        cudaMalloc((void **)&d_nth, sizeof(int));

        // Transfer data from host to device memory
        cudaMemcpy(d_a, a, sizeof(float) * N, cudaMemcpyHostToDevice);
        cudaMemcpy(d_b, b, sizeof(float) * N, cudaMemcpyHostToDevice);
        // Executing kernel
        vector_add<<<blockID, nThreads>>>(d_out, d_a, d_b, N, d_nth);
        // Transfer data back to host memory
        cudaMemcpy(out, d_out, sizeof(float) * N,
                   cudaMemcpyDeviceToHost);
        cudaMemcpy(&T_NThreads, d_nth, sizeof(int),
                   cudaMemcpyDeviceToHost);
        printf("Number of Blocks: %d \n", blockID);
        printf("Number of Threads per block: %d \n", nThreads);
        printf("Total number of threads: %x \n", T_NThreads[0]);
        // Verification
        for (int i = 0; i < N; i++)
        {
            assert(fabs(out[i] - a[i] - b[i]) < MAX_ERR);
        }
        printf("PASSED\n");
        // Deallocate device memory
        cudaFree(d_a);
        cudaFree(d_b);
        cudaFree(d_out);
        // Deallocate host memory
        free(a);
        free(b);
        free(out);
    }
}
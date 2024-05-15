#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <pthread.h>

pthread_t thread1, thread2, thmain;
pthread_attr_t attr;
int output[50];
pthread_mutex_t mutex;

void *pares(int *args)
{
    pthread_mutex_lock(&mutex);
    int inputRec = (int *)args;
    int res[inputRec];

    printf("CALCULO DE PARES POR HILO 2\n");

    for (int i = 1; i <= inputRec; i++)
    {
        if (i % 2 == 0)
        {
            res[i] = i * i;
            output[i] = i * i;
            printf("El cuadrado de %d es %d\n", i, res[i]);
        }
    }

    pthread_mutex_unlock(&mutex);
    pthread_exit(NULL);
}

void *impares(void *args)
{
    int inputRec = (int *)args;
    int res[inputRec];

    pthread_mutex_lock(&mutex);

    printf("CALCULO DE IMPARES POR HILO 1\n");
    for (int i = 1; i <= inputRec; i++)
    {
        if (i % 2 != 0)
        {
            res[i] = i * i;
            output[i] = i * i;
            printf("El cuadrado de %d es %d\n", i, res[i]);
        }
    }

    pthread_mutex_unlock(&mutex);
    pthread_exit(NULL);
}

int main(void)
{

    int input;
    thmain = pthread_self();
    pthread_attr_init(&attr);

    printf("Introduzca un numero: ");
    scanf("%d", &input);
    pthread_mutex_init(&mutex, NULL);

    pthread_create(&thread1, &attr, impares, (int *)input);
    pthread_create(&thread2, &attr, pares, (int *)input);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);

    /*COMPROBAR EL USO DE MEMORIA COMPARTIDA ENTRE HILOS
    for (int i = 0; i < sizeof(output)/sizeof(output[0]) ; i++)
   {
       if(output[i] != 0){
           printf("%d ", output[i]);
       }

   }*/

    printf("Programa terminado.");

    exit(0);
}
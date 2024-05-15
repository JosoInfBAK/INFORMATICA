#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <pthread.h>

pthread_t thread1, thread2, mainThread;
pthread_attr_t attr;

void *factorial(void *args)
{
    int *num = (int *)args;
    int fact = 1;
    int i = 1;
    for (i =1; i <= *num; i++)
    {
        fact = fact * i;
    }
    printf("Factorial de %d : %d \n", *num, fact);
    pthread_exit(NULL); /*Termina la ejecución del hilo una vez terminada su función*/
}

int main(void)
{
    int num1, num2;
    mainThread = pthread_self();
    pthread_attr_init(&attr);
    printf("Introduza primer numero a calcular factorial\n");
    scanf("%d", &num1);
    printf("Introduza segundo numero a calcular factorial\n");
    scanf("%d", &num2);
    pthread_create(&thread1, &attr, factorial, (void *)&num1);
    pthread_create(&thread2, &attr, factorial, (void *)&num2);
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    printf("Programa terminado.");

    exit(0);
}
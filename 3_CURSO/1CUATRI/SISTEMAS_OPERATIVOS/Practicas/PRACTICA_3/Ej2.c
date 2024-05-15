#include <pthread.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <time.h>
#include <semaphore.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>

sem_t semEmp;
sem_t semFull;
struct buffer *sharedBuff;

<<<<<<< HEAD
=======

>>>>>>> 9f3e5cab25b973b6610a718aa8e1a832f0f60b31
struct buffer
{
    int items[12];
    int maxsize;
    int front;
    int rear;
    int size;
};

struct buffer *newBuffer(int size)
{
    struct buffer *pt = NULL;
    pt = (struct buffer *)malloc(sizeof(struct buffer));
    pt->maxsize = size;
    pt->front = 0;
    pt->rear = -1;
    pt->size = 0;

    return pt;
}

void *enqueue(struct buffer *pt);
void *dequeue(struct buffer *pt);

void *enqueue(struct buffer *pt)
{
    int x, i;
    time_t t;
    srand(getpid() + time(&t));
<<<<<<< HEAD
    if (pt->size == 12)
    {
        printf("Overflow\n");
    }
    else
    {
        
        for (i = 0; i < 12; i++)
        {
            sem_wait(&sem);
            x = rand() % 11;
            printf("Producing %d\t", x);
            pt->rear = (pt->rear + 1);
            pt->items[pt->rear] = x;
            pt->size++;
            printf("front = %d, rear = %d %d \n", pt->front, pt->rear, pt->size);
            sem_post(&sem);
            sleep(1);
        }
        
=======
    for (i = 0; i < 12; i++)
    {
        sem_wait(&semEmp);
        printf("Producing %d ", i);
        pt->rear = (pt->rear + 1) % pt->maxsize;
        pt->items[pt->rear] = i;
        pt->size++;
        sem_post(&semFull);
        printf("front = %d, rear = %d\n", pt->front, pt->rear);
>>>>>>> 9f3e5cab25b973b6610a718aa8e1a832f0f60b31
    }
}

void *dequeue(struct buffer *pt)
{
    int i;
<<<<<<< HEAD
    if (pt->size == 0)
    {
        printf("Underflow\n");
    }

    else
    {

        for (i = 0; i < 12; i++)
        {
            sem_wait(&sem);
            printf("Consuming %d\t", pt->items[pt->front]);
            pt->front = (pt->front + 1) % pt->maxsize;
            pt->size--;
            printf("front = %d, rear = %d %d\n", pt->front, pt->rear, pt->size);
            sem_post(&sem);
            sleep(1);
        }
    }
    pthread_exit(NULL);
=======

        for (i = 0; i < pt->size-1; i++)
        {
            while(pt->items[i]!=0){
            sem_wait(&semFull);
            printf("Consuming %d\t", pt->items[i]);
            pt->front = (pt->front + 1) % pt->maxsize;
            pt->size--;
            pt->items[i] = 0;
            sem_post(&semEmp);
            printf("front = %d, rear = %d %d\n", pt->front, pt->rear, i);
            }
            
        }
>>>>>>> 9f3e5cab25b973b6610a718aa8e1a832f0f60b31
}

int main(int argc, char **argv)
{

    pthread_t thread1, thread2;

    sharedBuff = newBuffer(13);

    sem_init(&semEmp, 0, 12);
    sem_init(&semFull, 0, 0);

    pthread_create(&thread1, NULL, enqueue(sharedBuff), NULL);
    pthread_create(&thread2, NULL, dequeue(sharedBuff), NULL);
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
<<<<<<< HEAD
    sem_destroy(&sem);
=======

    exit(0);
>>>>>>> 9f3e5cab25b973b6610a718aa8e1a832f0f60b31
}
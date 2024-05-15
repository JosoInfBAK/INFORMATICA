#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <pthread.h>

#define MAXLON 1000

pthread_t thread1, mainThread;
pthread_attr_t attr;

void *cuenta(void *args)
{
    char *arg = (char *)args;
    int pos, cont = 0, leidos;
    char cadena[MAXLON];
    mode_t modo = S_IRWXU;
    int fd;

    if ((fd = open(arg, O_RDONLY, modo)) == -1)
    {
        perror("Error al abrir o crear el archivo");
    }
    else
    {

        while ((leidos = read(fd, cadena, MAXLON)) != 0)
        {
            for (pos = 0; pos < leidos; pos++)
            {
                if ((cadena[pos] == 'a') || (cadena[pos] == 'A'))
                {
                    cont++;
                }
            }
        }
        printf("Fichero %s: %d caracteres 'a' o 'A' encontrados\n", arg, cont);
        close(fd);
    }
    pthread_exit(NULL); /*Termina la ejecución del hilo una vez terminada su función*/
}

int main()
{
    mainThread = pthread_self();
    pthread_attr_init(&attr);
    pthread_create(&thread1, &attr, cuenta, "text.txt");
    pthread_join(thread1, NULL);
    exit(0);
}
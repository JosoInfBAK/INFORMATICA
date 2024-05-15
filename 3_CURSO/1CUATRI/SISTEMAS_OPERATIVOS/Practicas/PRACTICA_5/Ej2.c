#include <string.h>
#include <fcntl.h>
#include <stdlib.h>
#include <stdio.h>


char aux[1];

int main(int argc, char *argv[])
{
    int origen = open("origen", O_RDONLY | O_CREAT, 0644);
    int destino = open("destino", O_WRONLY | O_CREAT, 0644);
    int size = 0;
    if (origen == -1 || destino == -1)
    {
        perror("Error al abrir fichero");
        exit(1);
    }
    while (read(origen, aux, 1) != 0)
    {
        printf("%s", aux);
        write(destino, aux, 1);
    }
    close(origen);
    close(destino);
}

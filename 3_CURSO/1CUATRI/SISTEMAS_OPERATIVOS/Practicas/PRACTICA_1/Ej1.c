#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void)
{
    int fd, bytes_escritos;
    char buffer[100];
    mode_t modo = S_IRWXU;
    strcpy(buffer, "José María Fernández \nPablo Rayón Zapater"); // Cargamos la cadena a escribir en una variable en memoria

    if ((fd = open("ejemplo", O_RDWR | O_CREAT, modo)) == -1) // Llamada al sistema para que abra o cree un archivo, se produce el cambio de contexto de modo usuario a modo kernel
        perror("Error al abrir o crear el archivo");
    else
    {
        bytes_escritos = write(fd, buffer, strlen(buffer));
        return bytes_escritos;
    }
    close(fd);
    exit(0);
}
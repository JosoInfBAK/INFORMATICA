#include <string.h>
#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>

main(int argc, char *argv[])
{
        const char* cadena = malloc(sizeof(char)*20);

        int fichero = open("origen", O_CREAT | O_RDONLY, 0644);

        if (fichero == -1)
        {
            perror("Error al abrir fichero");
            exit(1);
        }
        pread(fichero, cadena,20,50);
        printf("%s", cadena);

        close(fichero);
        return 0;
}
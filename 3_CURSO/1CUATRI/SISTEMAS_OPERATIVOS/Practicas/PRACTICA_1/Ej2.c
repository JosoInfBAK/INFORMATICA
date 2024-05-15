#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <signal.h>
int main(void)
{
    pid_t pid1, pid2, wpid, f_pid;
    int status1, status2;
    int even[10], odds[10];
    int allNumbers[20];
    f_pid = getpid();
    printf("Proceso padre:%d\n", f_pid);
    // Primer hijo calcula los numeros pares
    if ((pid1 = fork()) == 0) // Comprobamos que el codigo de retorno del fork sea exitoso
    {
        for (int i = 0; i < 19; i++) // Pasamos los numeros de dos en dos para solo gestionar los pares
        {
            if (i % 2 == 0)
            {
                even[i] = i * i; // Cargamos el cuadrado cada dos posiciones para almacenar el resultado
            }
        }
        exit(0);
    }
    // Creamos el segundo proceso hijo
    if ((pid2 = fork()) == 0) // Comprobamos que el codigo de retorno del fork sea exitoso
    {
        for (int j = 1; j <= 19; j++) // Hacemos lo mismo que en el proceso previo pero empezando en1 para calcular los impares
        {
            if (j % 2 != 0)
            {
                odds[j] = j * j; // Cargamos el cuadrado cada dos posiciones para almacenar el resultado
            }
        }
        exit(0);
    }
    if (getpid() == f_pid)
    {
        waitpid(-1, &status1, 0);
        if (WIFEXITED(status1)) {
            for (int k = 0; k <= 19; k++)
        {
            if (k % 2 == 0)
            {
                allNumbers[k] = even[k / 2];
            }
            else
            {
                allNumbers[k] = odds[k / 2];
            }
            printf("%d\n", allNumbers[k]);
        }

        }
        
    }
}
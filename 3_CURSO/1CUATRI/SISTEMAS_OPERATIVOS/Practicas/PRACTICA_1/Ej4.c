#include <sys/types.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[])
{

    int num;
    pid_t pid, pidLv2N1, pidLv2N2, pidLv2N3, pidLv3N1, pidLv3N2, pidLv3N3,pidLv4N3;
    pid_t pidsLv1[4], pidsLv2N1[3], pidsLv2N2[2], pidsLv2N3[1], pidsLv3N1[2], pidsLv3N2[1], pidsLv3N3[1],pidsLv4N3[1];
    int status, wpid;

    printf("Padre Absoluto:%d\n", getpid());
    for (int lv1 = 0; lv1 < 4; lv1++) // Creamos cuatro nodos hijos del proceso padre
    {
        pid = fork();
        pidsLv1[lv1] = getpid();
        if (pid == 0)
        {
            printf("Hijo Nivel 1 : %d , Padre : %d\n", getpid(), getppid());
            break;
        }
    }
    // Tratando hijos del proceso padre
    if (pid == 0)
    {
        // Creando Hijos del  Primer nodo hijo del nivel 2
        if (getpid() == pidsLv1[0])
        {
            for (int lv2 = 0; lv2 < 3; lv2++)
            {
                pidLv2N1 = fork();
                pidsLv2N1[lv2] = getpid();
                if (pidLv2N1 == 0)
                {
                    printf("Hijo Nivel 2 : %d , Padre : %d\n", getpid(), getppid());
                    break;
                }
            }
        }
        // Creando Hijos del Segundo nodo hijo del nivel 2
        if (getpid() == pidsLv1[1])
        {
            for (int lv3 = 0; lv3 < 2; lv3++)
            {
                pidLv2N2 = fork();
                pidsLv2N2[lv3] = getpid();
                if (pidLv2N2 == 0)
                {
                    printf("Hijo Nivel 2 : %d , Padre : %d\n", getpid(), getppid());
                    break;
                }
            }
        }
        // Creando Hijos del tercer nodo hijo nivel 2
        if (getpid() == pidsLv1[2])
        {
            pidLv2N3 = fork();
            pidsLv2N3[0] = getpid();
            if (pidLv2N3 == 0)
            {
                printf("Hijo Nivel 2 : %d , Padre : %d\n", getpid(), getppid());
            }
        }
        // Tratando Hijos del primer nodo del segundo nivel
        if (pidLv2N1 == 0)
        {

            // Creando Hijos del primer nodo hijo de nivel 3
            if (getpid() == pidsLv2N1[0])
            {
                for (int lv3n1 = 0; lv3n1 < 2; lv3n1++)
                {
                    pidLv3N1 = fork();
                    pidsLv3N1[lv3n1] = getpid();
                    if (pidLv3N1 == 0)
                    {
                        printf("Hijo Nivel 3 : %d , Padre : %d\n", getpid(), getppid());
                    }
                }
            }
            // Hijo del segundo nodo hijo de nivel 3
            if (getpid() == pidsLv2N1[1])
            {
                pidLv3N2 = fork();
                pidsLv3N2[0] = getpid();
                if (pidLv3N2 == 0)
                {
                    printf("Hijo Nivel 3 : %d , Padre : %d\n", getpid(), getppid());
                }
            }
            if(getpid() ==pidsLv2N2[0]){
                pidLv3N3= fork();
                pidsLv3N3[0] = getpid();
                if (pidLv3N3 == 0)
                {
                    printf("Hijo Nivel 3 : %d , Padre : %d\n", getpid(), getppid());
                }

            }
        }
        if (pidLv2N2 == 0)
        {
            if (getpid() == pidsLv2N2[1])
            {
                pidLv4N3 = fork();
                pidsLv4N3[0] = getpid();
                if (pidLv4N3 == 0)
                {
                    printf("Hijo Nivel 4 : %d , Padre : %d\n", getpid(), getppid());
                }
            }
        }
    }

    return 0;
}
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define SIZE 512

int main(int argc, char **argv)
{
    pid_t pid;
    int p[2],b[2], readbytes;
    char buffer[SIZE];
    int send;
    (void)argc;
    (void)argv;

    pipe(p);
    pipe(b);
    if ((pid = fork()) == 0)
    {
        close(p[0]);
        close(b[1]);
        srand(getpid());
        send = rand() % 11;
        sprintf(buffer + strlen(buffer), "Esto llega a través de la tuberia %d\n", send);
        write(p[1], buffer, strlen(buffer));

        close(p[1]);
        close(b[1]);  
    }
    else
    {
        close(p[1]);
        close(b[0]);

        while ((readbytes = read(p[0], buffer, SIZE)) > 0)
            write(1, buffer, readbytes);
            printf("Soy el hijo y %s\n", buffer);
        close(p[0]);
        close(b[1]);
        
    }
    waitpid(pid, NULL, 0);

    return 0;
}

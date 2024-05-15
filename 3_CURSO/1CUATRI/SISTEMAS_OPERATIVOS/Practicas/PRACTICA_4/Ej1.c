#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <pthread.h>
#include <sys/wait.h>

int main(int argc, char **argv)
{
    pid_t pid1, pid2, pid3;
    int pipe1[2];
    mode_t modo = S_IRWXU;
    int checkP1 = pipe(pipe1);
    if (checkP1 == -1)
    {
        perror("Error al crear el pipe");
        exit(1);
    }

    if (pid1 == fork() == 0)
    {
        dup2(pipe1[1], STDOUT_FILENO);
        int succ = execlp("/usr/bin/grep", "grep", "-o", argv[1], argv[2], NULL);
        close(pipe1[0]);
        close(pipe1[1]);
        exit(0);
    }
    if (pid2 == fork() == 0)
    {
        dup2(pipe1[1], STDOUT_FILENO);
        int succ = execlp("/usr/bin/grep", "grep", "-o", argv[1], argv[3], NULL);
        close(pipe1[0]);
        close(pipe1[1]);
        exit(0);
    }
    if (pid3 == fork() == 0)
    {
        int fd = open(argv[4], O_RDWR | O_CREAT | O_TRUNC, modo);
        dup2(fd, STDOUT_FILENO);
        int checkw = write(fd, "El numero de coincidencias es : ", 32);
        waitpid(pid1, NULL, 0);
        waitpid(pid2, NULL, 0);

        dup2(pipe1[0], STDIN_FILENO);
        close(pipe1[0]);
        close(pipe1[1]);
        int match1 = execlp("/usr/bin/wc", "wc", "-l", NULL);
        exit(0);
    }
    exit(0);
}
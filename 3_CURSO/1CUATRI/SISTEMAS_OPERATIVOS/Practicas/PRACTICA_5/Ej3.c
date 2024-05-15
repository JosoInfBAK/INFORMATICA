<<<<<<< HEAD
#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <dirent.h>

int main(int argc, char *argv[])
{

    DIR *dir = opendir("a");
    if (dir == NULL) {
        perror("Error al abrir el directorio");
        return 1;
    }

    size_t total_bytes = 0;

    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        struct stat info;
        if (stat(entry->d_name, &info) == 0) {

            if (S_ISREG(info.st_mode)) {
                total_bytes += info.st_size;
            }
        }
    }

    closedir(dir);
    printf("Tamaño total en bytes: %zu\n", total_bytes);

=======
#include <string.h>
#include <fcntl.h>
#include <stdlib.h>
#include <stdio.h>
#include <dirent.h>
#include <sys/types.h>
#include <unistd.h>
#include <sys/stat.h>
//https://helloacm.com/c-function-to-run-external-command-and-capture-the-output/

#define LINE_MAX_BUFFER_SIZE 255
int runExternalCommand(char *cmd, char lines[][LINE_MAX_BUFFER_SIZE])
{
    FILE *fp;
    char path[LINE_MAX_BUFFER_SIZE];

    /* Open the command for reading. */
    fp = popen(cmd, "r");
    if (fp == NULL)
    {
        return -1;
    }

    int cnt = 0;
    while (fgets(path, sizeof(path), fp) != NULL)
    {
        strcpy(lines[cnt++], path);
    }
    pclose(fp);
    return cnt;
}

int main(int argc, char *argv[])
{
    int totalSize = 0;
    char *cmdSize[255];
    char *cmdName[255];
    char *cmdPerm[255];
    struct stat st;
    char size[100][LINE_MAX_BUFFER_SIZE];
    char name[100][LINE_MAX_BUFFER_SIZE];
    char perm[100][LINE_MAX_BUFFER_SIZE];
    stat(argv[1], &st);
    sprintf(cmdSize, "ls -l %s | awk '{print $5}'", argv[1]);
    sprintf(cmdName, "ls -l %s | awk '{print $9}'", argv[1]);
    sprintf(cmdPerm, "ls -l %s | awk '{print $1}'", argv[1]);
    int a = runExternalCommand(cmdSize, size);
    int b = runExternalCommand(cmdName, name);
    int c = runExternalCommand(cmdPerm, perm);
    for (int i = 0; i < a; ++i)
    {
        printf("File:%sWith size:%sHas the following permissions: %s", name[i], size[i], perm[i]);
        if(perm[i][0] == 'd'){
            printf("This is a directory\n");
        }
        if(perm[i][0] == 'l'){
            printf("This is a link\n");
        }
        printf("====================================\n");
        totalSize += atoi(size[i]);
    }
    printf("================Global directory info====================\n");
    printf("File inode: %d\n", st.st_ino);
    printf("Numero de enlaces: %d\n", st.st_nlink);
    printf("Total size: %d Bytes", totalSize);
    printf(" = %d KB", totalSize / 1000);
>>>>>>> fb57f0e66bad8fccfeb1418a28fb8fd630fa3f74
    return 0;
}
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stddef.h>
#include <stdbool.h>
#include <math.h>

//function to calculate the hex value of a decimal number
char * dectoHex(int decimal){

    char * hex = malloc(sizeof(char)*2) ;
    int i=0, rem;
    while(decimal!=0){
        rem= decimal%16;
        if(rem<10){
            hex[i]=rem+48;
            i++;
        }else{
            hex[i]=rem+55;
            i++;
        }
        decimal=decimal/16;
    }

    return hex;
}


int main(int argc, char **argv){

    char * hex= dectoHex(3);
    char * formatedHex = hex[1];
    strcat(formatedHex, hex[0]);
    printf("%s", formatedHex); 
    return 0;
}
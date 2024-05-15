/*
 * File:   main.c
 * Author: josoj
 *
 * Created on 22 de diciembre de 2022, 20:35
 */
#pragma config BWRP = WRPROTECT_OFF     // Boot Segment Write Protect (Boot Segment may be written)
#pragma config BSS = NO_FLASH           // Boot Segment Program Flash Code Protection (No Boot program Flash segment)

// FGS
#pragma config GWRP = OFF               // General Code Segment Write Protect (User program memory is not write-protected)
#pragma config GSS = OFF                // General Segment Code Protection (User program memory is not code-protected)

// FOSCSEL
#pragma config FNOSC = PRIPLL           // Oscillator Mode (Primary Oscillator (XT, HS, EC) w/ PLL)
#pragma config IESO = ON                // Internal External Switch Over Mode (Start-up device with FRC, then automatically switch to user-selected oscillator source when ready)

// FOSC
#pragma config POSCMD = EC              // Primary Oscillator Source (EC Oscillator Mode)
#pragma config OSCIOFNC = OFF           // OSC2 Pin Function (OSC2 pin has clock out function)
#pragma config IOL1WAY = OFF            // Peripheral Pin Select Configuration (Allow Multiple Re-configurations)
#pragma config FCKSM = CSDCMD           // Clock Switching and Monitor (Both Clock Switching and Fail-Safe Clock Monitor are disabled)

// FWDT
#pragma config WDTPOST = PS32768        // Watchdog Timer Postscaler (1:32,768)
#pragma config WDTPRE = PR128           // WDT Prescaler (1:128)
#pragma config WINDIS = OFF             // Watchdog Timer Window (Watchdog Timer in Non-Window mode)
#pragma config FWDTEN = ON              // Watchdog Timer Enable (Watchdog timer always enabled)

// FPOR
#pragma config FPWRT = PWR128           // POR Timer Value (128ms)
#pragma config ALTI2C = OFF             // Alternate I2C  pins (I2C mapped to SDA1/SCL1 pins)
#pragma config LPOL = ON                // Motor Control PWM Low Side Polarity bit (PWM module low side output pins have active-high output polarity)
#pragma config HPOL = ON                // Motor Control PWM High Side Polarity bit (PWM module high side output pins have active-high output polarity)
#pragma config PWMPIN = ON              // Motor Control PWM Module Pin Mode bit (PWM module pins controlled by PORT register at device Reset)

// FICD
#pragma config ICS = PGD1               // Comm Channel Select (Communicate on PGC1/EMUC1 and PGD1/EMUD1)
#pragma config JTAGEN = OFF             // JTAG Port Enable (JTAG is Disabled)

// #pragma config statements should precede project file includes.
// Use project enums instead of #define for ON and OFF.

#include <xc.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stddef.h>
#include <stdbool.h>
#include <math.h>

#define baud_9600  1041
char txbuffer[200];
unsigned char memRead;
int bytesCargadosM1[64];
int bytesLeidosM1[64];
int bytesCargadosM2[64];
int bytesLeidosM2[64];
int sel = 0;

void uart_config(unsigned int baud) {
    //Interface uart (tx/rx)
    TRISBbits.TRISB3 = 1;
    TRISBbits.TRISB2 = 0;
    RPOR1bits.RP2R = 3; //U1TX conetada al pin RP2 (RB2)
    RPINR18bits.U1RXR = 3; //U1RX conectada al pin RP3 (RB3)

    //mode
    U1MODEbits.UARTEN = 0;
    U1MODEbits.USIDL = 0;
    U1MODEbits.IREN = 0;
    U1MODEbits.RTSMD = 1;
    U1MODEbits.UEN = 0;
    U1MODEbits.WAKE = 0;
    U1MODEbits.LPBACK = 0;
    U1MODEbits.ABAUD = 0;
    U1MODEbits.URXINV = 0;
    U1MODEbits.BRGH = 1;
    U1MODEbits.PDSEL = 0;
    U1MODEbits.STSEL = 0;
    //status
    U1STAbits.UTXISEL0 = 0;
    U1STAbits.UTXISEL1 = 0;
    U1STAbits.URXISEL = 0;
    U1STAbits.UTXINV = 0;
    U1STAbits.UTXBRK = 0;
    U1STAbits.UTXEN = 1;
    U1STAbits.ADDEN = 0;
    U1STAbits.OERR = 0;

    //baudios
    U1BRG = baud;
    IPC2bits.U1RXIP = 5;
    IFS0bits.U1RXIF = 0;
    IEC0bits.U1RXIE = 1;

    // Tx
    IPC3bits.U1TXIP = 5;
    IFS0bits.U1TXIF = 0;
    IEC0bits.U1TXIE = 0;

    U1MODEbits.UARTEN = 1;
}

void spi_config(void) {

    //Configuración de pines SPI
    TRISCbits.TRISC0 = 1; //MISO asignado a RC0 (PIN 25), funciona como un pin de entrada por eso esta a 1
    //el resto de pines como son generados como master son salidas
    TRISCbits.TRISC1 = 0; //MOSI asignado a RC1 (PIN 26)
    TRISCbits.TRISC2 = 0; //SCK asignado a RC2C(PIN 27)
    TRISCbits.TRISC3 = 0; //CS asignado a RC3 (PIN 36)

    LATCbits.LATC1 = 0;

    //aqui se remapea (los valores que pongo son los que me ofrece el fabricante)
    RPINR20bits.SDI1R = 16; //RC0 trabajando como MISO (entrada)
    RPOR8bits.RP17R = 7; //(00111);    RC1 es MOSI (salida)
    RPOR9bits.RP18R = 8; //(01000);    RC2 es SCK (salida)

    //Configuración SPISTAT
    SPI1STATbits.SPIEN = 0;
    SPI1STATbits.SPISIDL = 0;
    SPI1STATbits.SPIROV = 0;
    SPI1STATbits.SPITBF = 0;
    SPI1STATbits.SPIRBF = 0;

    //Configuración SPICON1
    SPI1CON1bits.DISSCK = 0;
    SPI1CON1bits.DISSDO = 0;
    SPI1CON1bits.MODE16 = 0; //el spi puede hacer transferencias en una sola tanda de 16 bits y sino la establecemos se hacen transferencias de 8 bits
    SPI1CON1bits.SMP = 0;

    SPI1CON1bits.CKP = 0; //SPI MODE 1
    SPI1CON1bits.CKE = 0;

    SPI1CON1bits.SSEN = 0; //Hardware SS not used
    SPI1CON1bits.MSTEN = 1; //Master mode

    SPI1CON1bits.PPRE = 1; //1:1
    SPI1CON1bits.SPRE = 6; //2:1  //Fspi = Fcpu/2 = 1MHz/1Mbps

    //Configuración SPICON2 Framed Mode Disabled
    SPI1CON2bits.FRMEN = 0;
    SPI1CON2bits.SPIFSD = 0;
    SPI1CON2bits.FRMPOL = 0;
    SPI1CON2bits.FRMDLY = 0;

    //SPI Interrupciones
    IFS0bits.SPI1IF = 0;
    IFS0bits.SPI1EIF = 0;
    IEC0bits.SPI1IE = 0;
    IEC0bits.SPI1EIE = 0;
    IPC2bits.SPI1EIP = 6;
    IPC2bits.SPI1EIP = 6;

    LATCbits.LATC3 = 1;
    SPI1STATbits.SPIEN = 1;

}

void uart_send_byte(char c) {
    while (U1STAbits.UTXBF); //mientras el buffer no este lleno
    U1TXREG = c;
}

void uart_send_string(char *s) {
    while ((*s) != '\0') {
        uart_send_byte(*(s++));
    }
}

void delay_ms(unsigned long time_ms) {
    unsigned long u;
    for (u = 0; u < time_ms * 200; u++) {
        asm("NOP");
    }
}

unsigned char spi_write(unsigned char data) {
    while (SPI1STATbits.SPITBF);
    SPI1BUF = data;
    while (!SPI1STATbits.SPIRBF); //Esperamos a recibir el sitio de vuelta
    return SPI1BUF;
}

void sort(int arr[], int n) {
    int i, j;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int arrays_equal(int arr1[], int arr2[], int n, int m) {
    sort(arr1, n);
    sort(arr2, m);
    int i, res;
    for (i = 0; i < n; i++) {
        if (arr1[i] != arr2[i]) {
            res = 0;
        } else res = 1;
    }
    return res;

}

void write_mem(int sel) {
    sprintf(txbuffer, "============ ESCRIBIENDO EN MEMORIA %d ==============\r\n", sel + 1);
    uart_send_string(txbuffer);
    delay_ms(500);
    for (int i = 0; i < 64; i++) {
        LATCbits.LATC3 = sel;
        delay_ms(5);
        spi_write(0x06);
        delay_ms(5);
        LATCbits.LATC3 = !sel;
        LATCbits.LATC3 = sel;
        delay_ms(5);
        spi_write(0x02); //Write
        spi_write(0x00); //MSB MEM
        spi_write(i); //LSB MEM
        spi_write(i); //DATA
        if (sel == 0)bytesCargadosM1[i] = i;
        else bytesCargadosM2[i] = i;
        delay_ms(5);
        LATCbits.LATC3 = !sel;
        sprintf(txbuffer, "Escrito en memoria %d 0x%02X en direccion = 0x%02X \r\n", sel + 1, i, i);
        uart_send_string(txbuffer);
        LATCbits.LATC3 = sel;
        delay_ms(5);
        spi_write(0x04); //DISABLE WRITING
        delay_ms(5);
        LATCbits.LATC3 = !sel;
        delay_ms(100);
    }
    sprintf(txbuffer, "============ Pagina completa escrita en memoria %d ==============\r\n", sel + 1);
    uart_send_string(txbuffer);
    delay_ms(2000);

}

void read_mem(int sel) {
    //----------------------- Lectura -----------------------------
    sprintf(txbuffer, "============ LEYENDO MEMORIA %d ==============\r\n", sel + 1);
    delay_ms(500);
    uart_send_string(txbuffer);
    for (int i = 0; i < 64; i++) {
        LATCbits.LATC3 = sel;
        delay_ms(5);
        spi_write(0x03); //Read
        spi_write(0x00); //MSB MEB
        spi_write(i); //LSB MEM
        memRead = spi_write(0x00);
        delay_ms(5);
        LATCbits.LATC3 = !sel;
        delay_ms(5);
        if (sel == 0)bytesLeidosM1[i] = memRead;
        else bytesLeidosM2[i] = memRead;
        sprintf(txbuffer, "Dato en memoria %d 0x%02X, Adress = 0x%02X \r\n", sel + 1, memRead, i);
        uart_send_string(txbuffer);
        delay_ms(100);
    }
    sprintf(txbuffer, "============ Pagina completa leida de memoria %d ==============\r\n", sel + 1);
    uart_send_string(txbuffer);
    delay_ms(2000);

}

void check_mem(int sel) {
    sprintf(txbuffer, "============ Comprobacion de valores en memoria %d ==============\r\n", sel + 1);
    uart_send_string(txbuffer);
    if (sel == 0) {
        if (arrays_equal(bytesLeidosM1, bytesCargadosM1, 64, 64) == 1) {
            sprintf(txbuffer, "============ Bytes cargados correctamente en memoria 1 ==============\r\n");
        } else {
            sprintf(txbuffer, "============ !ERROR EN LA CARGA DE DATOS EN MEMORIA 1 ==============\r\n");
        }
    } else {
        if (arrays_equal(bytesLeidosM2, bytesCargadosM2, 64, 64) == 1) {
            sprintf(txbuffer, "============ Bytes cargados correctamente en memoria 2 ==============\r\n");
        } else {
            sprintf(txbuffer, "============ !ERROR EN LA CARGA DE DATOS EN MEMORIA 2 ==============\r\n");
        }
    }
    uart_send_string(txbuffer);
    delay_ms(2000);

}

int main(void) {
    PLLFBD = 38; //M  = PLLFBD 
    CLKDIVbits.PLLPOST = 0; //N1 = PLLPOST + 2
    CLKDIVbits.PLLPRE = 0; //N1 = PLLPOST + 2
    while (OSCCONbits.LOCK != 1);
    AD1PCFGL = 0xFFFF; // Todos los pines configurados como pines digitales
    uart_config(baud_9600);
    spi_config();
    INTCON1bits.NSTDIS = 0; //Interrupt nesting enable
    SRbits.IPL = 0; //enable global interrupts
    delay_ms(1000);

    while (1) {
        write_mem(sel);
        read_mem(sel);
        check_mem(sel);
        sel = !sel;
    }
}

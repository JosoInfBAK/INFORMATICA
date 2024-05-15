/*
 * File:   main.c
 * Author: nicks
 *
 * Created on 3 de noviembre de 2022, 9:00
 */

// DSPIC33FJ32MC204 Configuration Bit Settings

// 'C' source line config statements

// FBS
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

#define baud_9600    1041 

unsigned char received_char = 0;
char dataCMD_ISR[50];
char txbuffer[200];


unsigned char time_count = 0;
unsigned char change_led_state = 0;



// Modulo Uart. Variables empleando ISR
char txbuffer_ISR[200];
unsigned int nextchar = 0;
unsigned char BufferLoadDone = 1;

unsigned int U1_PrintRate_ISR = 0;
unsigned int contador = 0;




//SPI VAR
unsigned char memory_data;
unsigned char data = 0;

void delay_ms(unsigned long time_ms) {
    unsigned long u;
    for (u = 0; u < time_ms * 90; u++) // Cálculo aproximado para una CPU a 2MHz
    {
        asm("NOP");
    }
}

void EnviarCaracter(char c) {
    while (U1STAbits.UTXBF); //mientras el buffer no este lleno
    U1TXREG = c;
}

void EnviarString(char *s) {
    while ((*s) != '\0') {
        EnviarCaracter(*(s++));
    }
}

void uart_config(unsigned int baud) {
    //    // Configuración de pines tx y rx
    //    TRISCbits.TRISC0  = 1;   // Pin de recepcion de uart establecido como entrada.
    //    RPINR18bits.U1RXR = 16;  // pin de recepcion rc0 trabajando con el modulo uart (RP16)
    //    RPOR8bits.RP17R   = 3;   // U1TX conectado con el pin RC1 (RP17)

    TRISCbits.TRISC4 = 1; // Pin de recepcion de uart establecido como entrada.
    RPINR18bits.U1RXR = 20; // pin de recepcion rc0 trabajando con el modulo uart (RP16)
    RPOR10bits.RP21R = 3; // U1TX conectado con el pin RC1 (RP17)



    // Configuración de registro de U1MODE
    U1MODEbits.UARTEN = 0; // Deshabilitar Uart.
    U1MODEbits.USIDL = 0; // Continuar operación en modo IDLE
    U1MODEbits.IREN = 0; // IR no usado
    U1MODEbits.RTSMD = 1; // Control de flujo desactivado.
    U1MODEbits.UEN = 0; // Solo usamos pin de Tx y pin de Rx
    U1MODEbits.WAKE = 1; // No quiero que la UART despierte del modo sleep
    U1MODEbits.LPBACK = 0; // Loopback deshabilitado.
    U1MODEbits.ABAUD = 0; // Automedición de baudios (bps) deshabilidada
    U1MODEbits.URXINV = 0; // En estado de reposo, el receptor mantiene un estado alto, high
    U1MODEbits.BRGH = 1; // Modo High-Speed
    U1MODEbits.PDSEL = 0; // 8 Bits de datos y paridad Nula (8N)
    U1MODEbits.STSEL = 0; // 1-bit de stop al final de la trama de datos.   (8N1)


    // Configuración de registro de U1STA


    U1STAbits.UTXISEL0 = 0; // Tema interrupciones (no mirar aun)
    U1STAbits.UTXISEL1 = 0; // Tema interrupciones (no mirar aun)


    U1STAbits.UTXINV = 0; // El estado en reposo del pin de transmisión es High
    U1STAbits.UTXBRK = 0; // No usamos trama de sincronización
    U1STAbits.UTXEN = 1; // El transmisor a pleno funcionamiento.
    U1STAbits.URXISEL = 0; // Tema interrupciones (no mirar aun)
    U1STAbits.ADDEN = 0; // No usamos direccionamiento.
    //U1STAbits.RIDLE    = 0;
    U1STAbits.OERR = 0; // Reseteamos buffer de recepción


    // Configuramos la velocidad de transmisión/recepcción de los datos
    U1BRG = baud;


    // Prioridades, flags e interrupciones correspondientes a la Uart
    IPC2bits.U1RXIP = 6; // U1RX con nivel de prioridad 6 (7 es el maximo)
    IFS0bits.U1RXIF = 0; // Reset Rx Interrupt flag
    IEC0bits.U1RXIE = 1; // Enable Rx interrupts


    IPC3bits.U1TXIP = 5; // U1TX con nivel de prioridad 6 (7 es el maximo)
    IFS0bits.U1TXIF = 0; // Reset Tx Interrupt flag
    IEC0bits.U1TXIE = 0; // Enable Tx interrupts


    U1MODEbits.UARTEN = 1; // Uart habilitada por completo
}

void spi_config(void) {
    TRISCbits.TRISC0 = 1; //MISO asignado a RC0 (PIN 25), funciona como un pin de entrada por eso esta a 1
    //el resto de pines como son generados como master son salidas
    TRISCbits.TRISC1 = 0; //MOSI asignado a RC1 (PIN 26)
    TRISCbits.TRISC2 = 0; //SCK asignado a RC2C(PIN 27)
    TRISCbits.TRISC3 = 0; //CS asignado a RC3 (PIN 36)
    TRISCbits.TRISC6 = 0; // CS   asignado a RC6 (PIN 2)

    LATCbits.LATC1 = 0;

    RPINR20bits.SDI1R = 16; // RC0 trabajando como MISO (entrada)     
    RPOR8bits.RP17R = 7; // (00111);     RC1 es MOSI (salida)  
    RPOR9bits.RP18R = 8; // (01000);     RC2 es SCK  (salida)  



    //Configuracion SPISTAT
    SPI1STATbits.SPIEN = 0;
    SPI1STATbits.SPISIDL = 0;
    SPI1STATbits.SPIROV = 0;
    SPI1STATbits.SPITBF = 0;
    SPI1STATbits.SPIRBF = 0;

    //Configuracion SPICON1

    SPI1CON1bits.DISSCK = 0;
    SPI1CON1bits.DISSDO = 0;
    SPI1CON1bits.MODE16 = 0;
    SPI1CON1bits.SMP = 0;


    SPI1CON1bits.CKP = 0; // SPI MODE 1
    SPI1CON1bits.CKE = 0;

    SPI1CON1bits.SSEN = 0; // HARDWARE SS NOT USED
    SPI1CON1bits.MSTEN = 1; // MASTER MODE

    // Probad esta configuración de prescalers para generar las frecuencias
    // mostradas en comentarios
    SPI1CON1bits.PPRE = 1; // 4:1   // Fspi = Fcpu/4  = 2MHz/4= 500KHz/500 Kbps  (Periodo de reloj de 2us) 
    SPI1CON1bits.SPRE = 6; // 1:1   // Fspi = = 500KHz/500 Kbps      


    //Configuración SPICON2. Framed Mode Disabled
    SPI1CON2bits.FRMEN = 0;
    SPI1CON2bits.SPIFSD = 0;
    SPI1CON2bits.FRMPOL = 0;
    SPI1CON2bits.FRMDLY = 0;


    // SPI Interrupts
    IFS0bits.SPI1IF = 0;
    IFS0bits.SPI1EIF = 0;
    IEC0bits.SPI1IE = 0;
    IEC0bits.SPI1EIE = 0;
    IPC2bits.SPI1IP = 6;
    IPC2bits.SPI1EIP = 6;

    LATCbits.LATC3 = 1;
    //LATCbits.LATC6 = 1;
    SPI1STATbits.SPIEN = 1;
}

unsigned char spi_write(unsigned char data) {
    while (SPI1STATbits.SPITBF); // Esperamos a que el buffer de transmisión este vacio
    SPI1BUF = data; // Cargamos dato al buffer 
    while (!SPI1STATbits.SPIRBF); // Esperamos a recibir el dato de vuelta. Basicamente esperamos a que el SPI muestree durante 8 ciclos de reloj (sck) 

    return SPI1BUF;
}

int main(void) {


    //Configurar los divisores del PLL para hacer funcionar la CPU a 2 MHz a partir de un reloj de entrada de 8MHz (PROTEUS)
    //Fosc = Fin * M/(N1 * N2), Fcy = Fosc/2
    //Fosc = 8M * 2/(2 * 2) = 4 MHz para un reloj de 8MHz de entrada
    //Fcy = Fosc/2 = 4/2 = 2MHz (Frecuencia CPU)
    PLLFBD = 38; // M  = 2
    CLKDIVbits.PLLPOST = 0; // N1 = 2
    CLKDIVbits.PLLPRE = 0; // N2 = 2
    while (OSCCONbits.LOCK != 1); // Esperar a un PLL estable   



    AD1PCFGL = 0xFFFF; // Primer paso. Todos los pines configurados como pines digitales
    TRISAbits.TRISA0 = 0;
    TRISBbits.TRISB3 = 0;
    LATAbits.LATA0 = 0;
    LATBbits.LATB3 = 0;

    uart_config(baud_9600);
    spi_config();



    /* Habilitar Interrupciones Globales */
    INTCON1bits.NSTDIS = 0; //Interrupt nesting enable
    SRbits.IPL = 0; //enable global interrupts
    delay_ms(1000);

    /*****************************-*/




    while (1) {
        sprintf(txbuffer, "INICIANDO ESCRITURA/LECTURA MEMORIA EEPROM");
        EnviarString(txbuffer);
        LATCbits.LATC3 = 0; // Chip Select a cero. Vamos a comenzar una nueva transmisión
        delay_ms(5); // Delay para dar tiempo a estabilizar la señal de chip select a cero antes de tranmisitir

        spi_write(0x06); // Write enable command

        delay_ms(5); // Delay para dar tiempo a estabilizar la señal de chip select a cero antes de tranmisitir
        LATCbits.LATC3 = 1; // Chip Select a cero. Vamos a comenzar una nueva transmisión
        LATCbits.LATC6 = 0; // Chip Select a cero. Vamos a comenzar una nueva transmisión
        delay_ms(5); // Delay para dar tiempo a estabilizar la señal de chip select a cero antes de tranmisitir

        spi_write(0x06); // Write enable command

        delay_ms(5); // Delay para dar tiempo a estabilizar la señal de chip select a cero antes de tranmisitir
        LATCbits.LATC6 = 1; // Chip Select a cero. Vamos a comenzar una nueva transmisión
        delay_ms(1000);
        for (int i = 0; i < 10; i++) // 64 bytes de numeros transformados a caracteres
        {

            LATCbits.LATC3 = 0; // Chip Select a cero. Vamos a comenzar una nueva transmisión
            delay_ms(5); // Delay para dar tiempo a estabilizar la señal de chip select a cero antes de tranmisitir
            spi_write(0x02); //Write
            spi_write(0x00); //MSB MEM
            spi_write(i); //LSB MEM
            spi_write(i); //DATA
            LATCbits.LATC3 = 1; // Chip Select a cero. Vamos a comenzar una nueva transmisión
            delay_ms(5);
            LATCbits.LATC6 = 0; // Chip Select a cero. Vamos a comenzar una nueva transmisión
            delay_ms(5); // Delay para dar tiempo a estabilizar la señal de chip select a cero antes de tranmisitir
            spi_write(0x02); //Write
            spi_write(0x00); //MSB MEM
            spi_write(i); //LSB MEM
            spi_write(i); //DATA
            delay_ms(5); // Delay para dar tiempo a estabilizar la señal de chip select a cero antes de tranmisitir
            LATCbits.LATC6 = 1; // Chip Select a cero. Vamos a comenzar una nueva transmisión
            delay_ms(500);

        }
        LATCbits.LATC3 = 0;
        delay_ms(5);
        spi_write(0x04); //DISABLE WRITING
        delay_ms(5);
        LATCbits.LATC3 = 1;
        delay_ms(100);
        LATCbits.LATC6 = 0;
        delay_ms(5);
        spi_write(0x04); //DISABLE WRITING
        delay_ms(5);
        LATCbits.LATC6 = 1;
        delay_ms(100);
        for (int i = 0; i < 10; i++) // Data byte 
        {
            LATCbits.LATC3 = 0; // Chip Select a cero. Vamos a comenzar una nueva transmisión
            delay_ms(5);
            spi_write(0x03); //Read
            spi_write(0x00); //MSB MEB
            spi_write(i); //LSB MEM
            memory_data = spi_write(0x00);
            delay_ms(5);
            LATCbits.LATC3 = 1;
            delay_ms(5);
            sprintf(txbuffer, "Dato en memoria 1: %02X. Address: 0x00%d \r\n", memory_data, i);
            EnviarString(txbuffer);

        }
        delay_ms(100);
        for (int i = 0; i < 10; i++) // Data byte 
        {
            LATCbits.LATC6 = 0;
            delay_ms(5);
            spi_write(0x03); //Read
            spi_write(0x00); //MSB MEB
            spi_write(i); //LSB MEM
            memory_data = spi_write(0x00);
            delay_ms(5);
            LATCbits.LATC6 = 1;
            delay_ms(5);
            sprintf(txbuffer, "Dato en memoria 2: %02X. Address: 0x00%d \r\n", memory_data, i);
            EnviarString(txbuffer);
        }
        delay_ms(1000);
    }
}
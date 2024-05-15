
#pragma config BWRP = WRPROTECT_OFF     // Boot Segment Write Protect (Boot Segment may be written)
#pragma config BSS = NO_FLASH           // Boot Segment Program Flash Code Protection (No Boot program Flash segment)

// FGS
#pragma config GWRP = OFF               // General Code Segment Write Protect (User program memory is not write-protected)
#pragma config GSS = OFF                // General Segment Code Protection (User program memory is not code-protected)

// FOSCSEL
#pragma config FNOSC = PRIPLL           // Oscillator Mode (Internal Fast RC (FRC) with divide by N)
#pragma config IESO = ON                // Internal External Switch Over Mode (Start-up device with FRC, then automatically switch to user-selected oscillator source when ready)

// FOSC
#pragma config POSCMD = HS              // Primary Oscillator Source (Primary Oscillator Disabled)
#pragma config OSCIOFNC = OFF           // OSC2 Pin Function (OSC2 pin has clock out function)
#pragma config IOL1WAY = ON             // Peripheral Pin Select Configuration (Allow Only One Re-configuration)
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
#pragma config ICS = PGD1               // Comm Channel Select (Communicate on PGC2/EMUC2 and PGD2/EMUD2)
#pragma config JTAGEN = OFF             // JTAG Port Enable (JTAG is Disabled)


#include <xc.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stddef.h>          // Defines NULL
#include <stdbool.h>         // Defines true
#include <math.h>

#define baud_9600  1041     

void delay_ms(unsigned long time_ms) {
    unsigned long u;
    for (u = 0; u < time_ms * 200; u++) {
        asm("NOP");
    }
}

void Timer1_Config(void) {
    T1CONbits.TON = 0;
    T1CONbits.TSIDL = 0;
    T1CONbits.TCKPS = 1; //Prescaler 256
    T1CONbits.TCS = 0; //Frecuencia de CPU como base de tiempos del Timer
    T1CONbits.TSYNC = 0;

    //Interrupciones
    IPC0bits.T1IP = 7;
    IFS0bits.T1IF = 0;
    IEC0bits.T1IE = 0;


    PR1 = 25000;
    TMR1 = 0;

    T1CONbits.TON = 1;
}

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

char txbuffer[15];
char countbuffer[20];
unsigned int contador = 0;
unsigned char var_recv = 0;
int count = 0;
unsigned int Rate = 0;
unsigned char BufferLoadDone = 1;
unsigned int nextchar = 0;

int main(void) {
    // Fcpu = Fosc/2 = 4mhz
    // Fosc = 8mhz
    // Fosc = Fin *(M/N1*N2)
    PLLFBD = 38; //M  = PLLFBD 
    CLKDIVbits.PLLPOST = 0; //N1 = PLLPOST + 2
    CLKDIVbits.PLLPRE = 0; //N1 = PLLPOST + 2
    while (OSCCONbits.LOCK != 1);
    AD1PCFGL = 0xFFFF; // Todos los pines configurados como pines digitales
    uart_config(baud_9600);
    Timer1_Config();
    TRISBbits.TRISB4 = 0; // Pin B4 digital y salida.
    TRISBbits.TRISB9 = 0;
    while (1) {
        if (txbuffer[0] == 'P'){
            txbuffer[0] = '\0';
            IEC0bits.T1IE = !IEC0bits.T1IE;
        }
        if (txbuffer[0] == ' ') {
            if (count == 0)count = 1;
            else count = 0;
            txbuffer[0] = '\0';
        }
        if (count == 1 && BufferLoadDone == 1 && (U1STAbits.TRMT)) {
                memset(countbuffer, '\0', sizeof (countbuffer));
                sprintf(countbuffer, "Contador: %d \r\n", contador++);
                nextchar = 0;
                BufferLoadDone = 0;
                if (U1STAbits.UTXBF) IFS0bits.U1TXIF = 0; 
                asm("nop");
                IEC0bits.U1TXIE = 1; 
            delay_ms(10);
        }
        delay_ms(100);
    }
}

void __attribute__((__interrupt__, no_auto_psv)) _T1Interrupt(void) {
    LATBbits.LATB4 = !PORTBbits.RB4;
    IFS0bits.T1IF = 0;
}

void __attribute__((__interrupt__, no_auto_psv)) _U1RXInterrupt(void) {
    txbuffer[0] = U1RXREG;
    IFS0bits.U1RXIF = 0; 
}

void __attribute__((__interrupt__, no_auto_psv)) _U1TXInterrupt(void)
{
    IEC0bits.U1TXIE = 0; 

    if (!U1STAbits.UTXBF)
    {
        U1TXREG = countbuffer[nextchar++]; 
        asm("nop");
        if (U1STAbits.UTXBF) 
        {
            IFS0bits.U1TXIF = 0; 
        }
    } else IFS0bits.U1TXIF = 0; 

    if (nextchar == strlen(countbuffer)) 
    {
        BufferLoadDone = 1; 
    } else IEC0bits.U1TXIE = 1; // Enable UART1 Tx Interrupt   

}





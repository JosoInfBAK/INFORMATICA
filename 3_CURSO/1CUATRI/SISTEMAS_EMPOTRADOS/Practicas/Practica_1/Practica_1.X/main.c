/* 
 * File:   main_pr1.c
 * Author: josoj
 *
 * Created on 10 de octubre de 2022, 11:44
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


#include <stdio.h>
#include <stdlib.h>
#include <xc.h>

#define LED_Red LATBbits.LATB3
#define LED_Green LATBbits.LATB4
#define LED_Green2 LATAbits.LATA1


#define boton_pulsado 0
#define boton_no_pulsado 1

//LED_ROJO   B3
//LED_VERDE  B4
//LED_VERDE2 A1
//Botón para LED rojo RB5
//Botón para LED verde RB6

void delay_ms(unsigned long time_ms) {
    unsigned long u = 0;
    for (u = 0; u < time_ms * 450; u++) {
        asm("NOP");
    }
}

void toggle_Red() {

    LED_Red = !PORTBbits.RB3;
}

void toggle_Both() {

    LED_Red = !PORTBbits.RB3;
    LED_Green2 = !PORTAbits.RA1;
}

/*
 * 
 */
int main(int argc, char** argv) {

    PLLFBD = 38; //M  = 40
    CLKDIVbits.PLLPOST = 0; //N2 = 2
    CLKDIVbits.PLLPRE = 0; //N1 = 2
    while (OSCCONbits.LOCK != 1); //Wait for PLL to lock

    AD1PCFGL = 0xFFFF;

    TRISBbits.TRISB3 = 0;
    TRISBbits.TRISB4 = 0;
    TRISAbits.TRISA1 = 0;

    TRISBbits.TRISB5 = 1;
    TRISBbits.TRISB6 = 1;


    while (1) {
        //Ej_1
        toggle_Red();
        delay_ms(500);
        //Ej_2
        switch (PORTBbits.RB5) {
            case 0:
                LED_Green = 1;
                LED_Green2 = 1;
                break;
            case 1:
                LED_Green = 0;
                LED_Green2 = 0;
                break;
            default:
                LED_Green = 0;
                LED_Green2 = 0;
        }
        //EJ3
        
         if(PORTBbits.RB6==0){
             toggle_Both();
             delay_ms(500);
             toggle_Red();
             delay_ms(500);
             toggle_Both();
             delay_ms(500);
             toggle_Red();
             delay_ms(500);
         }else{
             toggle_Red();
             delay_ms(500);
         }
    }

    return (EXIT_SUCCESS);
}


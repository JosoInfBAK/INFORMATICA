#!/usr/bin/env python3

from operator import index
from pyModbusTCP.client import ModbusClient

client = ModbusClient(host="192.168.1.146", port=23456)
suma=0
client.open()
#Lee los valores iniciales de los 4 registros desde la posicion 15
print("Initial register values :" + str(client.read_input_registers(15, reg_nb=4)))
#Escribe 4 registors desde la direccion 15 hasta la 18 con valores 3,2,1,3 respectivamente
client.write_multiple_registers(15,[3,2,1,3,4])
#Itera sobre los valores de los 4 registros siguientes a la posicion 15 y comprueba si son impares
if(sum(client.read_input_registers(15, reg_nb=5))%2): print("La suma de los registros es impar y vale: "+ str(sum(client.read_input_registers(15, reg_nb=5)))) 
else: print("La suma de los registros es par y vale: "+ str(sum(client.read_input_registers(15, reg_nb=5)))) 
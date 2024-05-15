#!/usr/bin/env python3

from operator import index
from pyModbusTCP.client import ModbusClient

client = ModbusClient(host="192.168.1.146", port=23456)
client.open()
#Lee los valores iniciales de los 4 registros desde la posicion 20
print("Initial register values :" + str(client.read_input_registers(20, reg_nb=5)))
#Escribe 4 registors desde la direccion 20 hasta la 24 con valores 3,2,1,3 respectivamente
client.write_multiple_registers(15,[3,2,1,3,4])
#Itera sobre los valores de los 4 registros siguientes a la posicion 20 y comprueba si son impares
for indx,elem in enumerate(client.read_input_registers(15, reg_nb=5)):
    if(  elem % 2 ): print("Register number " + str(indx +15) + " is odd with a value of: " + str(elem))
    else: print("Register number " + str(indx +15) + " is even with a value of: " + str(elem))
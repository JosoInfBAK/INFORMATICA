#!/usr/bin/env python3



from pyModbusTCP.client import ModbusClient

client = ModbusClient(host="192.168.1.146", port=23456)
client.open()
#Lee los valores iniciales de los 4 registros desde la posicion 20
print("Initial register values :" + str(client.read_input_registers(5, reg_nb=5)))
#Escribe 4 registors desde la direccion 20 hasta la 23 con valores 3,2,1,3 respectivamente
client.write_multiple_registers(5,[3,2,1,3,4])
#Lee los valores recien escritos de los 4 registros desde la posicion 20
print("Modified register values :" +str(client.read_input_registers(5, reg_nb=5)))
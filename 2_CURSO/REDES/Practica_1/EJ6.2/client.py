#!/usr/bin/env python3
from pyModbusTCP.client import ModbusClient
client = ModbusClient(host="192.168.1.146", port=23456)
client.open()
#Escribe 4 registors desde la direccion 20 hasta la 24 con valores 3,2,1,3 respectivamente
client.write_multiple_registers(10,[3,2,1,3,4])
print("Modified registers: [10,11,12,13,14] with values: " + str(client.read_input_registers(10, reg_nb=5)))
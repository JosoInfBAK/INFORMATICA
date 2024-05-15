#!/usr/bin/env python3
from pyModbusTCP.server import ModbusServer, DataBank
from time import sleep
from random import uniform
server = ModbusServer("192.168.1.146", 23456, no_block=True)

try:
 print("Start server...")
 server.start()
 print("Server is on line")

 state = [0,0,0,0,0]
 while True:
    DataBank.set_words(0,[int(uniform(0,100))])
    
    for i in range(10,15):        
        if state[i-10] != DataBank.get_words(i) :
            state[i-10] = DataBank.get_words(i)
            print("value register: " + str(i)  + " has changed to: " + str(state[i-10]))
            sleep(0.5)
except:
 print("Shutdown server...")
 server.stop()
 print("Server is offline")

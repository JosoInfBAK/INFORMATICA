#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Feb 17 14:26:39 2021
@author: Alvaro Olmedo
"""
from pyModbusTCP.server import ModbusServer, DataBank
from time import sleep
from random import uniform
# create an instance of Modbusserver
server = ModbusServer("192.168.1.146", 23456, no_block=True)
try:
 print("Start server...")
 server.start()
 print("Server is on line")
 state = [0,0,0,0,0]
 print("Initializing registers:") 
 while True:
    DataBank.set_words(0,[int(uniform(0,100))])
    for i in range(15,20):    
        if state[i-15] != DataBank.get_words(i) :
            state[i-15] = DataBank.get_words(i)
            print("value register: " + str(i)  + " has changed to: " + str(state[i-15]))
            sleep(0.5)
except:
 print("Shutdown server...")
 server.stop()
 print("Server is offline")

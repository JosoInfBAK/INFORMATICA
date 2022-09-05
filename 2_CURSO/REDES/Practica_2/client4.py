#Crear un programa cliente MODBUS-TCP/IP que lea el índice y las lecturas de los sensores de temperatura, presión sistólica y presión diastólica en el banco 
# del servidor creado y coloque su valor en los primeros registros que apunta el cuadro de “direcciones del banco con las que usted debe trabajar” tomando las 
# mismas de izquierda a derecha.

from operator import index
from re import T
from pyModbusTCP.client import ModbusClient

client = ModbusClient(host="127.0.0.1", port=23456)
client.open()
print("Reading meassure,temperature,sistolic pressure and diastolic pressure :")
indexMed= str(client.read_holding_registers(0)) 
temp= str(client.read_holding_registers(1)) 
sisPress=str(client.read_holding_registers(3)) 
disPres= str(client.read_holding_registers(5))
#Tratamos la data recibida ya que el formato de lectura contiene paréntesis y estos no se pueden ntreoducir en los registros
indexMed=int(indexMed[1:-1])
temp=int(temp[1:-1])
sisPress= int(sisPress[1:-1])
disPres=int(disPres[1:-1])
#Valoramos la temperatura si es mayor que 37 es alta, y si es menor es baja
if(temp>37):
    indexTemp=3
elif(temp<37):
    indexTemp=1
else:
    indexTemp=2

#Valoramos la presion sistolica si es mayor que 120 es alta, y si es menor a 80 es baja
if(sisPress>120):
    indexSisPress=3
elif(sisPress<80):
    indexSisPress=1
else:
    indexSisPress=2

#Valoramos la presion diastolica si es mayor que 120 es alta, y si es menor a 80 es baja
if(disPres>120):
    indexDisPress=3
elif(disPres<80):
    indexDisPress=1
else:
    indexDisPress=2
print("Meassure nº:"+str(indexMed)+" Temperature :" + str(temp) +", Sistolic pressure :" + str(sisPress) + ", Diastolic pressure :" + str(disPres))
#Escribimos el registro de indice de medida
client.write_single_register(11,indexMed)
#Registros de valor de temperatura  e indice de valor de esta
client.write_single_register(14,temp)
client.write_single_register(13,indexTemp)
#Registros de valor de presion sistolica  e indice de valor de esta
client.write_single_register(15,sisPress)
client.write_single_register(10,indexSisPress)
#Registros de valor de presion diastolica  e indice de valor de esta
client.write_single_register(18,disPres)
client.write_single_register(19,indexDisPress)
print("Data has been uploaded to registers 11,14,13,15,10,18,19 being 11 for index 14 for temperature 13 for index of temperature 15 for sistolic pressure 10 for index of sistolic pressure 18 for diastolic pressure 19 for index of diastolic pressure")

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
print("Meassure nº:"+str(indexMed)+" Temperature :" + str(temp) +", Sistolic pressure :" + str(sisPress) + ", Diastolic pressure :" + str(disPres))
#Escribe 3 registors de trabajo con los valores obtenidoo de los sensores
client.write_single_register(11,indexMed)
client.write_single_register(14,temp)
client.write_single_register(13,sisPress)
client.write_single_register(15,disPres)
print("Data has been uploaded to registers 11,14,13,15 being 11 for index 14 for temperature 13  sistolic pressure 15 for diastolic pressure ")


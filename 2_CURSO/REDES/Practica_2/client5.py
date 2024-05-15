#
# Crear un programa cliente MODBUS-TCP/IP que lea el índice y las lecturas de los sensores de temperatura, presión sistólica y presión diastólica en el banco del servidor creado y determine si el paciente tiene sus valores leidos en estado Normal o Alterado. Se considerará Normal cuando todos los valores de los sensores leídos se encuentren entre (36-37), (110-130) y (70-90) respectivamente. Este valor determinado será un índice-de- normalidad que puede valer 1, 2 dependiendo si el índice-de-normalidad es Normal o Alterado respectivamente. Cada lectura debe ser enviada al servidor junto con el índice-de- normalidad y escritas en las “direcciones del banco con las que usted debe trabajar” de la siguiente manera (tome las mismas de izquierda a derecha):
#
#        ◦ Primera dirección: el índice de medida que se ha tomado
#       ◦ Segunda dirección: la temperatura
#        ◦ Tercera dirección: Presión sistólica
#       ◦ Cuarta dirección: Presión diastólica
#        ◦ Quinta dirección: el valor del índice-de-normalidad

from dis import dis
from operator import index, truediv
from re import T
from pyModbusTCP.client import ModbusClient

client = ModbusClient(host="127.0.0.1", port=23456)
client.open()
print("Reading meassure,temperature,sistolic pressure and diastolic pressure")
indexMed= str(client.read_holding_registers(0)) 
temp= str(client.read_holding_registers(1)) 
sisPress=str(client.read_holding_registers(3)) 
disPres= str(client.read_holding_registers(5))
#Tratamos la data recibida ya que el formato de lectura contiene paréntesis y estos no se pueden ntreoducir en los registros
indexMed=int(indexMed[1:-1])
temp=int(temp[1:-1])
sisPress= int(sisPress[1:-1])
disPres=int(disPres[1:-1])
indexTemp=0
#Valoramos la temperatura,la presion sistolica y diastolica y hacemos logica basica para cuadrar si el estado es normal o alterado
if(temp>36 and temp<37):
    indexTemp=1
if(sisPress>110 and sisPress<130):
    indexSisPress=1
if(disPres>36 and disPres<37):
    indexDisPress=1
if(indexTemp==1 and indexSisPress==1 and indexDisPress==1):
    patientState=1
else:
    patientState=2
print("Meassure nº:"+str(indexMed)+" Temperature :" + str(temp) +", Sistolic pressure :" + str(sisPress) + ", Diastolic pressure :" + str(disPres))
#Escribimos el registro de indice de medida
client.write_single_register(11,indexMed)
#Registros de valor de temperatura  e presion sistolica y diastolica de valor de esta
client.write_single_register(14,temp)
client.write_single_register(13,sisPress)
client.write_single_register(15,disPres)
#Escribimos el estado del paciente 1 si esta Bien, 2 si esta alterado
client.write_single_register(10,patientState)

print("Data has been uploaded to registers 11,14,13,15,10 being 11 for index 14 for temperature 13  sistolic pressure 15 for diastolic pressure and 10 for patient state")

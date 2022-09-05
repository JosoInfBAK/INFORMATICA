package manager;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Manager {
	Scanner sc = new Scanner(System.in);
	Scanner sc2 = new Scanner(System.in);
	List<Integer> arrayNums = new ArrayList<Integer>();
	public int arr[]= {};
	public String lectura;

	public Manager() {


	}

	public void menu() {

		System.out.println("1 – Cargar números desde un archivo (.txt)\r\n 2 – Mostrar números\r\n 3 – Añadir números (enteros)s \n 4 – Calcular la suma total del array\n 5 – Guardar los valores introducidos en un archivo (.txt)\n 6 – Salir.\r\n");
		int seleccion = sc.nextInt();
		switch (seleccion) {
		case 1:
			readFile();
			menu();
			break;
		


		case 2:
			if(arrayNums!=null) {
				System.out.println(arrayNums +"\n");
			}else System.out.println("No se ha cargado aun el archivo, ni se han introducido valores, vuelva a intentarlo \n");
			menu();
			break;
			
		case 3:	
			int add =sc2.nextInt();
			arrayNums.add(add);
			menu();
		
		

		case 4:
			int sum = 0;
			for(Integer s : arrayNums)
				sum += s;
			System.out.println(sum);
			menu();
		break;
		
		case 5:
			writeFile();
			menu();
			break;


		case 6:
			System.out.println("Saliendo del programa...");
			return;
		
		}
	}


	public void readFile() {

		//Declarar una variable BufferedReader
		BufferedReader br ;
		try {
			//Crear un objeto BufferedReader al que se le pasa 
			//   un objeto FileReader con el nombre del fichero
			br = new BufferedReader(new FileReader("C:/Users/josoj/OneDrive/Escritorio/INFORMATICA/PROGRAMACION AVANZADA/Practica_1/in.txt"));
			//Leer la primera línea, guardando en un String

			try {
				lectura = br.readLine();
				while(lectura != null){
					arrayNums.add(Integer.parseInt(lectura));
					System.out.println(lectura);
					lectura = br.readLine();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			

		}
		catch (FileNotFoundException e) {
			System.out.println("Error: Fichero no encontrado");
			System.out.println(e.getMessage());
		}
		

	}
	public void writeFile() {
		 try {
	           
	            File archivo = new File("salida.txt");
	            archivo.delete();

	            //Crear objeto FileWriter que sera el que nos ayude a escribir sobre archivo
	            FileWriter escribir = new FileWriter(archivo, true);
	             for(Integer f : arrayNums) {
	                escribir.write(Integer.toString(f));
	                escribir.write("\r\n"); 

	            }

	            escribir.close();
	        } 
	        catch (Exception e) {
	            System.out.println("Error al escribir");
	        }
	}
}

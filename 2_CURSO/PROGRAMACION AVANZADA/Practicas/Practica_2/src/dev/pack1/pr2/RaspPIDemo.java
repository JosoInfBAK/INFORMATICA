package dev.pack1.pr2;

import java.util.ArrayList;

import javax.swing.*;

public class RaspPIDemo {
	
	ArrayList<Component> selectedComp = new ArrayList<Component>();
	
	private static String[] stock ;

	public static void main(String[] args) {
		//elegir componente, guardarlo en selected comp,llama
		stock=ComponentList.getItems();
		System.out.println(stock);
		
		
		JFrame frame= new JFrame();
		frame.setTitle("RasPiDemo");//titulo del panel
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);//cerrar con la X de la pantalla
		frame.setBounds(100, 100, 500, 500); //posicion y tamaño de la pantalla
		//frame.setSize(500, 300); //Similar set size and default position. pixels
		JPanel contentPane = new JPanel();//Crear Jpanel que es lo que hace que se pueda pintar en el Frame
		frame.setContentPane(contentPane);
		contentPane.setLayout(null);
		//Crear botones para los tres tipos de componentes que hay
		JButton CompButton1 = new JButton("LED");//se crea el objeto
		CompButton1.setBounds(100, 100, 100, 50);//posicion  
		frame.add(CompButton1);
		frame.setVisible(true);
		JButton CompButton2 = new JButton("IR");
		CompButton2.setBounds(200, 100, 100, 50); 
		frame.add(CompButton2);
		frame.setVisible(true);
		JButton CompButton3 = new JButton("Buzzer");
		CompButton3.setBounds(300, 100, 100, 50); 
		frame.add(CompButton3);
		frame.setVisible(true);

	}

}

package dev.pack1.boxgame;

import java.awt.Color;



import java.awt.Graphics;
import java.awt.image.BufferStrategy;
import java.awt.image.BufferedImage;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.gfx.ImageLoader;
import dev.pack1.boxgame.gfx.SpriteSheet;
import dev.pack1.boxgame.input.KeyManager;
import dev.pack1.boxgame.input.MouseManager;
import dev.pack1.boxgame.pantalla.Pantalla;
import dev.pack1.boxgame.sound.Sound;
import dev.pack1.boxgame.states.EndGame;
import dev.pack1.boxgame.states.GameMode;
import dev.pack1.boxgame.states.GameState;
import dev.pack1.boxgame.states.MainMenu;
import dev.pack1.boxgame.states.State;


public class Game implements Runnable {
	private Pantalla pantalla;
	public int width,height;
	public String title;
	private boolean ejecucion= false;//Booleano para poner en ejecucion el programa
	public boolean button1,buttonMap1,button1J2,highscore;
	public boolean button2,buttonMap2,button2J2;
	public boolean button3,buttonMap3,button3J2,creaJugadores=false;
	public float health,health2;
	public float naturalStrength,naturalStrength2;
	public float speed,speed2;
	public int tamX2,tamX1,tamY2,tamY1;
	public static int playerCount=0;
	private Thread th1;//Hilo para correr el inicio del programa de manera separada al juego
	
	private  BufferStrategy buff;//variable para crear buffer para evitar parpadeo de pantalla
	private Graphics g;
	
	//Estados del juego

	public State resetGame;
	public State menuState,endGame;
	public State gameMode ;
	//managers
	private KeyManager keymanager;
	private MouseManager mouseManager;
	//Handler
	private Handler handler;
	//variables auxiliares
	public boolean J11D,J21D,J12D,J22D,J13D,J23D;
	public Sound music;
	public int ticks=0;	//cuantas veces se ha llamado a los metodos de actualizacion por segundo
	public long timer=0;//contador  que llega hasta un segundo, cuando se llega a un segundo imprime los ticks
	public double oldHigh;
	public String nameHigh;
	public String thisName;
	MongoClientURI uri = new MongoClientURI("mongodb+srv://joso:123456abc@cluster0.6xzff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
	MongoClient mongo = new MongoClient(uri);
	MongoDatabase database = mongo.getDatabase("Boxing");
	MongoCollection<Document> collection = database.getCollection("OnlinePlayers");
	
	
	public Game(String title,int width,int height) {//
		
		this.width=width;
		this.height=height;
		this.title=title;
		keymanager= new KeyManager();
		mouseManager = new MouseManager();
		music=new Sound();
		music.setFile("/sounds/music.wav");
		thisName=JOptionPane.showInputDialog("Enter Name");
		MongoConnect();
		music.playM();		
	}
	/**
	 * @author:Jose
	 * metodo para inicializar el juego, crea el objeto pantalla carga los sprites 
	 * @param:none
	 */
	private void inicializar() {
		handler = new Handler(this);
		inicializarPantalla();
		Assets.inicializar();
		menuState= new MainMenu(handler);
		gameMode= new GameMode(handler);
		State.setState(gameMode);
	
	}
/**
 * @author:Jose
 * Metodo que se encarga de asignar valores a los atributos de los objetos jugadores en funcio de los botones seleccionados
 * @param:none
 * */
	public void MongoConnect() {
		collection.insertOne(new Document("Username",thisName));
		mongo.close();
	}
	
/**	 
 * @author:Jose
 * Metodo que se encarga de inicializar la pantalla ya añadir los listeners para el input de raton y teclado
 * @param:none
 * */
public void inicializarPantalla() {
	pantalla=new Pantalla(title,width,height,handler);
	pantalla.getFrame().addKeyListener(keymanager);
	pantalla.getFrame().addMouseListener(mouseManager);
	pantalla.getFrame().addMouseMotionListener(mouseManager);
	pantalla.getCanvas().addMouseListener(mouseManager);
	pantalla.getCanvas().addMouseMotionListener(mouseManager);

}
/**
 * @author:Jose
 * Metodo que se encarga de asignar atributos a los objetos que luego se añadirán en funcion de diferente input
 * @param:none
 * */
 public void asignacionAtributos() {
	 
	if(isButton1()) {
		 health=10;
		 naturalStrength=1;
		 speed=7.0f;
		 tamX1=280;
		 tamY1=280;

	}
	if(isButton2()) {
		health=12;
		naturalStrength=1.2f;
		speed=5.0f;
		 tamX1=310;
		 tamY1=310;


	}
	if(isButton3()) {
		health=15;
		naturalStrength=1.5f;
		speed=3.0f;
		 tamX1=340;
		 tamY1=340;


	}
	if(isButton1J2()) {
		 health2=10;
		 naturalStrength2=1;
		 speed2=7.0f;
		 tamX2=280;
		 tamY2=280;

	}
	if(isButton2J2()) {
		health2=12;
		naturalStrength2=1.1f;
		speed2=5.0f;
		 tamX2=310;
		 tamY2=310;


	}
	if(isButton3J2()) {
		health2=15;
		naturalStrength2=1.5f;
		speed2=3.0f;
		 tamX2=340;
		 tamY2=340;


	}


}
/**
 * @author:Jose
 * metodo empleado para actualizar el estado del juego a tiempo real
 * @param:none
 * */
	private void actualizar(){
		keymanager.tick();
		
		if(State.getState() != null ) {
			State.getState().tick();
			}
	}
	/**
	 * @author:Jose
	 * metodo empleado para dibujar cosas en el lienzo(Canvas)
	 * @param:none
	 * 
	 */
	
private void renderizar(){
	buff = pantalla.getCanvas().getBufferStrategy();//Pinta la primera imagen en un buffer y luego en pantalla para evitar que parpadee la pantalla (Source:CodeNmore)
		if(buff==null) {//si es la primera vez que e va a usar un buffer esto hace que creemos 3 nuevos
			pantalla.getCanvas().createBufferStrategy(3);
			return;
		}
		g = buff.getDrawGraphics();//g es el objeto "pincel" que dibuja los objetos por pantalla
		g.clearRect(0, 0, width, height);
			
		if(State.getState() != null) {
			State.getState().render(g);
		}
		//No dibujar mas
		buff.show();
		g.dispose();
		
	}
	
	/**
	 * @author:Jose
	 * metodo que llama al metodo inicializar y crea el Game loop para renderizar y actualizar constantemente
	 * @param:none
	 */
	public void run() {//metodo que llama al metodo inicializar y crea el Game loop para renderizar y actualizar constantemente
		inicializar();
		int fps =60;//Variable que nos dice cada cuanto llamamos a los metodos actualizar y renderizar
		double timePerTick=1000000000/fps;//tiempo maximo en nanosegundos que hay para ejecutar los metodos de actualizacion
		double delta = 0;
		long now;//tiempo actual del ordenador
		long lastTime=System.nanoTime();//variable que nos dice cuanto tiempo ha pasado desde la ultima vez que se ejecuto el bucle de ejecucion
	
		
		
		while(ejecucion) {
			now=System.nanoTime();
			delta+=(now-lastTime)/timePerTick; //delta es un tiempo que nos dice cuanto falta para llamar a los metodos de actualizar y renderizar
			timer+= now-lastTime;//tiempo que ha pasado desde que se ha llamado a la linea anterior
			lastTime=now;
			if(delta>=1) {// si delta es mayor que 1 quiere decir que necesitamos actualizar para llegar a los 60 fps
			actualizar();
			renderizar();
			delta--;
			ticks++;
			}
			if(timer>=1000000000) {
				System.out.println("Ticks y frames:" + ticks);
				ticks=0;
				timer=0;
			}
		}
		stop();
		
	}
	/**
	 * @author:Jose
	 * metodo para cerrar el hilo
	 */
	public synchronized void stop() {
		if(!ejecucion) {
			return;
		}
		ejecucion=false;
		try {
			th1.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		
			
		}
	/**
	 * Setters y Getters
	 * 
	 */
	public KeyManager getKeyManager() {
		return keymanager;
	}
	public MouseManager getMouseManager() {
		return mouseManager;
	}
	
	public int getWidth(){
		return width;
	}
	
	public int getHeight(){
		return height;
	}
	public boolean isButton1() {
		return button1;
	}
	public void setButton1(boolean button1) {
		this.button1 = button1;
	}
	public boolean isButton2() {
		return button2;
	}
	public void setButton2(boolean button2) {
		this.button2 = button2;
	}
	public boolean isButton3() {
		return button3;
	}
	public void setButton3(boolean button3) {
		this.button3 = button3;
	}
	
	public boolean isButtonMap1() {
		return buttonMap1;
	}
	public void setButtonMap1(boolean buttonMap1) {
		this.buttonMap1 = buttonMap1;
	}
	public boolean isButtonMap2() {
		return buttonMap2;
	}
	public void setButtonMap2(boolean buttonMap2) {
		this.buttonMap2 = buttonMap2;
	}
	public boolean isButtonMap3() {
		return buttonMap3;
	}
	public void setButtonMap3(boolean buttonMap3) {
		this.buttonMap3 = buttonMap3;
	}
	public boolean isCreaJugadores() {
		return creaJugadores;
	}
	public void setCreaJugadores(boolean creaJugadores) {
		this.creaJugadores = creaJugadores;
	}
	public boolean isButton1J2() {
		return button1J2;
	}
	public void setButton1J2(boolean button1j2) {
		button1J2 = button1j2;
	}
	public boolean isButton2J2() {
		return button2J2;
	}
	public void setButton2J2(boolean button2j2) {
		button2J2 = button2j2;
	}
	public boolean isButton3J2() {
		return button3J2;
	}
	public void setButton3J2(boolean button3j2) {
		button3J2 = button3j2;
	}
	public synchronized void start() {//metodo para empezar el hilo
		if(ejecucion) 
			return;
		ejecucion=true;
		th1 =new Thread(this);
		th1.start();
			
		}

		


	
}

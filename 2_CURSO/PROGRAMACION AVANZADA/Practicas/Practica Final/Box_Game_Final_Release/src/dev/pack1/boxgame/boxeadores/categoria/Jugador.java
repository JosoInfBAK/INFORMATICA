/**
 * @author: José 
 * Clase  que se encarga de darle las propiedades ya tributos seleccionados a los objetos jugadores,  determina si se tiene que colocar a la izquierda o la derecha 
 * la posicion en el eje y dependiendo de su tamaño , si el jugador se encuentra con saludo por encima de 0, actualiza y renderiza el objeto recurrentemente 
 * por ultimo tambien se encarga de las animaciones de este
 * @param handler objeto que se encarga del manejo de variables entre clases
 * @param x posicion en ele eje x inicial que le daremos a nuestro jugador
 * @param lado cadena que indicara en que lado habrá que colocar el objeto final, esto tambien implica modificaciones en el propio personaje, ya que dependiendo del lado tienen atributos diferentes
 * @param salud, fuerza,vel,tam1,tam2 parametros que vienen dados de la seleccion de categoria en el comienzo del juego que darán atributos diferentes a los objetos finales
 */

package dev.pack1.boxgame.boxeadores.categoria;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.util.concurrent.TimeUnit;

import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.boxeadores.Boxeador;
import dev.pack1.boxgame.gfx.Animation;
import dev.pack1.boxgame.gfx.Assets;

public class Jugador extends Boxeador {

	boolean izda=false;
	private Animation animWalkI,animWalkD;
	boolean alive=true;
	public String categoria;
	public int ypos;
	public boolean enMovef=true,enMoveb=true;
	private static Jugador instance;
	//private static int playerCount=0;



	private Jugador(Handler handler,float x,String lado,float salud,float fuerza,float vel,int tam1,int tam2) { 
		super(handler,x); 
		health=salud;
		speed=vel;
		width=tam1;
		height=tam2;
		naturalStrength=fuerza;
		asignarYpos();
		animWalkI=new Animation(200,Assets.walkI);
		animWalkD=new Animation(200,Assets.walkD);
		this.x = x;
		if(lado=="izqda") {
			izda=true;
		}

	}
	 public static Jugador getInstance(Handler handler,float x,String lado,float salud,float fuerza,float vel,int tam1,int tam2) {
	       if( handler.getGame().playerCount<=2) {
	        	instance = new Jugador( handler, x, lado, salud, fuerza, vel, tam1, tam2);
	        	 handler.getGame().playerCount++;
	        	return instance;
	        	
	        }else {
	        	return null;
	        }
	        
	    }

	public boolean checkAlive(){
		if(health<=0) 
			return false;
		else return true;

	}
	public void asignarYpos() {
		switch(width) {
		case 280: ypos=541;
		break;
		case 310: ypos=515;	
		break;
		case 340 :ypos=490;
		break;

		}

	}

	@Override
	public void tick() {
		getInput();
		animWalkD.tick();
		animWalkI.tick();
		checkAlive();
		moveX();
	}

	/**
	 * @author Jose
	 * Asigna 0 a la variable xmove para detener al jugador
	 * @param none
	 */

	public void stop(){
		xmove=0;
	}

	/**
	 * @author Jose
	 * Actualiza la variable speed de mi jugador con xmove o 
	 * -xmove para ver si esta yendo hacia delante o hacia atras el jugador
	 * @param none
	 */
	private void getInput(){

		if(izda) {	
			xmove=0;
			if(enMovef) {	
				if(handler.getKeyManager().forward) {
					xmove = speed;
				}
			}
			if(enMoveb) {
				if(handler.getKeyManager().back) {

					xmove = -speed;	
				}
			}

		}else {
			xmove=0;
			if(enMovef) {	
				if(handler.getKeyManager().forward2) {
					xmove = speed;
				}
			}
			if(enMoveb) {
				if(handler.getKeyManager().back2) {
					xmove = -speed;	
				}
			}
		}
	}


	/**
	* @author:Jose
	* metodo empleado para dibujar la imagen del objeto
	* @param:objeto grafico g  
	*/
	@Override
	public void render(Graphics g) {
		if(izda) {
			if(checkAlive()) {
				g.drawImage(devolverImagen(),(int)x,ypos,width,height,null);//dibuja i jugador al nivel del suelo con una x variable
			}else g.drawImage(Assets.ko1,(int)x,ypos,width,height,null);
		}else if(!izda) {
			if(checkAlive()) {
				g.drawImage(devolverImagen2(),(int)x,ypos,width,height,null);
			}else  g.drawImage(Assets.ko2,(int)x,ypos,width,height,null);

		}



	}

	/**
	 * @author Jose
	 * Metodos que se encargan de devolver una imagen u otra dependiendo de las teclas que se pulsen
	 * @return BufferedImage
	 * 
	 */
	public BufferedImage devolverImagen2() {


		if(handler.getKeyManager().hit2) return Assets.golpeJderecha;	
		else if(handler.getKeyManager().block2) return Assets.blockDcha;
		else if(handler.getKeyManager().back2)return animWalkD.getCurrentFrame();
		else if(handler.getKeyManager().forward2)return animWalkD.getCurrentFrame();
		else return Assets.jugadorDerecha;



	}
	public BufferedImage devolverImagen() {

		if(handler.getKeyManager().hit1) return Assets.golpeJizqda; 
		else if(handler.getKeyManager().block1) return Assets.blockIzqda;
		else if(handler.getKeyManager().forward)return animWalkI.getCurrentFrame();
		else if(handler.getKeyManager().back)return animWalkI.getCurrentFrame();
		else return Assets.jugadorIzqda;

	}

}

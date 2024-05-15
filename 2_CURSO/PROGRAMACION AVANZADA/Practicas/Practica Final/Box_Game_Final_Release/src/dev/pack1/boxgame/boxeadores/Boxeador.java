/**
 * @author: José María Fernández
 * Clase abstracta que se encarga de darle formato a la clase jugador, contiene setters y getters
 * @param handler objeto que se encarga del manejo de variables entre clases
 * @param x posicion en ele eje x inicial que le daremos a nuestro jugador
 */

package dev.pack1.boxgame.boxeadores;
import java.awt.Graphics;

import java.awt.Rectangle;

import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.boxeadores.categoria.Jugador;
import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.worlds.World;

public abstract class Boxeador {
	
	protected Handler handler;
	public float x;
	protected int width,height;
	protected World world;
	public  int DEFAULT_WIDTH = 300;
	public  int DEFAULT_HEIGHT = 300;
	protected float health;
	protected float naturalStrength;
	protected float speed;
	public  float xmove;
	public String categoria;
	
	public Boxeador (Handler handler,float x){
		
		this.handler=handler;
		this.x = x;
		handler.getWorld();
		
	}

	/**
	 * @author Jose
	 * Actualizar la variable de posicion x periodicamente
	 */
	public void moveX() {
		x+=xmove;			
	}
	
	/**
	 * Setters y getters
	 */
	public float getXmove() {
		return xmove;
	}

	public  void setXmove(float xmoveg) {
		xmoveg = xmove;
	}


	public float getHealth() {
		return health;
	}

	public void setHealth(float health) {
		this.health = health;
	}

	public float getNaturalStrength() {
		return naturalStrength;
	}

	public void setNaturalStrength(int naturalStrength) {
		this.naturalStrength = naturalStrength;
	}

	public float getSpeed() {
		return speed;
	}

	public void setSpeed(float speed) {
		this.speed = speed;
	}
	
	public abstract void tick();
	
	public abstract  void render(Graphics g) ;

	public float getX() {
		return x;
	}

	public void setX(float x) {
		this.x = x;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}
	

}

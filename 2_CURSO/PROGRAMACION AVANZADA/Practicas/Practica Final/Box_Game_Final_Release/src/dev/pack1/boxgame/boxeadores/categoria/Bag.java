/**
 * @author josoj 
 * clase que contiene los atributos y metodos de e objeto Bag
 * 
 */
package dev.pack1.boxgame.boxeadores.categoria;

import java.awt.Graphics;

import dev.pack1.boxgame.gfx.Assets;

public class Bag {
	 private static Bag instance;
	
	private Bag() {
		
		
		
	}
	/**
	 * @author josoj 
	 * metodo que crea una sola instancia de este objeto (Singleton)
	 * @return Bag
	 */
	 public static Bag getInstance() {
		 if (instance == null) {
	            instance = new Bag();
	        }
	        return instance;
		 
		 
		 
	 }
/**
* @author:Jose
* metodo empleado para dibujar la imagen del objeto
* @param:objeto grafico g  
*/
	public void render(Graphics g) {
		g.drawImage(Assets.bag, 600, 530, 200,200,null);

		}
	public int getX() {
		
		return 600;
	}

}

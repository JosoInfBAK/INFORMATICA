/**
 * @author: José María Fernández
 * Clase que se encarga de renderizar los objetos de tipo boton, 
 * implementa la funcionalidad de cambio de aspecto cuando se clickea uno de estos objetos o cuando se pasa por encima
 * @param x posicion que tomara el objeto en el eje  x
 * @param y posicion que tomara el objeto en el eje  y
 * @param width tamaño unidimensional que tomará mi objeto en el eje x
 * @param height tamaño unidimensional que tomará mi objeto en el eje y 
 * @param imagen imagen que será aplicada al objeto y será renderizada
 * @clicker inyeccion de dependencias a raiz de  de la interfaz ClickListener que me permitirá implementar la función de click 
 *  
 */

package dev.pack1.boxgame.ui;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

public class UIImageButton extends UIObject{
	
	private BufferedImage[] imagen;
	private ClickListener clicker;
	private boolean ifOnC;

	public UIImageButton(float x, float y, int width, int height,BufferedImage[] imagen,ClickListener clicker) {
		super(x, y, width, height);
		this.imagen=imagen;
		this.clicker=clicker;
		
	}

	@Override
	public void tick() {
		
		
	}

	@Override
	public void render(Graphics g) {
		if(ifOnC)//si se ha clickeado el boton se queda en la imagen 1
			g.drawImage(imagen[1],(int)x,(int)y,width,height,null);	
		else if(hovering)// si no se ha clicado y se esta pasando por encima del boton se dibuja una miagen y si no otra
			g.drawImage(imagen[1],(int)x,(int)y,width,height, null);
				else g.drawImage(imagen[0],(int)x,(int)y,width,height, null);
			
	
		
	}

	@Override
	public void onClick() {
		clicker.onClick();//llama a la funcion on click de mi objeto clicker que es una interfaz, esta funcionalidad se implementa en la clase padre UIObject 
		ifOnC=true;
		
	}

}

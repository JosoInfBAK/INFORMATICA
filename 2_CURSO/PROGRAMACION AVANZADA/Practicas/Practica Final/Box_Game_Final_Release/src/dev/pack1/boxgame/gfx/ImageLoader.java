/**
 * @author:codeNmore
 * Clase que se encarga de cargar en una variable buffered image una imagen que se le pasa a traves de una direccion de datos
 * @param direccion direccion de datos donde se encuentra alojada la imagen
 *  
 */
package dev.pack1.boxgame.gfx;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;

public class ImageLoader {
	public static BufferedImage loadImage(String direccion) {
		try {
			return ImageIO.read(ImageLoader.class.getResource(direccion));//Carga  imagen, metodo que recibe una direccion de memoria y devuelve una imagen en buffer
		} catch (IOException e) {
			e.printStackTrace();
			System.exit(1);
		}
		return null;
		
	}

}

/**
 * @author: josoj (desarrollada originalmente por codeNmore)
 * Clase que se encarga de guardar cada imagen del sprite en una buffered image diferente 
 * para asi no estar cargando y cortando las imagenes todo el rato con el loop game
 *  
 */

package dev.pack1.boxgame.gfx;

import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import dev.pack1.boxgame.sound.Sound;
import dev.pack1.boxgame.ui.UIManager;

public class Assets {
	private static final int width =499, height =489;
	public static BufferedImage jugadorDerecha,jugadorIzqda,golpeJderecha,golpeJizqda,blockIzqda,blockDcha,ko1,ko2, bag,green,yellow,red;
	public static BufferedImage[] boton,walkI,walkD,fondo;
	public static BufferedImage[] boton_seleccion,botonHome;
	public static Sound soundHit;
	public static Sound soundBlock;
	public static Sound music;
	public static Font fontpix50;

	
	/**
	 * @author josoj (desarrollada originalmente por codeNmore)
	 * metodo que inicializa, corta y carga recursos de distintos tipos
	 */
	
	public static void inicializar() {
		

		SpriteSheet personaje1 = new SpriteSheet(ImageLoader.loadImage("/textures/Jugador1.png"));
		SpriteSheet Boton_Inicio = new SpriteSheet(ImageLoader.loadImage("/textures/Boton_Inicio.png"));
		SpriteSheet Boton_Seleccion = new SpriteSheet(ImageLoader.loadImage("/textures/Boton_Seleccion.png"));
		SpriteSheet BotonHome = new SpriteSheet(ImageLoader.loadImage("/textures/home.png"));
		SpriteSheet personaje2 = new SpriteSheet(ImageLoader.loadImage("/textures/Jugador2.png"));
		SpriteSheet fondos = new SpriteSheet(ImageLoader.loadImage("/worlds/Fondos.png"));
		SpriteSheet bagS = new SpriteSheet(ImageLoader.loadImage("/textures/bag.png"));
		SpriteSheet lights = new SpriteSheet(ImageLoader.loadImage("/textures/lights.png"));
		
		soundHit= new Sound();
		soundHit.setFile("/res/sounds/hit.wav");
		soundBlock= new Sound();
		soundBlock.setFile("/res/sounds/block.wav");
		music=new Sound();
		music.setFile("/res/soundsmusic.wav");
		green=lights.crop(0, 0,63,71);
		red=lights.crop(63,0,63,71);
		yellow=lights.crop(125, 0, 63,71);
		jugadorIzqda=personaje1.crop(2*width,0,width,height);
		golpeJizqda=personaje1.crop(0,0, width, height);
		golpeJderecha=personaje2.crop(6*width, 0, width, height);
		golpeJizqda=personaje1.crop(0,0,width,height);
		jugadorDerecha=personaje2.crop(4*width,0,width,height);
		blockIzqda=personaje1.crop(width,0,width,height);
		blockDcha=personaje2.crop(5*width,0, width, height);
		ko1=personaje1.crop(3*width,0,width,height);
		ko2=personaje2.crop(3*width,0,width,height);
		bag= bagS.crop(0,0,512 ,512 );
		walkI = new BufferedImage[2];
		walkD = new BufferedImage[2];
		walkD[0]=personaje2.crop(0,0, width, height);
		walkD[1]=personaje2.crop(4*width,0, width, height);
		walkI[0]=personaje1.crop(6*width,0, width, height);
		walkI[1]=personaje1.crop(2*width,0, width, height);
		SpriteSheet background = new SpriteSheet(ImageLoader.loadImage("/worlds/background.png"));
		fondo=new BufferedImage[3];
		fondo[0]= fondos.crop(0,0,626,313);
		fondo[1]= fondos.crop(626,0,626,313);
		fondo[2]= fondos.crop(1252,0,626,313);
		boton = new BufferedImage[2];
		botonHome = new BufferedImage[2];
		botonHome[0]=BotonHome.crop(0,0,512,512);
		botonHome[1]=BotonHome.crop(512,0,512,512);
		boton[0]=Boton_Inicio.crop(0,0,512,512);
		boton[1]=Boton_Inicio.crop(512,0,512,512);
		boton_seleccion = new BufferedImage[2];
		boton_seleccion[0]=Boton_Seleccion.crop(0,0,512,512);
		boton_seleccion[1]=Boton_Seleccion.crop(512,0,512,512);
		
		
		
		
		
	}

}

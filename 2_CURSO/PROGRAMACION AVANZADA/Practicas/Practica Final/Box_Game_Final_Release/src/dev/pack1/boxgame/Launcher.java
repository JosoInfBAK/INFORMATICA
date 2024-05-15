/**
 * @author:Jose
 * Clase que corre por un hilo a parte que se encarga de lanzar la clase principal Game
 */

package dev.pack1.boxgame;


public class Launcher {
	public static void main(String[] args) {
		Game game = new Game("Mini_Boxing",900,900);
		game.start();
	}

}

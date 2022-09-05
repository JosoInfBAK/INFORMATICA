/**
 * @author Jose
 * Clase que se encarga de la gestion de variables entre otras clases
 */

package dev.pack1.boxgame;
import dev.pack1.boxgame.input.KeyManager;
import dev.pack1.boxgame.input.MouseManager;
import dev.pack1.boxgame.states.GameState;
import dev.pack1.boxgame.states.MainMenu;
import dev.pack1.boxgame.states.State;
import dev.pack1.boxgame.worlds.World;

public class Handler {
	private Game game;
	private World world;

	public Handler(Game game) {
		this.game=game;

	}

	//Setters y Getters
	public KeyManager getKeyManager(){

		return game.getKeyManager();
	}
	public MouseManager getMouseManager(){

		return game.getMouseManager();
	}
	public State getState() {
		return State.getState();
	}
	public State getGState() {
		return State.getState();
		
	}
	public int getWidth() {
		return game.getWidth();
	}

	public int getHeigth() {
		return game.getHeight();
	}
	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public World getWorld() {
		return world;
	}

	public void setWorld(World world) {
		this.world = world;
	}

}

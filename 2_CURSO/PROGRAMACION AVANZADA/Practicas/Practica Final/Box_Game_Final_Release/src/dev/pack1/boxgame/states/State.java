
//Esta clase indica en que estado del juego nos encontramos  como vamos a gestionar esos estados, util para el menu principal del juego
package dev.pack1.boxgame.states;

import java.awt.Graphics;

import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.sound.Sound;

public abstract class State {
	public Sound music;
	

	private static State currentState = null;
	
	
	public static void setState (State state) {
		currentState = state;
	}
	
	public static State getState(){
		
		return currentState;
		
			
	}
	
	//Esta parte solo describe la clase State
	
	protected Handler handler;
	public String path;
	
	public State (Handler handler) {
		
		this.handler=handler;
		
	}
	

	public abstract void tick();
	
	public abstract void render(Graphics g);

}

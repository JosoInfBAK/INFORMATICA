/**
 * @author: José María Fernández
 * Clase que se encarga de la funcionalidad de el fin del juego, esta clase contiene la logica para determinar el ganador del juego en funcion de los datos recabados por otros estado
 * tambien implementa la posibiidad de volver al menu principal
 * @param handler objeto que se encarga del manejo de variables entre clases
 */

package dev.pack1.boxgame.states;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;


import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.gfx.Text;
import dev.pack1.boxgame.sound.Sound;
import dev.pack1.boxgame.ui.ClickListener;
import dev.pack1.boxgame.ui.UIImageButton;
import dev.pack1.boxgame.ui.UIManager;
import dev.pack1.boxgame.worlds.World;

public class LosingScreen extends State{

	private UIManager uiManager;
	public int J2D,J1D;	
	private World world;
	private State mainmenu;
	public Sound end;
	public Game newGame;
	
	
	public LosingScreen(Handler handler){
		super(handler);
		world= new World(handler);
		handler.setWorld(world);
		uiManager=new UIManager(handler);
		handler.getMouseManager().setUIManager(uiManager);
		
		uiManager.addObject(new UIImageButton(350,150,200,200,Assets.botonHome,new ClickListener() {
			@Override
			public void onClick() {
				mainmenu = new GameMode(handler);
				System.out.println(handler.getGame().playerCount);
				State.setState(mainmenu);

				
			}}));
			
	

}
	

	@Override
	public void tick() {
		uiManager.tick();
	
		
	}
	


	@Override
	public void render(Graphics g) {
		world.render(g);
		g.setColor(Color.RED);
		g.setFont(new Font("ComicSans", Font.PLAIN, 50)); 
		uiManager.render(g);
		if(handler.getGame().highscore) {
			g.drawString("NEW HIGHSCORE",320, 500);
		}else {
			g.drawString("HIGHSCORE: "+handler.getGame().oldHigh+" By : "+handler.getGame().nameHigh,120, 500);
		}
		g.drawString("Game Over",320, 100);
			
			
		
	}
}
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

public class EndGame extends State{

	private UIManager uiManager;
	public int J2D,J1D;	
	private World world;
	private MainMenu mainmenu;
	public Sound end;
	public Game newGame;
	
	
	public EndGame(Handler handler){
		super(handler);
		end=new Sound();
		end.setFile("/sounds/Knockout.wav");
		end.play();
		world= new World(handler);
		handler.setWorld(world);
		uiManager=new UIManager(handler);
		handler.getMouseManager().setUIManager(uiManager);
		uiManager.addObject(new UIImageButton(350,150,200,200,Assets.botonHome,new ClickListener() {
			@Override
			public void onClick() {
				freeMem();
				mainmenu = new MainMenu(handler);
				System.out.println(handler.getGame().playerCount);
				State.setState(mainmenu);

				
			}}));
			
	

}
	
	
	

	@Override
	public void tick() {
		uiManager.tick();
	
		
	}
	/**
	 * @author josoj
	 * metodo que se encarga de borrar la memoria de objetos que no se van a utilizar mas
	 */
	private void freeMem() {
		handler.getGame().setButton1(false);
		handler.getGame().setButton2(false);
		handler.getGame().setButton3(false);
		handler.getGame().setButton1J2(false);
		handler.getGame().setButton2J2(false);
		handler.getGame().setButton3J2(false);
		handler.getGame().setButtonMap1(false);
		handler.getGame().setButtonMap2(false);
		handler.getGame().setButtonMap3(false);
		handler.getGame().menuState=null;
		handler.getGame().endGame=null;
		System.gc();	
	}
/**
 * @author josoj
 * metodo que dibuja en pantalla el fondo, texto y botones de la pantalla final
 */
	@Override
	public void render(Graphics g) {
		world.render(g);
		g.setColor(Color.RED);
		g.setFont(new Font("ComicSans", Font.PLAIN, 50)); 
		uiManager.render(g);
		if((handler.getGame().J11D&&handler.getGame().J12D)||(handler.getGame().J11D&&handler.getGame().J13D)||(handler.getGame().J12D&&handler.getGame().J13D)||(handler.getGame().J12D&&handler.getGame().J13D&&handler.getGame().J11D))
			g.drawString("JUGADOR 2 GANA",220, 100);
		else if((handler.getGame().J21D&&handler.getGame().J22D)||(handler.getGame().J21D&&handler.getGame().J23D)||(handler.getGame().J22D&&handler.getGame().J23D)||(handler.getGame().J22D&&handler.getGame().J23D&&handler.getGame().J21D))
			g.drawString("JUGADOR 2 GANA",220, 100);
			
			
		
	}
}
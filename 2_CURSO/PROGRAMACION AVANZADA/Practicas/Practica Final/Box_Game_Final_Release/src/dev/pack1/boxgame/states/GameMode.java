/**
 * @author: José María Fernández
 * Clase que se encarga de las funcionalidades del menu principal, estas son seleccionar el mapa y las categorias que implican diferentes atributos para los jugadores,
 * tambien se encarga de transicionar al siguiente estado por medio de un objeto boton, esto se logra implementando el patron command
 * @param handler objeto que se encarga del manejo de variables entre clases
 *  
 */
package dev.pack1.boxgame.states;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

import javax.swing.JOptionPane;

import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.gfx.Text;
import dev.pack1.boxgame.sound.Sound;
import dev.pack1.boxgame.ui.ClickListener;
import dev.pack1.boxgame.ui.UIImageButton;
import dev.pack1.boxgame.ui.UIManager;

public class GameMode extends State {
	private UIManager uiManager;
	private UIManager uiManager2;
	public State menuState;
	public State maintrainingMenu;
	public UIImageButton sel1,sel2,sel3,map1,map2,map3,sel1j2,sel2j2,sel3j2;
	private String categorias;
	private boolean boton1or2=false,again=true;
	public int i=0;


	public GameMode(Handler handler){
		super(handler);
		uiManager=new UIManager(handler);
		handler.getMouseManager().setUIManager(uiManager);
		addSel1Button();
		addSel2Button();
		
	}
	
	/**
	 *@author Jose
	 * FUNCIONES PARA AÑADIR LOS DIFERENTES BOTONES EN LA PANTALLA DE MENU PRINCIPAL
	 *
	 * */
	 
	private void addSel1Button() {
		uiManager.addObject(new UIImageButton(300,500,50,50,Assets.boton_seleccion,new ClickListener() {
			@Override
			public void onClick() {
				handler.getMouseManager().setUIManager(null);
				handler.getGame().asignacionAtributos();
				menuState = new MainMenu(handler);
				State.setState(menuState);
				handler.getGame().creaJugadores=true;


			}}));

	}
	
	private void addSel2Button() {
		uiManager.addObject(new UIImageButton(520,500,50,50,Assets.boton_seleccion,new ClickListener() {
			@Override
			public void onClick() {
				handler.getMouseManager().setUIManager(null);
				handler.getGame().asignacionAtributos();
				maintrainingMenu = new MainTrainingMenu(handler);
				State.setState(maintrainingMenu);
				handler.getGame().creaJugadores=true;
				

			}}));

	}
	
	
	public void tick() {
		uiManager.tick();
		

	}

/**
 * @author josoj
 * metodo que dibuja en pantalla el fondo, texto y botones
 */
	public void render(Graphics g) {
		g.drawImage(Assets.fondo[0], 0,0,900,900, null);
		uiManager.render(g);
		g.setColor(Color.RED);
		g.setFont(new Font("ComicSans", Font.PLAIN, 100)); 
		g.drawString("MINI BOXING",150, 100);
		g.setFont(new Font("ComicSans", Font.PLAIN, 50)); 
		g.drawString("Select Game Mode",250, 250);
		g.setFont(new Font("ComicSans", Font.PLAIN, 28)); 
		g.drawString("2 Players",250, 600);
		g.drawString("Training",500, 600);

	}




}

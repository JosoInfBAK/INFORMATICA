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
import javax.swing.JPanel;
import javax.swing.JTextField;

import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.gfx.Text;
import dev.pack1.boxgame.sound.Sound;
import dev.pack1.boxgame.ui.ClickListener;
import dev.pack1.boxgame.ui.UIImageButton;
import dev.pack1.boxgame.ui.UIManager;

public class MainTrainingMenu extends State {
	private UIManager uiManager;
	private UIManager uiManager2;
	public State training;
	public UIImageButton sel1,sel2,sel3,map1,map2,map3,sel1j2,sel2j2,sel3j2;
	private String categorias;
	private boolean boton1or2=false,again=true;
	public int i=0;


	public MainTrainingMenu(Handler handler){
		super(handler);
		uiManager=new UIManager(handler);
		handler.getMouseManager().setUIManager(uiManager);
		addJ1Buttons();
		addMainMenuButton();
		
	}

	/**
	 *@author Jose
	 * FUNCIONES PARA AÑADIR LOS DIFERENTES BOTONES EN LA PANTALLA DE MENU PRINCIPAL
	 *
	 * */

	private void addMainMenuButton() {
		uiManager.addObject(new UIImageButton(350,150,200,200,Assets.boton,new ClickListener() {
			@Override
			public void onClick() {
				handler.getMouseManager().setUIManager(null);
				handler.getGame().asignacionAtributos();
				training = new Training(handler);
				State.setState(training);
				handler.getGame().creaJugadores=true;

			}}));

	}


	private void addJ1Buttons() {
		sel1=new UIImageButton(100,600,40,40,Assets.boton_seleccion, new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButton1(true);



			}

		});

		uiManager.addObject(sel1);
		sel2=new UIImageButton(450,600,40,40,Assets.boton_seleccion, new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButton2(true);


			}

		});

		uiManager.addObject(sel2);
		sel3=new UIImageButton(750,600,40,40,Assets.boton_seleccion, new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButton3(true);


			}

		});


		uiManager.addObject(sel3);




	}


	public void tick() {
		uiManager.tick();
	}


	public void render(Graphics g) {
		g.drawImage(Assets.fondo[0], 0,0,900,900, null);
		uiManager.render(g);
		g.setColor(Color.WHITE);
		g.setColor(Color.RED);
		g.setFont(new Font("ComicSans", Font.PLAIN, 28)); 
		g.drawString("Light-Weight",60, 500);
		g.drawString("Welter-Weight",390, 500);
		g.drawString("Heavy-Weight",690, 500);
		g.setFont(new Font("ComicSans", Font.PLAIN, 100)); 
		g.drawString("MINI BOXING",150, 100);
		g.setFont(new Font("ComicSans", Font.PLAIN, 50)); 





	}



}

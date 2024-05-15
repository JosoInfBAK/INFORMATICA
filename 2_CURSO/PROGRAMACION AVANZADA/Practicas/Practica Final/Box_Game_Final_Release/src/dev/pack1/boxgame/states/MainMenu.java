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

import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.gfx.Text;
import dev.pack1.boxgame.sound.Sound;
import dev.pack1.boxgame.ui.ClickListener;
import dev.pack1.boxgame.ui.UIImageButton;
import dev.pack1.boxgame.ui.UIManager;

public class MainMenu extends State {
	private UIManager uiManager;
	private UIManager uiManager2;
	public State gameState;
	public UIImageButton sel1,sel2,sel3,map1,map2,map3,sel1j2,sel2j2,sel3j2;
	private String categorias;
	private boolean boton1or2=false,again=true;
	public int i=0;


	public MainMenu(Handler handler){
		super(handler);
		uiManager=new UIManager(handler);
		uiManager2=new UIManager(handler);
		handler.getMouseManager().setUIManager(uiManager);
		addJ1Buttons();
		addMapButtons();
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
				gameState = new GameState(handler);
				State.setState(gameState);
				handler.getGame().creaJugadores=true;

			}}));

	}
	
	private void addMapButtons() {
		map1=new UIImageButton(100,800,40,40,Assets.boton_seleccion,new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButtonMap1(true);




			}});
		uiManager.addObject(map1);

		map2=new UIImageButton(450,800,40,40,Assets.boton_seleccion,new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButtonMap2(true);


			}});

		uiManager.addObject(map2);
		map3=new UIImageButton(750,800,40,40,Assets.boton_seleccion,new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButtonMap3(true);


			}});
		uiManager.addObject(map3);

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

	private void addJ2Buttons() {
		sel1j2=new UIImageButton(100,600,40,40,Assets.boton_seleccion, new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButton1J2(true);



			}

		});


		sel2j2=new UIImageButton(450,600,40,40,Assets.boton_seleccion, new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButton2J2(true);


			}

		});


		sel3j2=new UIImageButton(750,600,40,40,Assets.boton_seleccion, new ClickListener() {

			@Override
			public void onClick() {
				handler.getGame().setButton3J2(true);



			}

		});




	}
	/**
	 * @author Jose
	 * FUNCION PARA CAMBIAR LOS BOTONES UNA VEZ SELECCIONADO EL PRIMER JUGADOR
	 * */
	
	private boolean checkChangeButtons(){
		if(handler.getGame().isButton1() || handler.getGame().isButton2() || handler.getGame().isButton3()) {
			return true;
		}

		return false;	
	}
	private void changeButtons(boolean check) {
		if (check) {
			addJ2Buttons();
			uiManager.removeObject(sel1);
			uiManager.removeObject(sel2);
			uiManager.removeObject(sel3);
			uiManager.addObject(sel1j2);
			uiManager.addObject(sel2j2);
			uiManager.addObject(sel3j2);
		}
		else addJ1Buttons();

	}
	/**
	 * @author Jose
	 * FUNCION PARA MODIFICAR EL TEXTO POR PANTALLA UNA VEZ SE ACTUALICEN OS BOTONES
	 * @return texto por pantalla
	 */
	private String returnCat() {
		if(checkChangeButtons()) {
			return"Categoria J2";
		}

		else return"Categoria J1"; 
	}
	
	public void tick() {
		uiManager.tick();
		boton1or2=checkChangeButtons();
		uiManager2.tick();	
		if(boton1or2&&again) {	
			addJ2Buttons();
			uiManager.removeObject(sel1);
			uiManager.removeObject(sel2);
			uiManager.removeObject(sel3);
			uiManager.addObject(sel1j2);
			uiManager.addObject(sel2j2);
			uiManager.addObject(sel3j2);
			again=false;
		}

	}


	public void render(Graphics g) {
		g.drawImage(Assets.fondo[0], 0,0,900,900, null);
		uiManager.render(g);
		uiManager2.render(g);
		g.setColor(Color.RED);
		g.setFont(new Font("ComicSans", Font.PLAIN, 28)); 
		g.drawString("Light-Weight",60, 500);
		g.drawString("Welter-Weight",390, 500);
		g.drawString("Heavy-Weight",690, 500);
		g.drawString("Map-1",80, 700);
		g.drawString( "Map-2",420, 700);
		g.drawString("Map-3",720, 700);
		g.setFont(new Font("ComicSans", Font.PLAIN, 100)); 
		g.drawString("MINI BOXING",150, 100);
		g.setFont(new Font("ComicSans", Font.PLAIN, 50)); 
		g.drawString(returnCat(),300, 420);
		
		



	}
	public  State getGState() {
		return gameState;
	}



}

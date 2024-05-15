package dev.pack1.boxgame.states;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;

import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.boxeadores.Boxeador;
import dev.pack1.boxgame.boxeadores.categoria.Jugador;
import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.gfx.Text;
import dev.pack1.boxgame.states.State;
import dev.pack1.boxgame.ui.UIManager;
import dev.pack1.boxgame.worlds.World;
import dev.pack1.boxgame.sound.Sound;

public class Round3 extends State {

	private Jugador player;
	private UIManager uiManager;
	private Jugador player2;
	private World world;
	private String categoria1;
	private String categoria2;
	private boolean defJ1=false,hitJ1=false;
	private boolean defJ2=false,hitJ2=false,printH=false;
	public boolean move,st1=false,st2=false;
	public boolean j1Limit=false,j2Limit=false;
	public String path;
	private long lastTime,timer=0,timerS=0,lastTimeS;
	public int J2D,J1D,health,naturalStrength;
	public float speed;
	public Sound soundHit,soundBlock,ding;
	public EndGame endGame;	

	public Round3(Handler handler){
		super(handler);
		soundHit=new Sound();
		soundHit.setFile("/sounds/hit.wav");
		soundBlock=new Sound();
		soundBlock.setFile("/sounds/block.wav");
		world= new World(handler);
		handler.setWorld(world);	
		uiManager=new UIManager(handler);
		handler.getMouseManager().setUIManager(uiManager);
		crearJugadores();
		
		
		
	
	}
		
	
		


	public void crearJugadores() {
		player=  player.getInstance(handler,0,"izqda",handler.getGame().health,handler.getGame().naturalStrength,handler.getGame().speed,handler.getGame().tamX1,handler.getGame().tamY1);	
		player2= player2.getInstance(handler,570,"dcha",handler.getGame().health2,handler.getGame().naturalStrength2,handler.getGame().speed2,handler.getGame().tamX2,handler.getGame().tamY2);
		System.out.println(handler.getGame().playerCount);
	}
	




	public boolean CollisionDetector() {

	
		if(((player.getX()+120>=player2.getX()-120) && (handler.getKeyManager().hit1 || handler.getKeyManager().hit2))) {
			if(handler.getKeyManager().block1){
				defJ1=true;
			}else if((handler.getKeyManager().hit1 && !handler.getKeyManager().block2)&&player.checkAlive()) {
				hitJ1=true;
			}else hitJ1=false;
			if(handler.getKeyManager().block2){
				defJ2=true;
			}else if((handler.getKeyManager().hit2 &&!handler.getKeyManager().block1)&&player2.checkAlive()) {
				hitJ2=true;
			}else hitJ2=false;
			return true;
			

		}else {

			defJ1=false;
			defJ2=false;
			hitJ1=false;
			hitJ2=false;
			return false;
		
	}
	}

	public void LimitDetector() {
		
		if((player.getX()+120>=player2.getX()-120)) {
			player.enMovef=false;
			player2.enMoveb=false;
		}else {
			player.enMovef=true;
			player2.enMoveb=true;
		}
		if(player.getX()<=-119) {
			player.enMoveb=false;
		}else player.enMoveb=true;
		
		if(player2.getX()>=720) {
			player2.enMovef=false;
		}else player2.enMovef=true;

	}
	
	

	public void DeduccionSalud() {

		if(hitJ1&&player2.checkAlive()) {
			player2.setHealth(player2.getHealth()-1*handler.getGame().naturalStrength);
			soundHit.play();
		}
		if(defJ1) {
			soundBlock.play();
		}
		if(defJ2) {
			soundBlock.play();	
		}

		if(hitJ2 && player.checkAlive()) {
			player.setHealth(player.getHealth()-1*handler.getGame().naturalStrength2);
			soundHit.play();
		}
	}








	@Override
	public void tick() {
		world.tick();
		if(handler.getGame().creaJugadores) {
		CollisionDetector();
		lastTimeS=System.currentTimeMillis();
		if(CollisionDetector()) {
		timerS+=System.currentTimeMillis()-lastTimeS;
		lastTimeS=System.currentTimeMillis();
		timerS++;
		if(timerS>10) {
			DeduccionSalud();
			timerS=0;
		}
			
		}
		LimitDetector();
		}
		if(player.checkAlive()&&handler.getGame().creaJugadores) {
			player.tick();
		}else handler.getGame().J12D=true;
		if(player2.checkAlive()&&handler.getGame().creaJugadores) {
			player2.tick();
		}else handler.getGame().J22D=true;
		if(handler.getKeyManager().r && handler.getKeyManager().e) 
			State.setState(handler.getGame().resetGame);
		lastTime=System.currentTimeMillis();
		if((!player.checkAlive() || !player2.checkAlive())&&handler.getGame().creaJugadores) {
			timer+=System.currentTimeMillis()-lastTime;
			lastTime=System.currentTimeMillis();
			timer++;
			if(timer>70) {
				handler.getGame().playerCount=0;
				player=null;
				player2=null;
				world=null;
				System.gc();
				if(player!=null||player2!=null) {
					System.out.println("Jugador no eliminado");	
				}
				endGame=new EndGame(handler);
				State.setState(endGame);
			}

		} 
		






	}

	@Override
	public void render(Graphics g) {
		world.render(g);
		player.render(g);
		player2.render(g);
		g.setColor(Color.RED);
		g.setFont(new Font("ComicSans", Font.PLAIN, 40)); 
		g.drawString("Salud J1:" + (int)player.getHealth(),20,100);
		g.drawString("Salud J2:" + (int)player2.getHealth(),650,100);
		g.setFont(new Font("ComicSans", Font.PLAIN, 75)); 
		g.drawString("Round 3",300, 100);




	}




}

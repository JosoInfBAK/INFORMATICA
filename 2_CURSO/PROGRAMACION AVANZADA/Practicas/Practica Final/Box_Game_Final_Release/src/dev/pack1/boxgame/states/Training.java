/**
 * @author: José María Fernández
 * Clase que se encarga de la funcionalidad de juego del round 1, en esta clase se definen los jugadores y el comportamiento de estos 
 * tambien se definen la transicion al estado siguiente dependiendo de los eventos del estado actual
 * @param handler objeto que se encarga del manejo de variables entre clases
 *  
 */
package dev.pack1.boxgame.states;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

import javax.swing.JOptionPane;

import org.bson.Document;

import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.boxeadores.categoria.Bag;
import dev.pack1.boxgame.boxeadores.categoria.Jugador;
import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.sound.Sound;
import dev.pack1.boxgame.ui.UIManager;
import dev.pack1.boxgame.worlds.World;

public class Training extends State {

	public Jugador player;
	private UIManager uiManager;
	public Jugador player2;
	private World world;
	private long lastTime,timer=0,timerS=0,lastTimeS;
	private boolean hitJ1=false;
	public float damageCounter=0;
	public boolean move,st1=false,st2=false;
	public boolean j1Limit=false,j2Limit=false;
	public String path;
	private int cont;
	public Bag bag;
	public int J2D,J1D,Pticks;//health,naturalStrength,Pticks;
	public float speed;
	public Sound soundHit,soundBlock,ding;
	private long createdMillis = System.currentTimeMillis();
	private int int_random ;
	private long nowMillis;
	public State mainTraining;
	private boolean naranja;
	private String color;
	ArrayList<Double> temp = new ArrayList<Double>();
	ArrayList<String> names = new ArrayList<String>();


	public Training(Handler handler){
		super(handler);
		world= new World(handler);
		handler.setWorld(world);

		manageSounds();
		uiManager=new UIManager(handler);
		handler.getMouseManager().setUIManager(uiManager);
		crearJugadores();
		GenRandom();
	}


	public void crearJugadores() {
		player=  player.getInstance(handler,0,"izqda",handler.getGame().health,handler.getGame().naturalStrength,handler.getGame().speed,handler.getGame().tamX1,handler.getGame().tamY1);	
		bag= bag.getInstance();
		System.out.println(handler.getGame().playerCount);
	}

	public void ConnectMongo() {
		try {
			MongoClientURI uri = new MongoClientURI("mongodb+srv://joso:123456abc@cluster0.6xzff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
			MongoClient mongo = new MongoClient(uri);
			MongoDatabase database = mongo.getDatabase("Boxing");
			MongoCollection<Document> collection = database.getCollection("Scores");
			FindIterable<Document>  cursor =collection.find();
			for (Document document : cursor) {
				//System.out.println(document.get("Score"));
				//System.out.println((double)(document.get("Score")));
				temp.add( (double)document.get("Score"));
				names.add((String)document.get("Username"));
				
			}
			System.out.println(Collections.max(temp));
			 if((double)damageCounter >= Collections.max(temp)) {
				 handler.getGame().highscore=true;
				System.out.println("Highscore");
			}else {
				 handler.getGame().highscore=false;
				 handler.getGame().oldHigh=Collections.max(temp);
				 handler.getGame().nameHigh=names.get(temp.indexOf(Collections.max(temp)));
				System.out.println("Not highscore");
			} 
			collection.insertOne(new Document("Username",handler.getGame().thisName).append("Score", (double)damageCounter));
			mongo.close();
		}catch(MongoException e) {
			e.printStackTrace();
		}
	}
	public void manageSounds() {
		/*ding= new Sound();
		ding.setFile("res/sounds/ding.wav");
		//ding.play();
		soundHit= new Sound();
		soundHit.setFile("res/sounds/hit.wav");
		soundBlock= new Sound();
		soundBlock.setFile("res/sounds/block.wav");*/

	}





	public boolean CollisionDetector() {


		if(((player.getX()+120>=bag.getX()-90) && (handler.getKeyManager().hit1))) {
			if(handler.getKeyManager().block1){
			}else if((handler.getKeyManager().hit1 && !handler.getKeyManager().block2)&&player.checkAlive()) {
				hitJ1=true;
			}else hitJ1=false;
			return true;


		}else {

			hitJ1=false;
			return false;

		}
	}

	public void LimitDetector() {

		if((player.getX()+120>=bag.getX()-90)) {
			player.enMovef=false;
		}else {
			player.enMovef=true;
		}


		if(player.getX()<=-119) {
			player.enMoveb=false;
		}else player.enMoveb=true;


	}



	public void DeduccionSalud() {

		if(hitJ1) {
			damageCounter+=(1*handler.getGame().naturalStrength);
			//soundHit.play();
		}


	}

	public int GenRandom() {
		Random rand = new Random(); //instance of random class
		int upperbound = 10;
		int_random = rand.nextInt(upperbound);
		return int_random;
	}






	@Override
	public void tick() {
		world.tick();
		player.tick();
		LimitDetector();



		if(cont==int_random) {
			GenRandom();
			cont=0;
			createdMillis=System.currentTimeMillis();
			naranja=true;
		}else {
			nowMillis = System.currentTimeMillis();
			cont= (int)((nowMillis - this.createdMillis) / 1000);
			if((cont==1)&&naranja) {
				color="Rojo";
				if(hitJ1) {
					System.out.println("Has perdido");
					ConnectMongo();
					State.setState(new LosingScreen(handler));

				}
			}else if(cont==0&&naranja){
				color="Naranja";

			}else color="verde";
		}



		if(handler.getGame().creaJugadores) {
			CollisionDetector();
			lastTimeS = System.currentTimeMillis();
			if(CollisionDetector()) {
				timerS+=System.currentTimeMillis()-lastTimeS;
				lastTimeS=System.currentTimeMillis();
				timerS++;
				if(timerS>10) {
					DeduccionSalud();
					timerS=0;
				}
			}

		}





	}

	@Override
	public void render(Graphics g) {
		world.render(g);
		player.render(g);
		bag.render(g);
		g.setColor(Color.RED);
		g.setFont(new Font("ComicSans", Font.PLAIN, 40)); 
		g.drawString("Salud J1:" + (int)player.getHealth(),20,100);
		g.setFont(new Font("ComicSans", Font.PLAIN, 28)); 
		g.drawString("Damage:"+(int)damageCounter,650, 100);
		g.setFont(new Font("ComicSans", Font.PLAIN, 50)); 
		g.drawString("Time:"+(int)cont,350, 100);
		if(color!=null) {
			switch(color) {
			case "verde" :g.drawImage(Assets.green,380,150,100,100,null);
			break;
			case "Naranja":g.drawImage(Assets.yellow,380,152,100,100,null);
			break;
			case "Rojo":g.drawImage(Assets.red,380,160,100,100,null);
			break;
			}
		}
	}





}

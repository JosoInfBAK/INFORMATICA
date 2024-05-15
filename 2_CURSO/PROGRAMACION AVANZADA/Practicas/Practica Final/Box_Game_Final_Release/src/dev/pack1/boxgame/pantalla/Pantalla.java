package dev.pack1.boxgame.pantalla;
import java.awt.Canvas;
import java.awt.event.WindowListener;
import java.awt.event.WindowEvent;
import java.awt.Dimension;
import java.awt.event.WindowAdapter;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.gfx.Assets;
public class Pantalla {
	private JFrame frame;
	private Canvas lienzo;
	private Handler handler;
	MongoClientURI uri = new MongoClientURI("mongodb+srv://joso:123456abc@cluster0.6xzff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
	MongoClient mongo = new MongoClient(uri);
	MongoDatabase database = mongo.getDatabase("Boxing");
	MongoCollection<Document> collection = database.getCollection("OnlinePlayers");
	private String title,name;
	private int width, height;
	public boolean exit=false;
	
	public Pantalla(String title,int width,int height,Handler handler) {
		this.title=title;
		this.width=width;
		this.height=height;
		this.handler=handler;
		name=handler.getGame().thisName;
		System.out.println(name);
		formarPantalla();
		
	}
	
	private void formarPantalla(){
		frame= new JFrame(title);
		frame.setSize(width,height);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		WindowListener listener = new WindowAdapter() {
	         public void windowClosing(WindowEvent evt) {
	            JFrame frame = (JFrame) evt.getSource();
	            collection.deleteOne(new Document("Username",name));
	         }
	      };
	    frame.addWindowListener(listener);
		frame.setResizable(true);
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
		lienzo= new Canvas();
		lienzo.setPreferredSize(new Dimension(width,height));
		lienzo.setMaximumSize(new Dimension(width,height));
		lienzo.setMinimumSize(new Dimension(width,height));
		lienzo.setFocusable(false);
		
		frame.add(lienzo);
		frame.pack();
		
		
	}
	
	
	public void addTextBox() {
		
		JPanel panel = new JPanel();
		 JTextField textField;
		 textField = new JTextField(8);
		 panel.add(textField);
		 panel.setVisible(true);
	}
	
	public Canvas getCanvas() {
		return lienzo;
		}
	public JFrame getFrame() {
		return frame;
		
	}
}




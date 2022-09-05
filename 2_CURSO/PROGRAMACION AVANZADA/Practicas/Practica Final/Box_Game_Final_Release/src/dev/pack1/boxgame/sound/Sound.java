package dev.pack1.boxgame.sound;
import java.io.*;
import javax.sound.sampled.*;


public class Sound {
  Clip clip;
  
  	public Sound() {
  		
  	};
  
  
  	public void setFile(String path) {
  		
  		try{
  			File file = new File(path);
  			AudioInputStream sound = AudioSystem.getAudioInputStream(getClass().getResource(path));
  			clip = AudioSystem.getClip();
  			clip.open(sound);
  		}catch(Exception e) {
  			
  		}
  		
  	}
  	
  	
  	public void play() {
  		
  		clip.setFramePosition(0);
  		clip.start();
  	
 
  		
  	}
	public void playM() {
  		
  		clip.setFramePosition(0);
  		clip.start();
  		clip.loop(1000000);
	}

	public void stop() {
  	
  		clip.close();
  		
  		
  	}
	
	
}
package dev.pack1.boxgame.input;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyManager implements KeyListener {
	
	private boolean[] keys;
	public boolean forward, back,forward2, back2;
	public boolean hit1,block1;
	public boolean hit2,block2,e,r;
	public long lastTimeHit1;
	public int timer;

	
	public KeyManager() {

		keys= new boolean [250];
	}
	public void tick() {
		forward = keys[KeyEvent.VK_D];
		back = keys[KeyEvent.VK_A];
		forward2 = keys[KeyEvent.VK_RIGHT];
		back2 = keys[KeyEvent.VK_LEFT];
		
		hit1=keys[KeyEvent.VK_W];
		hit2=keys[KeyEvent.VK_UP];
		
		block2=keys[KeyEvent.VK_DOWN];
		block1=keys[KeyEvent.VK_S];
		r=keys[KeyEvent.VK_R];
		e=keys[KeyEvent.VK_E];
		
	}
	@Override
	public void keyTyped(KeyEvent e) {
		
		
	}

	@Override
	public void keyPressed(KeyEvent e) {
		
		keys[e.getKeyCode()] = true;
		
	}

	@Override
	public void keyReleased(KeyEvent e) {
		keys[e.getKeyCode()] = false;
		
		
	}

}

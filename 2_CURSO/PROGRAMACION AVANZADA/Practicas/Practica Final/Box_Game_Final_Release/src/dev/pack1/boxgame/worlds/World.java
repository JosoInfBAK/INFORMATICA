
package dev.pack1.boxgame.worlds;

import java.awt.Graphics;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;

import dev.pack1.boxgame.Game;
import dev.pack1.boxgame.Handler;
import dev.pack1.boxgame.gfx.Animation;
import dev.pack1.boxgame.gfx.Assets;
import dev.pack1.boxgame.gfx.ImageLoader;
import dev.pack1.boxgame.gfx.SpriteSheet;
import dev.pack1.boxgame.utils.Utils;

public class World {
	private Handler handler;
	private int width,height;
	protected static  Rectangle worldBounds;
	
	public World(Handler handler) {
		this.handler=handler;
		worldBounds = new Rectangle(0,0,width,height);
		loadWorld();
		
	}
	

	public void tick() {
		
	}
	
	
	private BufferedImage loadWorld() {
		
		width=900;
		height=900;
		if(handler.getGame().isButtonMap1())
		return Assets.fondo[0];
		if(handler.getGame().isButtonMap2())
			return Assets.fondo[1];
		if(handler.getGame().isButtonMap3())
			return Assets.fondo[2];
		return Assets.fondo[0];
	
	}
	
	public void render(Graphics g) {
		
	
		g.drawImage(loadWorld(), 0,0,width, height, null);
		
	}


	public static int getWorldBounds() {
		return worldBounds.x;
	}


	public static void setWorldBounds(Rectangle worldBounds) {
		World.worldBounds = worldBounds;
	}
	
	
}

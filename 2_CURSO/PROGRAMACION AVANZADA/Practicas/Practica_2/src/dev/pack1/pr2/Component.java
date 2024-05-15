package dev.pack1.pr2;

public abstract class Component {
	
	protected int pin;
	protected eGPIO	 pinMode;
	protected ePinState pinState;
	
	public  Component(int pin ,eGPIO pinMode) {
		
	}
	
	public abstract String doTask();

}

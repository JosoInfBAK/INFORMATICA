package dev.pack1.componentes;

import dev.pack1.pr2.Actuator;
import dev.pack1.pr2.Component;
import dev.pack1.pr2.eGPIO;

public class LED  extends Component  implements Actuator {
	
	

	public LED(int pin, eGPIO pinMode) {
		super(pin, pinMode);
		
		
	}

	@Override
	public void start() {
		
	}

	@Override
	public void stop() {
		
	}
	
	public String doTask() {
		return null;
		
	}
	
	

}

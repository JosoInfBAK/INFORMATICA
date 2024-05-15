package dev.pack1.pr2;

import java.util.ArrayList;

public enum ComponentList{
	LED,IR,Buzzer;


	public static String[] getItems() {
		ComponentList[] Components = ComponentList.values();

		ArrayList<String> stringComp = new ArrayList<String>();

		for(ComponentList comp : Components) {

			stringComp.add(comp.toString());

		}

		Object[] obj = stringComp.toArray();

		String [] stock = new String[obj.length];



		for (int i=0; i<obj.length;i++) {

			stock[i] = (String) obj[i];

		}



		return stock;
}

}

#Juego Boxeo tipo arcade
##Desarrollado por José María Fernández Gómez
###Ejecución:
java -jar Box_Game.jar or open .jar archive
###Descripción:
Juego de Boxeo tipo arcade que incluye dos modos de juego. El primero de los modeos de juego es de  dos jugadores que competirán 
el uno contra el otro en el mismo dispositivo. 
#### Controles J1:  
		Movimiento con teclas A y D, golpeo con tecla W y defensa con tecla S
#### Controles J2:  
		Movimiento con teclas(Flecha izquierda) y (Flecha derecha), golpeo con tecla (Flecha arriba) y defensa con tecla (Flecha abajo)
		
		
Segundo modo de juego es de un solo jugador que tendra que alcanzar la mayor puntiacion posible golpeando al sacon mientras el semáforo no este en rojo.
Este modo de juego está vinculado a una base de datos por lo que cualquier jugador podrá competir contra todos los jugadores anteriores tratando de mejorar
su puntuación.
####Controles:
	    Igual que el anterior modo de juego
###Dependencias:
		Las dependencias deberían venir ya incluidas en la carpeta /res/dep en caso de error solo tendrán que añadirse 4 Jars externos
		1.- bson-3.2.2-javadoc
		2.- mongodb-driver-3.2.2-javadoc
		3.- mongodb-driver-core-3.2.2-javadoc
		4.- mongo-java-driver-3.7.0-rc0
###Referencias:
	       El motor básico del juego está basado en el tutorial realizado por CodeNmore
	       Link Youtube :https://www.youtube.com/watch?v=dEKs-3GhVKQ&list=PLah6faXAgguMnTBs3JnEJY0shAc18XYQZ&ab_channel=CodeNMore
	       Link Github:https://codenmore.github.io/
	       Las clases que se encargan de cargar el sonido fueron desarrolladas por Bilesh Ganguly
	       Link StackOverflow:https://stackoverflow.com/a/26318
	       Todo lo demás ha sido desarrollado por José María Fernández Gómez
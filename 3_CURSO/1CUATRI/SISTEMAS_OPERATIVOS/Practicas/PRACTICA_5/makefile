C=gcc
CFLAGS=-c
<<<<<<< HEAD
LDFLAGS= -ansi -pedantic 
=======
LDFLAGS=
>>>>>>> fb57f0e66bad8fccfeb1418a28fb8fd630fa3f74
EXECUTABLE=Ej1 Ej2 Ej3
SOURCES = Ej1.c Ej2.c Ej3.c
HEADERS=

all : $(EXECUTABLE)

Ej1: $(SOURCES)
	 @echo -n Compilando el Ejecutable \'$@\' ...
	 @$(CC) $(LDFLAGS) Ej1.c -o $@
	@echo [OK]

Ej2: $(SOURCES)
	 @echo -n Compilando el Ejecutable \'$@\' ...
	 @$(CC) $(LDFLAGS) Ej2.c -o $@
	@echo [OK]

Ej3: $(SOURCES)
	 @echo -n Compilando el Ejecutable \'$@\' ...
	 @$(CC) $(LDFLAGS) Ej3.c -o $@
	@echo [OK]
<<<<<<< HEAD
	 
=======

>>>>>>> fb57f0e66bad8fccfeb1418a28fb8fd630fa3f74
clean:
	 @echo -n limpiando proyecto ...
	@rm -f $(wildcard *.o *.d core* *.P) $(EXECUTABLE)
	@echo [OK]

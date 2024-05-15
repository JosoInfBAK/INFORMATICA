C=gcc
CFLAGS=-c 
<<<<<<< HEAD
LDFLAGS= -pthread -g -O0
EXECUTABLE=Ej1 Ej2 Ej2Bis
SOURCES = Ej1.c Ej2Bis.c Ej2.c
HEADERS= Buffer.h
=======
LDFLAGS= -pthread
EXECUTABLE=Ej1 Ej2
SOURCES = Ej1.c Ej2.c
HEADERS= 
>>>>>>> 9f3e5cab25b973b6610a718aa8e1a832f0f60b31

all : $(EXECUTABLE)

Ej1: $(SOURCES)
	 @echo -n Compilando el Ejecutable \'$@\' ...
	 @$(CC) $(LDFLAGS) Ej1.c -o $@
	@echo [OK]

Ej2: $(SOURCES)
	@echo -n Compilando el Ejecutable \'$@\' ...
	@$(CC) $(LDFLAGS) Ej2.c -o $@
	@echo [OK]

	
clean:
	 @echo -n limpiando proyecto ...
	@rm -f $(wildcard *.o *.d core* *.P) $(EXECUTABLE)
	@echo [OK]

C=gcc
CFLAGS=-c
LDFLAGS= -ansi -pedantic -O3 -std=c99
EXECUTABLE=Ej1 
SOURCES = Ej1.c 
HEADERS=

all : $(EXECUTABLE)

Ej1: $(SOURCES)
	 @echo -n Compilando el Ejecutable \'$@\' ...
	 @$(CC) $(LDFLAGS) Ej1.c -o $@
	@echo [OK]

clean:
	 @echo -n limpiando proyecto ...
	@rm -f $(wildcard *.o *.d core* *.P) $(EXECUTABLE)
	@echo [OK]

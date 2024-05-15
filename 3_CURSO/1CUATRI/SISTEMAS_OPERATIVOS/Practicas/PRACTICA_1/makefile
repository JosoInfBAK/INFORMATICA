C=gcc
CFLAGS=-c
LDFLAGS= -ansi -pedantic -Wall -Wextra -Winit-self -O3 -std=c99
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
	@echo -n Compilando el ejecutable \'$@\' ...
	@$(CC) $(LDFLAGS) Ej3.c -o $@
	@echo [OK]
clean:
	 @echo -n limpiando proyecto ...
	@rm -f $(wildcard *.o *.d core* *.P) $(EXECUTABLE)
	@echo [OK]

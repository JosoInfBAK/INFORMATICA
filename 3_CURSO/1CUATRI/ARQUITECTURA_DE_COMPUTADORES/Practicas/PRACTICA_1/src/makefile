C= mpicc
CFLAGS=
LDFLAGS=
EXECUTABLE= ejercicio1 ejercicio2 ejercicio3
SOURCES = ejercicio1.c ejercicio2.c ejercicio3.c
HEADERS=

all : $(EXECUTABLE)

ejercicio1: $(SOURCES)
	 @echo -n Compilando el Ejecutable \'$@\' ...
	 @mpicc ejercicio1.c -o $@
	@echo [OK]

ejercicio2: $(SOURCES)
	@echo -n Compilando el Ejecutable \'$@\' ...
	@mpicc ejercicio2.c -o $@
	@echo [OK]

ejercicio3: $(SOURCES)
	@echo -n Compilando el ejecutable \'$@\' ...
	@mpicc ejercicio3.c -o $@
	@echo [OK]
clean:
	 @echo -n limpiando proyecto ...
	@rm -f $(wildcard *.o *.d core* *.P) $(EXECUTABLE)
	@echo [OK]

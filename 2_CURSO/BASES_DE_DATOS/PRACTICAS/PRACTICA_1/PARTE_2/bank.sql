-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: bank
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asesor`
--

DROP TABLE IF EXISTS `asesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesor` (
  `id_cliente` int NOT NULL,
  `id_empleado` int DEFAULT NULL,
  `tipo` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `asesor_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `asesor_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor`
--

LOCK TABLES `asesor` WRITE;
/*!40000 ALTER TABLE `asesor` DISABLE KEYS */;
/*!40000 ALTER TABLE `asesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL,
  `nombre_cliente` varchar(30) DEFAULT NULL,
  `calle_cliente` varchar(30) DEFAULT NULL,
  `ciudad_cliente` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta` (
  `numero_cuenta` int NOT NULL,
  `saldo` int DEFAULT NULL,
  PRIMARY KEY (`numero_cuenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta`
--

LOCK TABLES `cuenta` WRITE;
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta_corriente`
--

DROP TABLE IF EXISTS `cuenta_corriente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta_corriente` (
  `numero_cuenta` int NOT NULL,
  `importe_descubierto` double DEFAULT NULL,
  PRIMARY KEY (`numero_cuenta`),
  CONSTRAINT `cuenta_corriente_ibfk_1` FOREIGN KEY (`numero_cuenta`) REFERENCES `cuenta` (`numero_cuenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta_corriente`
--

LOCK TABLES `cuenta_corriente` WRITE;
/*!40000 ALTER TABLE `cuenta_corriente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuenta_corriente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `id_empleado` int NOT NULL,
  `nombre_empleado` varchar(30) DEFAULT NULL,
  `numero_telefono` int DEFAULT NULL,
  `fecha_contatacio` date DEFAULT NULL,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impositor`
--

DROP TABLE IF EXISTS `impositor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impositor` (
  `id_cliente` int NOT NULL,
  `numero_cuenta` int NOT NULL,
  PRIMARY KEY (`id_cliente`,`numero_cuenta`),
  KEY `numero_cuenta` (`numero_cuenta`),
  CONSTRAINT `impositor_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `impositor_ibfk_2` FOREIGN KEY (`numero_cuenta`) REFERENCES `cuenta` (`numero_cuenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impositor`
--

LOCK TABLES `impositor` WRITE;
/*!40000 ALTER TABLE `impositor` DISABLE KEYS */;
/*!40000 ALTER TABLE `impositor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `numero_prestamo` int NOT NULL,
  `numero_pago` int NOT NULL,
  `fecha_pago` date DEFAULT NULL,
  `importe_pago` int DEFAULT NULL,
  PRIMARY KEY (`numero_prestamo`,`numero_pago`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`numero_prestamo`) REFERENCES `prestamo` (`numero_prestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo`
--

DROP TABLE IF EXISTS `prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamo` (
  `numero_prestamo` int NOT NULL,
  `importe` int DEFAULT NULL,
  PRIMARY KEY (`numero_prestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestatario`
--

DROP TABLE IF EXISTS `prestatario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestatario` (
  `id_cliente` int NOT NULL,
  `numero_prestamo` int NOT NULL,
  `fecha_acceso` date DEFAULT NULL,
  PRIMARY KEY (`id_cliente`,`numero_prestamo`),
  KEY `numero_prestamo` (`numero_prestamo`),
  CONSTRAINT `prestatario_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `prestatario_ibfk_2` FOREIGN KEY (`numero_prestamo`) REFERENCES `prestamo` (`numero_prestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestatario`
--

LOCK TABLES `prestatario` WRITE;
/*!40000 ALTER TABLE `prestatario` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestatario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal`
--

DROP TABLE IF EXISTS `sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursal` (
  `nombre_sucursal` varchar(30) NOT NULL,
  `ciudad_sucursal` varchar(20) DEFAULT NULL,
  `activos` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`nombre_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal_cuenta`
--

DROP TABLE IF EXISTS `sucursal_cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursal_cuenta` (
  `nombre_sucursal` varchar(20) DEFAULT NULL,
  `numero_cuenta` int DEFAULT NULL,
  KEY `numero_cuenta` (`numero_cuenta`),
  KEY `nombre_sucursal` (`nombre_sucursal`),
  CONSTRAINT `sucursal_cuenta_ibfk_1` FOREIGN KEY (`numero_cuenta`) REFERENCES `cuenta` (`numero_cuenta`),
  CONSTRAINT `sucursal_cuenta_ibfk_2` FOREIGN KEY (`nombre_sucursal`) REFERENCES `sucursal` (`nombre_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal_cuenta`
--

LOCK TABLES `sucursal_cuenta` WRITE;
/*!40000 ALTER TABLE `sucursal_cuenta` DISABLE KEYS */;
/*!40000 ALTER TABLE `sucursal_cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal_prestamo`
--

DROP TABLE IF EXISTS `sucursal_prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursal_prestamo` (
  `numero_prestamo` int NOT NULL,
  `nombre_sucursal` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`numero_prestamo`),
  KEY `nombre_sucursal` (`nombre_sucursal`),
  CONSTRAINT `sucursal_prestamo_ibfk_1` FOREIGN KEY (`numero_prestamo`) REFERENCES `prestamo` (`numero_prestamo`),
  CONSTRAINT `sucursal_prestamo_ibfk_2` FOREIGN KEY (`nombre_sucursal`) REFERENCES `sucursal` (`nombre_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal_prestamo`
--

LOCK TABLES `sucursal_prestamo` WRITE;
/*!40000 ALTER TABLE `sucursal_prestamo` DISABLE KEYS */;
/*!40000 ALTER TABLE `sucursal_prestamo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-14 18:02:05

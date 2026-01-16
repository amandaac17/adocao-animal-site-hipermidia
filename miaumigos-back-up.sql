-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: miaumigos
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cadastro_pets`
--

DROP TABLE IF EXISTS `cadastro_pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadastro_pets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `especie` enum('cachorro','gato') NOT NULL,
  `raca` varchar(100) DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `genero` varchar(20) DEFAULT NULL,
  `cor` varchar(50) DEFAULT NULL,
  `temperamento` varchar(100) DEFAULT NULL,
  `foto` text,
  `sobre` text,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('disponível','adotado','em análise') DEFAULT 'disponível',
  `nome_tutor` varchar(100) NOT NULL,
  `telefone_tutor` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastro_pets`
--

LOCK TABLES `cadastro_pets` WRITE;
/*!40000 ALTER TABLE `cadastro_pets` DISABLE KEYS */;
INSERT INTO `cadastro_pets` VALUES (6,'Chico','cachorro','Shitzu',6,'Macho','Branco e Preto','Intelectual','https://i.postimg.cc/K82LYHzJ/chicoo.jpg','Chico é carinhoso e gosta de roubar meias.','2026-01-04 15:28:56','disponível','Sarah Regina','99999999'),(7,'Frederico','gato','SRD',8,'Macho','Laranja','Dócil, Medroso, Calmo','https://www.gizmodo.com.br/app/uploads/2024/12/Gato-Laranja-896x597.png','Amigável e medroso. Tem medo de barulhos e vozes altas.','2026-01-04 15:39:36','disponível','Amanda','88888888'),(8,'Teodora','gato','SRD',5,'Fêmea','Branco e Marrom','Agitado, Nervoso','https://www.patasdacasa.com.br/sites/default/files/styles/gallery_crop/public/images-carrossel/15867-o-siames-e-conhecido-principalmente-pelo-orig-2.webp?itok=dPuO7xA4','Faz tratamento para nervosismo e ansiedade. É carinhosa, mas não se dá bem com outros animais.','2026-01-04 15:43:29','disponível','Dorinha','7777777'),(9,'Lily','gato','SRD',8,'Fêmea','Branco e Preto','Nervoso','https://i.pinimg.com/736x/5e/d4/6e/5ed46e3f92a0d373e0bf13305ca36a94.jpg','Gata resgatada de Teresina-PI. É carinhosa, mas não se dá bem com outros pets. ','2026-01-04 15:59:37','disponível','Amanda','77777777'),(10,'Gabiru','cachorro','SRD',5,'Fêmea','Caramelo','Agitado, Amigável','https://portalcitizen.com.br/wp-content/uploads/2025/08/Fotos-divulgacao-5-2.jpg','É uma cadelinha muito amigável, gosta de brincar. Bom para crianças maiores. ','2026-01-04 16:00:57','adotado','Amanda','77777777'),(11,'Tekinha Charmosa','cachorro','Pinscher',3,'Fêmea','Preto','Agitado','https://i.pinimg.com/474x/77/43/5a/77435a8b981785677686fbce0bc7e377.jpg','Treme, late muito e rosna. Gosta de brincar, muito carinhosa. Dorme em cima de travesseiro. ','2026-01-13 00:38:38','disponível','Ana','99999999');
/*!40000 ALTER TABLE `cadastro_pets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-12 21:54:59

-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 02/09/2021 às 01:35
-- Versão do servidor: 10.4.18-MariaDB
-- Versão do PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `3j_2021`
--
DROP DATABASE IF EXISTS `3j_2021`;
CREATE DATABASE IF NOT EXISTS `3j_2021` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `3j_2021`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `cliente_id` int(11) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `login` varchar(10) NOT NULL,
  `senha` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`cliente_id`, `nome`, `login`, `senha`) VALUES
(1, 'José da Silva', 'jsilva', '123'),
(2, 'Maria Oliveira', 'maoliveira', '321'),
(3, 'João Maria Goes', 'jmgoes', '456'),
(4, 'Ana Lúcia Oliveira', 'analu', '765');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cliente_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cliente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

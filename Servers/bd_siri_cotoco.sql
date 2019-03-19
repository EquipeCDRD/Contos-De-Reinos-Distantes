-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2019 at 01:45 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_siri_cotoco`
--

-- --------------------------------------------------------

--
-- Table structure for table `logs_de_acesso`
--

CREATE TABLE `logs_de_acesso` (
  `id` int(5) UNSIGNED ZEROFILL NOT NULL COMMENT 'id do campo',
  `data_criacao` datetime NOT NULL COMMENT 'Data de geração do log, que indicará o momento em que determinado usuário logou.',
  `usuarios_id` int(5) UNSIGNED ZEROFILL NOT NULL COMMENT 'chave estrangeira recebida de de usuarios'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela contendo os logs de acesso dos usuários. Serão armazenados os dados de30 dias, e partir daí os dados mais antigos serão gradativamente apagados e substituidos por dados mais recentes ';

--
-- Dumping data for table `logs_de_acesso`
--

INSERT INTO `logs_de_acesso` (`id`, `data_criacao`, `usuarios_id`) VALUES
(00001, '2018-11-29 13:53:18', 00001),
(00002, '2018-11-29 13:53:52', 00001),
(00003, '2018-11-29 14:19:06', 00001),
(00004, '2018-11-29 14:19:22', 00001),
(00005, '2018-11-29 14:21:08', 00008),
(00006, '2018-11-29 14:21:30', 00007),
(00007, '2018-11-29 14:25:33', 00001),
(00008, '2018-11-29 14:26:59', 00001),
(00009, '2018-11-29 14:28:50', 00001),
(00010, '2018-11-29 14:31:48', 00001),
(00011, '2018-11-29 14:32:31', 00001),
(00012, '2018-11-29 14:32:56', 00001),
(00013, '2018-11-29 14:34:02', 00001),
(00014, '2018-11-29 14:35:29', 00007),
(00015, '2018-11-29 14:37:42', 00001),
(00016, '2018-11-29 14:38:51', 00001),
(00017, '2018-11-29 14:41:57', 00001),
(00018, '2018-11-29 14:43:54', 00001),
(00019, '2018-11-29 14:46:58', 00007),
(00020, '2018-11-29 14:50:00', 00007),
(00021, '2018-11-29 14:51:42', 00007),
(00022, '2018-11-29 14:52:32', 00007),
(00023, '2018-11-29 14:59:53', 00007),
(00024, '2018-11-29 15:02:25', 00007),
(00025, '2018-11-29 15:09:27', 00007),
(00026, '2018-11-29 15:11:29', 00007),
(00027, '2018-11-29 15:14:31', 00001),
(00028, '2018-11-29 15:15:29', 00001),
(00029, '2018-11-29 15:17:35', 00001),
(00030, '2018-11-29 15:19:58', 00001);

-- --------------------------------------------------------

--
-- Table structure for table `notificacoes`
--

CREATE TABLE `notificacoes` (
  `id` int(3) UNSIGNED ZEROFILL NOT NULL COMMENT 'id do campo',
  `notificacao` text NOT NULL COMMENT 'corpo da notificação (mensagem)',
  `data_criacao` datetime NOT NULL COMMENT 'Data da criação da mensagem\n',
  `usuarios_id` int(5) UNSIGNED ZEROFILL NOT NULL COMMENT 'id do administrador que criou a mensagem\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela que conterá as mensagens redigidas pelos administradores aos usuários (ex: aviso de manutenção, aviso de atualização, etc)';

-- --------------------------------------------------------

--
-- Table structure for table `pontuacoes`
--

CREATE TABLE `pontuacoes` (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL COMMENT 'id da pontuação',
  `pontuacao` int(3) UNSIGNED NOT NULL COMMENT 'Pontuacao alcançada pelo jogador em determinada partida',
  `data_criacao` datetime NOT NULL COMMENT 'Data da criação da pontuação.',
  `usuarios_id` int(5) UNSIGNED ZEROFILL NOT NULL COMMENT 'id do usuário ao qual a pontuação pertence\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela que conterá as 5 melhores pontuações do usuário, sendo que a maior delas será utilizada no ranking, onde será comparada às outras maiores pontuações dos demais usuários.';

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(5) UNSIGNED ZEROFILL NOT NULL COMMENT 'id atribuida automaticamente aos novos usuários criados ',
  `usuario` varchar(16) NOT NULL COMMENT 'Apelido escolhido pelo usuário. O usuário terá valor único, ou seja, nomes repitidos de usuário não são permitidos, e este será o nome que será exibido no ranking, caso se trate de um usuário jogador\n',
  `senha` varchar(32) NOT NULL COMMENT 'campo onde a senha do usuário será armazenada em SHA3-224',
  `email` varchar(100) NOT NULL COMMENT 'Campo onde o email do usuário será salvo. \nAO PROFESSOR: Devemos deixar o email como único?\n',
  `nome` varchar(100) NOT NULL COMMENT 'Campo onde o nome completo real do usuário será armazenado.\n',
  `data_nascimento` date NOT NULL COMMENT 'Data de nascimento do usuário.\n',
  `data_criacao` datetime NOT NULL COMMENT 'Data da criação da conta. Atribuído automaticamente.',
  `permissao` tinyint(1) UNSIGNED NOT NULL COMMENT 'Este campo define o nível de acesso dos usuários, dividido-os em administradores e jogadores, sendo:\n\n0 - jogador e\n\n1 - administrador.\n\nA permissão do usuário é definida automaticamente no momento da criação da conta.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela que contem os usuários cadastrados, tanto administradores quanto jogadores. A diferenciação dos tipos de usuário se dá pelo campo permissao.';

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `senha`, `email`, `nome`, `data_nascimento`, `data_criacao`, `permissao`) VALUES
(00001, 'jogador1', '3D07E34E97FB589C2269CC8F8C1566C0', 'kayl_henings@estudante.sc.senai.br', '123123', '9000-02-01', '2018-11-29 13:51:55', 1),
(00003, 'jogador3', '3D07E34E97FB589C2269CC8F8C1566C0', 'kayl_henings@estudante.sc.senai.br', 'jogador', '9000-02-01', '2018-11-29 13:52:09', 1),
(00004, 'jogador4', '3D07E34E97FB589C2269CC8F8C1566C0', 'kayl_henings@estudante.sc.senai.br', 'jogador', '9000-02-01', '2018-11-29 13:52:14', 1),
(00005, 'jogador5', '3D07E34E97FB589C2269CC8F8C1566C0', 'kayl_henings@estudante.sc.senai.br', 'jogador', '9000-02-01', '2018-11-29 13:52:19', 1),
(00006, 'jogador6', '3D07E34E97FB589C2269CC8F8C1566C0', 'kayl_henings@estudante.sc.senai.br', 'jogador', '9000-02-01', '2018-11-29 13:52:24', 1),
(00007, 'admin', '3D07E34E97FB589C2269CC8F8C1566C0', 'kayl_henings@estudante.sc.senai.br', 'yeyeyeyeye yeyeye', '9000-02-01', '2018-11-29 13:52:35', 0),
(00008, 'admin1', '3D07E34E97FB589C2269CC8F8C1566C0', 'kayl_henings@estudante.sc.senai.br', 'jogador', '9000-02-01', '2018-11-29 13:53:02', 1),
(00018, 'ex_adm_putasso', '3D07E34E97FB589C2269CC8F8C1566C0', 'email@email.email', 'novo adm', '2222-02-10', '2018-11-29 15:11:36', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logs_de_acesso`
--
ALTER TABLE `logs_de_acesso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_logs_de_acesso_usuarios_idx` (`usuarios_id`);

--
-- Indexes for table `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notificacoes_usuarios1_idx` (`usuarios_id`);

--
-- Indexes for table `pontuacoes`
--
ALTER TABLE `pontuacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pontuacoes_usuarios1_idx` (`usuarios_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarioscol_UNIQUE` (`usuario`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logs_de_acesso`
--
ALTER TABLE `logs_de_acesso`
  MODIFY `id` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'id do campo', AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id` int(3) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'id do campo';

--
-- AUTO_INCREMENT for table `pontuacoes`
--
ALTER TABLE `pontuacoes`
  MODIFY `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'id da pontuação';

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'id atribuida automaticamente aos novos usuários criados ', AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `logs_de_acesso`
--
ALTER TABLE `logs_de_acesso`
  ADD CONSTRAINT `fk_logs_de_acesso_usuarios` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD CONSTRAINT `fk_notificacoes_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pontuacoes`
--
ALTER TABLE `pontuacoes`
  ADD CONSTRAINT `fk_pontuacoes_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

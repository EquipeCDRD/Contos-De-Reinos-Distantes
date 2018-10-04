/**
 * Autor: Equipe CDRD
 * Data de criação: 2018-21-08
 * Desc: Arquivo contendo as funções relativas às servlets do jogador
 */

//Main
$(document).ready(function () {

	/**
 * especifica o caminho a ser trilhado pela função até a chamada da mesma
 * na raiz do projeto
 */
	var PATH = "../../";

	//varável glbal que salva informações sobre o jogador
	var usuarioLogado;

	/*--------------------------------------Geral-----------------------------------------*/

	//validar sessão
	$(function () {
		$.ajax({
			type: "POST",
			url: PATH + "ValidarSessao",
			data: "p=1",
			success: function (usuario) {
				if (usuario.login != null) {
					usuarioLogado = new Object();
					usuarioLogado.id = usuario.id;
					usuarioLogado.login = usuario.login;
					usuarioLogado.email = usuario.email;
					usuarioLogado.nome = usuario.nome;
					usuarioLogado.nascimento = usuario.nascimento;
					carregaPontucaoPessoal();//Ranking quebra se o feladapota não tem pontuação

					//chamada da função de carregamento das tabelas

					carregaTabelaRanking(1);
					carregaTabelaRanking(2);
					carregaTabelaRanking(3);
				} else {
					sair();
				}
			},
			error: function (info) {
				alert("Não foi possível verificar sua sessão. Você será redirecionado à página de início /n " + info.status + " - " + info.statusText);
				sair();
			}
		})
	})

	//Cai fora fdp!
	sair = function () {
		$.ajax({
			type: "POST",
			url: PATH + "Logout",
			success: function () {
				window.location.href = (PATH + "index.html");
			},
			error: function (info) {
				alert("Erro ao tentar encerrar sua sessão: " + info.status + " - " + info.statusText);
			}
		});
	}

	//seleciona qual tipo de tabela deverá ser gerada (a taberna possui 3 tipos)
	function mudahtml(opcao) {
		var html;
		switch (opcao) {
			//Quadro grandão	
			case 1:
				html = "<table class='tableRanking' class='intRowRanking'>"
					+ "<tr>"
					+ "<th class='intRowRanking tituloRanking' colspan='3'>MELHORES AVENTUREIROS DO REINO</th>"
					+ "</tr>"
					+ "<tr>"
					+ "<th class='intRowRanking tituloRanking'>POSIÇÃO</th>"
					+ "<th class='intRowRanking tituloRanking'>USUÁRIO</th>"
					+ "<th class='intRowRanking tituloRanking'>PONTUAÇÃO</th>"
					+ "</tr>";
				break;
			//Quadro menor	
			case 2:
				html = "<table id='tabela'> <!--Tabela de Ranking-->"
					+ "<tr>"
					+ "<th colspan='3' class='tdTabela' id='tabelaTitulo' >MELHORES GUERREIROS DO REINO</th>"
					+ "</tr>"
					+ "<tr>"
					+ "<th class='tdTabela' id='rkgPosicao'>Posição</th>"
					+ "<th class='tdTabela' id='rkgUsuario'>Usuário</th>"
					+ "<th class='tdTabela' id='rkgPontuacao'>Pontuação</th>"
					+ "</tr>";
				break;
			//Tabela pessoal
			case 3:
				html = "<table class='tableRanking' class='intRowRanking'>"
					+ "<tr>"
					+ "<th class='intRowRanking tituloRanking' colspan='2'>SUAS MELHORES PONTUAÇÕES</th>"
					+ "</tr>"
					+ "<tr>"
					+ "<th class='intRowRanking tituloRanking'>DATA</th>"
					+ "<th class='intRowRanking tituloRanking'>PONTUAÇÃO</th>"
					+ "</tr>"

				break;
		}
		return html;
	}

	//Pesquisa e construção da tabela do ranking que aparece na taverna

	carregaTabelaRanking = function (opcao) {
		var html = mudahtml(opcao);
		var dados;
		if (opcao == 3) {
			dados = "usuarioid=" + usuarioLogado.id + "&identificador=pessoal"
		} else {
			dados = "usuarioid=null&identificador=ranking"
		}
		$.ajax({
			type: "POST",
			url: PATH + "BuscarPontuacao",
			data: dados,
			success: function (dados) {
				html += geraTabelaRanking(dados, opcao);
				switch (opcao) {
					case 1:
						$("#ranking").html(html);
						break;
					case 2:
						$("#quadroRanking").html(html);
						break;
					case 3:
						$("#rankingPessoal").html(html);
						break;
				}
				console.log(html);

			},//precisa dar um jeito de caregar tudin logo após carregar a página
			error: function (info) {
				html += "<tr>"
					+ "<td class='tdTabela'> Erro ao carregar o ranking: " + info.status + " - " + info.statusText + "</td>"
					+ "</tr>"
			}
		})
	}

	geraTabelaRanking = function (listaRanking, opcao) {
		var dados = "";
		if (listaRanking != undefined && listaRanking.length > 0) {
			console.log(listaRanking);
			switch (opcao) {
				case 1:
					for (var i = 0; i < listaRanking.length; i++) {
						dados += "<tr>" +
							"<td class='tdTabela intRowRanking'>" + listaRanking[i].posicaoRanking + "</td>" +
							"<td class='tdTabela intRowRanking'>" + listaRanking[i].nomeDeUsuario + "</td>" +
							"<td class='tdTabela intRowRanking'>" + listaRanking[i].score + "</td>" +
							"</tr>"
					}
					dados += "<tr>" +
						"<td><img src='../../resources/style/images/x.png' title='fechar tabela' alt='clique para fechar' id='fechar' class='sairBtn' /></td>" +
						"<td colspan='2'><img src='../../resources/style/images/flecha.png' title='flecha' alt='proximos valores' id='flecha'/></td>" +
						"</tr>" +
						"<tr>" +
						"<th class='intRowRanking tituloRanking' colspan='3'>SUA PONTUAÇAO</th>" +
						"</tr>" +
						"<tr>" +
						"<td class='intRowRanking'>" + usuarioLogado.posicaoRanking + "</td>" +
						"<td class='intRowRanking'>" + usuarioLogado.login + "</td>";

					if (usuarioLogado.pontuacoes != undefined) {
						dados += "<td class='intRowRanking'>" + usuarioLogado.pontuacoes[0].score + "</td>"
					} else {
						dados += "<td class='intRowRanking'> Você ainda não tem pontuações</td>"
					}
					dados += "</tr>";

					break;
				case 2:
					for (var i = 0; i < 3; i++) {
						dados += "<tr>" +
							"<td class='tdTabela'>" + listaRanking[i].posicaoRanking + "</td>" +
							"<td class='tdTabela'>" + listaRanking[i].nomeDeUsuario + "</td>" +
							"<td class='tdTabela'>" + listaRanking[i].score + "</td>" +
							"</tr>"
					}
					break;
				case 3:
					if (usuarioLogado.pontuacoes != undefined) {
						for (var i = 0; i < usuarioLogado.pontuacoes.length; i++) {
							dados += "<tr>"
								+ "<td class='intRowRanking'>" + usuarioLogado.pontuacoes[i].dataCriacao + "</td>"
								+ "<td class='intRowRanking'>" + usuarioLogado.pontuacoes[i].score + "</td>"
								+ "</tr>"
						}
					} else {
						dados += "<td class='intRowRanking' colspan='2'> Você ainda não tem pontuações</td>"
					}

					dados += "</tr>"
						+ "<tr>"
						+ "<td><img src='../../resources/style/images/estatico/x.png' alt='img' id='fecharPessoal' class='sairBtn' /></td>"
						+ "</tr>"
					break;
			}

		} else if (listaRanking == "") {
			dados += "<tr><td colspan='2'>Nenhum registro encontrado</td></tr>";
		}
		return dados;
	}

	//Carrega as pontuções pessoais do serumaniho
	function carregaPontucaoPessoal() {
		$.ajax({
			type: "POST",
			url: PATH + "BuscarPontuacao",
			data: "usuarioid=" + usuarioLogado.id + "&identificador=pessoal",
			success: function (dados) {

				console.log("Dados do Banco: " + dados);

				if ((dados == undefined) || (dados[0] == undefined)) {
					usuarioLogado.pontuacoes == undefined;
				} else {
					var arrayPontuacoes = new Array();

					for (var i = 0; i < dados.length; i++) {
						arrayPontuacoes[i] = new Object();
						arrayPontuacoes[i].id = dados[i].id;
						arrayPontuacoes[i].dataCriacao = dados[i].dataCriacao;
						arrayPontuacoes[i].score = dados[i].score;
						arrayPontuacoes[i].posicaoRanking = dados[i].posicaoRanking;

						console.log(arrayPontuacoes);
					}

					usuarioLogado.pontuacoes = arrayPontuacoes;
					console.log(usuarioLogado.pontuacoes.length);
				}
			}
		})
	}

	/*--------------------------------------InseriPontuacao-----------------------------------------*/

	/**
	 * função ajax que chama a servlet de inserção de pontuações 
	 */
	inserirPontuacao = function () {

		/**
		 * variável que contem a última pontuação atingida pelo jogador que será enviada ao servidor
		 */
		usuarioLogado.pontuacao = $("#inputPontuacaoTemp").val();

		$.ajax({

			type: "POST",
			url: PATH + "InserirPontuacao",

			data: "usuarioid=" + usuarioLogado.id +
				/**
				 * o identificador serve para dizer ao servidor que tipo de busca realizar.
				 * nesse caso, o identificador é pessoal pq é preciso checar as pontuações de um
				 * jogador em específico
				 */
				"&hdidentificador=pessoal" +
				"&hdid=null" +
				"&txtpontuacao=" + usuarioLogado.pontuacao,

			success: function (msg) {
				alert(msg);
			},

			error: function (msg) {
				alert(msg);
			}

		});
	}

});
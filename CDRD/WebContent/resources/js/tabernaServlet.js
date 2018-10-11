/**
 * Autor: Equipe CDRD Data de criação: 2018-21-08 Desc: Arquivo contendo as
 * funções relativas às servlets do jogador
 */

// Main
$(document)
		.ready(
				function() {
					/**
					 * especifica o caminho a ser trilhado pela função até a
					 * chamada da mesma na raiz do projeto
					 */
					var PATH = "../../";

					// varável glbal que salva informações sobre o jogador
					var usuarioLogado;

					var ranking = new Object;

					/*--------------------------------------Geral-----------------------------------------*/

					// validar sessão
					$(function() {

						$
								.ajax({
									type : "POST",
									url : PATH + "ValidarSessao",
									data : "p=1",
									success : function(usuario) {
										if (usuario.login != null) {

											usuarioLogado = new Object();
											usuarioLogado.id = usuario.id;
											usuarioLogado.login = usuario.login;
											usuarioLogado.email = usuario.email;
											usuarioLogado.nome = usuario.nome;
											usuarioLogado.nascimento = usuario.nascimento;
											buscaUsrParaEditar(usuarioLogado.id);
											$
													.when(
															$
															.ajax({
																type : "POST",
																url : PATH + "BuscarPontuacao",
																data : "usuarioid=" + usuarioLogado.id
																		+ "&identificador=pessoal",
																success : function(dados) {
																	usuarioLogado.posicaoRanking = dados[0].posicaoRanking;
																	usuarioLogado.pontuacoes = dados;

																	$(
																	"#rankingPessoal")
																	.html(
																			mudahtml(3)
																					+ geraTabela(
																							dados,
																							3));
																}
															})
															)
													.then(
															function(x) {
																$
																		.ajax({
																			type : "POST",
																			url : PATH
																					+ "BuscarPontuacao",
																			data : "usuarioid=null&&identificador=ranking",
																			success : function(
																					dados) {
																				console
																						.log(dados);
																				ranking.pontuacoes = dados;
																				console
																						.log(ranking.pontuacoes);
																				$(
																						"#ranking")
																						.html(
																								mudahtml(1)
																										+ geraTabela(
																												dados,
																												1));
																				$(
																						"#quadroRanking")
																						.html(
																								mudahtml(2)
																										+ geraTabela(
																												dados,
																												2));
																				
																			},
																			error : function(
																					info) {
																				alert("Erro ao carregar o ranking: "
																						+ info.status
																						+ " - "
																						+ info.statusText);

																			}
																		});

															});

											console.log(ranking.pontuacoes);

											// chamada da função de carregamento
											// das tabelas

										} else {
											sair();
										}
									},
									error : function(info) {
										var msg = "Erro ao tentar encerrar sua sessão: ";
										alertaErro(msg, info);
										sair();
									}
								});
					});

					/*--------------------------------------Tabelas de ranking-----------------------------------------*/

					// seleciona qual tipo de tabela deverá ser gerada (a
					// taberna possui 3 tipos)
					function mudahtml(opcao) {
						var html;
						switch (opcao) {
						// Quadro grandão
						case 1:
							html = "<img src='../../resources/style/images/estatico/x.png' title='fechar tabela' alt='clique para fechar' class='sairBtn fechar' />"
									+ "<table class='tableRanking' class='intRowRanking'>"
									+ "<tr>"
									+ "<th class='intRowRanking tituloRanking' colspan='3'>MELHORES AVENTUREIROS DO REINO</th>"
									+ "</tr>"
									+ "<tr>"
									+ "<th class='intRowRanking tituloRanking'>POSIÇÃO</th>"
									+ "<th class='intRowRanking tituloRanking'>USUÁRIO</th>"
									+ "<th class='intRowRanking tituloRanking'>PONTUAÇÃO</th>"
									+ "</tr>";
							break;

						// Quadro menor
						case 2:
							html = "<table id='tabela'> <!--Tabela de Ranking-->"
									+ "<tr>"
									+ "<th colspan='3' class='tdTabela' id='tabelaTitulo' >MELHORES GUERREIROS DO REINO</th>"
									+ "</tr>"
									+ "<tr>"
									+ "<th class='tdTabela quadro' id='rkgPosicao'>Posição</th>"
									+ "<th class='tdTabela quadro' id='rkgUsuario'>Usuário</th>"
									+ "<th class='tdTabela quadro' id='rkgPontuacao'>Pontuação</th>"
									+ "</tr>";
							break;
						// Tabela pessoal
						case 3:
							html = "<img src='../../resources/style/images/estatico/x.png' title='fechar tabela' alt='clique para fechar' class='sairBtn fechar' />"
									+ "<table class='tableRanking' class='intRowRanking'>"
									+ "<tr>"
									+ "<th class='intRowRanking tituloRanking' colspan='2'>SUAS MELHORES PONTUAÇÕES</th>"
									+ "</tr>"
									+ "<tr>"
									+ "<th class='intRowRanking tituloRanking'>DATA</th>"
									+ "<th class='intRowRanking tituloRanking'>PONTUAÇÃO</th>"
									+ "</tr>";
							break;
						}
						return html;
					}

					// Pesquisa e construção da tabela do ranking que aparece na
					// taverna

					// Carrega as pontuções pessoais do serumaniho
					

					// realiza a construção da tabela mediante aos dados
					// recebidos
					geraTabela = function(listaRanking, opcao) {
						console.log("listaRanking: " + listaRanking);
						var dados = "";
						if (listaRanking != undefined
								&& listaRanking.length > 0) {
							switch (opcao) {
							case 1:
								for (var i = 0; i < listaRanking.length; i++) {
									dados += "<tr>"
											+ "<td class='tdTabela intRowRanking'>"
											+ listaRanking[i].posicaoRanking
											+ "</td>"
											+ "<td class='tdTabela intRowRanking'>"
											+ listaRanking[i].nomeDeUsuario
											+ "</td>"
											+ "<td class='tdTabela intRowRanking'>"
											+ listaRanking[i].score + "</td>"
											+ "</tr>";
									console.log("Dados geraTabela: " + dados);
								}
								dados += "<tr>"
										+ "<td><img src='../../resources/style/images/estatico/x.png' title='fechar tabela' alt='clique para fechar' class='sairBtn fechar' /></td>"
										+ "</tr>"
										+ "<tr>"
										+ "<th class='intRowRanking tituloRanking' colspan='3'>SUA PONTUAÇAO</th>"
										+ "</tr>" + "<tr>";

								if (usuarioLogado.pontuacoes != undefined) {
									dados += "<td class='intRowRanking'>"
											+ usuarioLogado.posicaoRanking
											+ "</td>"
											+ "<td class='intRowRanking'>"
											+ usuarioLogado.login + "</td>"
											+ "<td class='intRowRanking'>"
											+ usuarioLogado.pontuacoes[0].score
											+ "</td>";
								} else {
									dados += "<td class='intRowRanking'colspan='3'> Você ainda não tem pontuações</td>";
								}
								dados += "</tr>";

								break;
							case 2:
								for (var i = 0; i < 3; i++) {
									dados += "<tr>" + "<td class='tdTabela'>"
											+ listaRanking[i].posicaoRanking
											+ "</td>" + "<td class='tdTabela'>"
											+ listaRanking[i].nomeDeUsuario
											+ "</td>" + "<td class='tdTabela'>"
											+ listaRanking[i].score + "</td>"
											+ "</tr>";
								}
								break;
							case 3:
								if (usuarioLogado.pontuacoes != undefined) {
									var l = usuarioLogado.pontuacoes.length;
									if (usuarioLogado.pontuacoes.length > 5) {
										l = 5;
									}
									for (var i = 0; i < l; i++) {
										dados += "<tr>"
												+ "<td class='intRowRanking' id='pontua"
												+ listaRanking[i].id
												+ "'>"
												+ listaRanking[i].dataCriacao
												+ "</td>"
												+ "<td class='intRowRanking'>"
												+ listaRanking[i].score
												+ "</td>" + "</tr>";
									}
								} else {

									var dados = "<td class='intRowRanking' colspan='2'> Você ainda não tem pontuações</td>";
								}

								dados += "</tr>"
										+ "<tr>"
										+ "<td><img src='../../resources/style/images/estatico/x.png' alt='img' class='sairBtn fechar' /></td>"
										+ "</tr>";

								break;
							}
							return dados;
						}
					};

					/*--------------------------------------InseriPontuacao-----------------------------------------*/

					/**
					 * função ajax que chama a servlet de inserção de pontuações
					 */
					inserirPontuacao = function() {
						/**
						 * variável que contem a última pontuação atingida pelo
						 * jogador que será enviada ao servidor (placeholder)
						 */
						usuarioLogado.pontuacao = $("#inputPontuacaoTemp")
								.val();

						$.ajax({
							type : "POST",
							url : PATH + "InserirPontuacao",

							data : "usuarioid=" + usuarioLogado.id +
							/**
							 * o identificador serve para dizer ao servidor que
							 * tipo de busca realizar. nesse caso, o
							 * identificador é pessoal pq é preciso checar as
							 * pontuações de um jogador em específico
							 */
							"&hdidentificador=pessoal" + "&hdid=null"
									+ "&txtpontuacao="
									+ usuarioLogado.pontuacao,

							success : function(msg) {
								alert(msg);
							},

							error : function(info) {
								var msg = "Erro ao cadastrar pontuação: ";
								alertaErro(msg), info;
							}
						});
					};

					// --------------------------Tabela de
					// avisos---------------------------------

					geraTabelaAvisos = function(listNotificacao) {
						var dados = "";
						if (listNotificacao != undefined
								&& listNotificacao.length > 0) {
							for (var i = 0; i < listNotificacao.length; i++) {
								dados += "<tr>" + "<td><span>"
										+ listNotificacao[i].dataCriacao
										+ "</span></td>"
										+ "<td class='colMeio'><span>"
										+ listNotificacao[i].notificacao
										+ "</span></td>" + "</tr>";
							}
						} else if (listNotificacao == "") {
							dados += "<tr><td colspan='2'>Nenhum registro encontrado</td></tr>";
						}
						return dados;
					};

					$(function carregaAvisos() {
						var html = "<table class='tabelaAvisos'>"
								+ "<tr>"
								+ "<th colspan='3'>Avisos</th>"
								+ "<img src='../../resources/style/images/estatico/x.png' alt='img' class='sairBtn fechar' />"
								+ "</tr>" + "<tr>" + "<th>Data - Horário:</th>"
								+ "<th class='colMeio'>Mensagem:</th>"
								+ "</tr>";

						$.ajax({
							type : "POST",
							url : PATH + "BuscarNotificacao",
							data : null,
							success : function(dados) {
								html += geraTabelaAvisos(dados);
								html += "</table>";
								$("#avisos").html(html);
							},
							error : function(info) {
								var msg = "Erro ao carregar as tabelas: ";
								alertaErro(msg, info);
							}
						});
					});

					buscaUsrParaEditar = function(id) {
						if (id == undefined) {
							id = $("#altId").val();
						}
						$
								.ajax({
									type : "POST",
									url : PATH + "BuscarUsuario",
									data : "id=" + id,
									success : function(usuario) {
										$("#altId").val(usuario.id);
										$("#altNome").val(usuario.nome);
										$("#altEmail").val(usuario.email);
										$("#altNascimento").val(
												usuario.nascimento);
										$("#altLogger").val(usuario.login);
										$("#altVelhaSenha").val("");
										$("#altNovaSenha").val("");
										$("#altConfSenha").val("");
									},
									error : function(rest) {
										alert("Erro ao encontrar o usuário a ser alterado.");
									}
								});
					};

					alteraUsuario = function() {
						if (validaMinhaConta()) {
							$.ajax({
								type : "POST",
								url : PATH + "AlterarUsuario",
								data : $("#editarConta").serialize(),
								success : function(msg) {
									alert(msg.msg);
								},
								error : function(info) {
									alert("Erro ao alterar os dados: "
											+ info.status + " - "
											+ info.statusText);
								}
							});
						}
					};

					deletaUsuario = function(p, q) {
						if (confirm("Você tem certeza que quer deletar sua conta? Você vai perder tudo que ja teve conosco!")) {
							var motivo = "O usuário decidiu deletar a própria conta";
							$.ajax({
								type : "POST",
								url : PATH + "DeletarUsuario",
								data : "id=" + usuarioLogado.id + "&&motivo="
										+ motivo,
								success : function(msg) {
									alert(msg.msg);
								},
								error : function(info) {
									var msg = "Erro ao deletar contato: ";
									alertaErro(msg, info);
								}
							});
						}
					};

					// Cai fora fdp!
					sair = function() {
						$
								.ajax({
									type : "POST",
									url : PATH + "Logout",
									success : function(data) {
										window.location.href = PATH
												+ "index.html";
									},
									error : function(info) {
										alert("Erro ao tentar encerrar sua sessão: "
												+ info.status
												+ " - "
												+ info.statusText);
									}
								});
					};

				});

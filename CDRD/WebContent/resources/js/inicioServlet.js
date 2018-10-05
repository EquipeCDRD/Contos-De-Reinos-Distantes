/*
 * Autor: Equipe CDRD
 * Descrição: Arquivo de js contendo funções AJAX relativas às servlets de index.html(raiz do projeto). 
 * 			  Contem funções de chamada de servlets, assim como para lidar com as respostas do servidor após o 
 * 			  processamento da requisição.
 */

$(document).ready(function() {
  //Pesquisa e construção da tabela do ranking
  $(function() {
    var html =
      "<table id='tabela'> <!--Tabela de Ranking-->" +
      "<tr>" +
      "<th colspan='3' class='tdTabela'><h2 class='tituloTabela'>MELHORES GUERREIROS DO REINO</h2></th>" +
      "</tr>" +
      "<tr>" +
      "<th class='tdTabela'>Posição</th>" +
      "<th class='tdTabela'>Usuário</th>" +
      "<th class='tdTabela'>Pontuação</th>" +
      "</tr>";
    $.ajax({
      type: "POST",
      url: "BuscarPontuacao",
      data: "usuarioid=null&identificador=ranking",
      success: function(dados) {
        console.log(dados);
        html += geraTabelaRanking(dados);
        console.log(html);
        $("#containerRankingIndex").html(html);
      },
      error: function(info) {
        html +=
          "<tr>" +
          "<td class='tdTabela'> Erro ao carregar o ranking: " +
          info.status +
          " - " +
          info.statusText +
          "</td>" +
          "</tr>";
        console.log(html);
      }
    });
  });

  geraTabelaRanking = function(listaRanking) {
    var dados = "";
    if (listaRanking != undefined && listaRanking.length > 0) {
      for (var i = 0; i < listaRanking.length; i++) {
        dados +=
          "<tr>" +
          "<td class='tdTabela'><span>" +
          listaRanking[i].posicaoRanking +
          "</span></td>" +
          "<td class='tdTabela'><span>" +
          listaRanking[i].nomeDeUsuario +
          "</span></td>" +
          "<td class='tdTabela'><span>" +
          listaRanking[i].score +
          "</span></td>" +
          "</tr>";
      }
    } else if (listaRanking == "") {
      dados += "<tr><td colspan='2'>Nenhum registro encontrado</td></tr>";
    }
    return dados;
  };
  //======================================================
  //funções de login, cadastro e recuperação de senha
  //======================================================

  login = function() {
    var login = $("input[name=txtlogin]").val();
    var pwdsenhalogger = $("input[name=pwdsenhalogger]").val();
    $.ajax({
      type: "POST",
      url: "Login",
      data: "login=" + login + "&senha=" + pwdsenhalogger,
      success: function(msg) {
        if (msg.msg != null) alert(msg.msg);
        else window.location.href = msg.url;
      },
      error: function(info) {
        alert("Erro ao tentar login: " + info.status + " - " + info.statusText);
      }
    });
  };

  cadastrar = function() {
    $.ajax({
      type: "POST",
      url: "InserirUsuario",
      data: $("#cadastrarJogador").serialize() + "&p=1",
      success: function(msg) {
        console.log(msg);
        alert(msg.msg);
        $(this)
          .delay(5000)
          .location.reload();
      },
      error: function(info) {
        alert(
          "Erro ao cadastrar novo jogador: " +
            info.status +
            " - " +
            info.statusText
        );
      }
    });
  };

  recuperarSenha = function() {
    var email = $("input[name=txtmail]").val();
    $.ajax({
      type: "POST",
      url: "RecuperarSenha",
      data: "txtmail=" + email,
      success: function() {
        alert("Email com senha enviado! Cheque sua caixa de email");
        $(this)
          .delay(5000)
          .location.reload();
      },
      error: function() {
        alert(
          "Não foi possível enviar o email: " +
            info.status +
            " - " +
            info.statusText
        );
      }
    });
  };
});

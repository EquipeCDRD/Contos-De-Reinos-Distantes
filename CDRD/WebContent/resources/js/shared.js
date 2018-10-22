/**
 * Author: Equipe CDRD 
 * Creation date: 2018-10-08 
 * Descrição: Arquivo com scripts
 * js compartilhados por dois ou mais documentos
 */

$(document).ready(function() {
  var PATH = "../../";
  // Logout ====================
  sair = function() {
    $.ajax({
      type: "POST",
      url: PATH + "Logout",
      success: function() {
        window.location.href = PATH + "index.html";
      },
      error: function(info) {
        var msg = "Erro ao tentar encerrar sua sessão: ";
        $.when(alertaErro(msg, info)).then(function() {
          window.location.href = PATH + "index.html";
        });
      }
    });
  };

  // Alerta de Erros ==========
  alertaErro = function(msg, info) {
    alert(msg + " " + info.status + " - " + info.statusText);
  };
});

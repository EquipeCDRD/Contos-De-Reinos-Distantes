$(document).keydown(function(event) {
if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
        event.preventDefault();
     }
    // 107 Num Key  +
    // 109 Num Key  -
    // 173 Min Key  hyphen/underscor Hey
    // 61 Plus key  +/= key
});

$(window).bind('mousewheel DOMMouseScroll', function (event) {/*Desabilita o zoom*/
       if (event.ctrlKey == true) {
       event.preventDefault();
       }
});

  /* Sair */
function portaSair(){
    window.location = href="../../index.html";
}

$(document).ready(function(){

  moveTaverneiro();

  $("#containerModaisTaverneiro").hide();
  $("#containerModaisBardo").hide();
  $("#containerModaisAlterar").hide();
  carregaModais();
});
function abrirModal(i){
    $(".inputTaverna").prop("disabled",true);
    $("#intBardo").hide();
    $('#bardo').hide();
    $("#intTaverneiro").hide();
    $("#taverneiro").hide();
    $("#intAlterar").hide();
    $("#mostrarDados").hide();
    $("#alterarDados").hide();

    if (i==1) {
      $("#containerModaisTaverneiro").show();
      $("#intTaverneiro").show();
      $("#taverneiro").show();
    }
    if (i==2) {
      $("#containerModaisBardo").show();
      $("#intBardo").show();
      $('#bardo').show();
    }
    if (i==3) {
      $("#containerModaisAlterar").show();
      $("#intAlterar").show();
      $('#mostrarDados').show();
    }
    carregaModais(i);
}

function carregaModais(i){
  $("#jogoT").hide();
  $("#projetoT").hide();
  $("#equipeT").hide();
  $("#reinosB").hide();
  $("#guerraB").hide();
  $("#criaturasB").hide();

  /*     Taverneiro      */
  if (i==1) {
    /* Sair */
    $(".sairBtn").click(function(){
      $("#intTaverneiro").hide();
      $("#taverneiro").hide();
      $("#jogoT").hide();
      $("#projetoT").hide();
      $("#equipeT").hide();
      $("#containerModaisTaverneiro").hide();
      $(".inputTaverna").prop("disabled",false);
    });

    /* Jogo */
    $("#jogoT").hide();
    $(".jogoTBtn").click(function(){
      $("#taverneiro").hide();
      $("#projetoT").hide();
      $("#equipeT").hide();
      $("#jogoT").show();
    });

    /* Projeto */
    $("#projetoT").hide();
    $(".projetoTBtn").click(function(){
      $("#taverneiro").hide();
      $("#jogoT").hide();
      $("#equipeT").hide();
      $("#projetoT").show();
    });

    /* Equipe */
    $("#equipeT").hide();
    $(".equipeTBtn").click(function(){
      $("#taverneiro").hide();
      $("#projetoT").hide();
      $("#jogoT").hide();
      $("#equipeT").show();
    });
  }
  /*     Bardo      */
  if (i==2) {
      /* Sair */
      $(".sairBtn").click(function(){
        $("#intBardo").hide();
        $("#bardo").hide();
        $("#reinosB").hide();
        $("#guerraB").hide();
        $("#criaturasB").hide();
        $("#containerModaisBardo").hide();
        $(".inputTaverna").prop("disabled",false);

      });

      /* Reinos */
      $("#reinosB").hide();
      $(".reinosBBtn").click(function(){
        $("#bardo").hide();
        $("#guerraB").hide();
        $("#criaturasB").hide();
        $("#reinosB").show();
      });

      /* Guerra */
      $("#guerraB").hide();
      $(".guerraBBtn").click(function(){
        $("#bardo").hide();
        $("#reinosB").hide();
        $("#criaturasB").hide();
        $("#guerraB").show();
      });

      /* Criaturas Sombrias */
      $("#criaturasB").hide();
      $(".criaturasBBtn").click(function(){
        $("#bardo").hide();
        $("#reinosB").hide();
        $("#guerraB").hide();
        $("#criaturasB").show();
      });
    }
  /*     Alterar Dados      */
}


function abrirQuartos(){
    $("#quarto").animate({height: "220px"});
    $("#quarto").css("display", "inline-block");
    $("#quartoTaverneiro").animate({height: "220px"},function(){
      $("#paredeQuartos").animate({height: "130px"});
      $("#paredeQuartos").css("display", "inline-block");
     });
    $("#quartoTaverneiro").css("display", "inline-block");
    $("#portaQuarto").attr("onclick","fecharQuartos()");
    $("#pisoTaberna").css("filter","brightness(50%)");
    $("#paredeInferior").css("filter","brightness(50%)");
    $("#pisoTaberna").css("pointer-events","none");
    $("#paredeSuperior").css("pointer-events","none");
    $("#paredeSuperior").css("filter","brightness(50%)");
    $("#portaQuarto").css("filter","brightness(150%)");
    $("#portaQuarto").css("pointer-events","auto");
    $("#quarto").css("filter","brightness(100%)");
    $("#quartoTaverneiro").css("filter","brightness(100%)");
    $("#paredeQuartos").css("filter","brightness(100%)");
}
function fecharQuartos(){
  $("#paredeQuartos").animate({height: "0px"},function(){
    $("#quartoTaverneiro").animate({height: "0"});
    $("#quarto").animate({height: "0"},function(){
      $("#quarto").css("display", "none");
      $("#paredeQuartos").css("display", "none");
      $("#quartoTaverneiro").css("display", "none");
    });
  });
  $("#portaQuarto").attr("onclick","abrirQuartos()");
  $("#pisoTaberna").css("filter","brightness(100%)");
  $("#paredeInferior").css("filter","brightness(100%)");
  $("#pisoTaberna").css("pointer-events","auto");
  $("#paredeSuperior").css("pointer-events","auto");
  $("#paredeSuperior").css("filter","brightness(100%)");
  $("#portaQuarto").css("filter","brightness(100%)");
  $("#quarto").css("filter","brightness(50%)");
  $("#quartoTaverneiro").css("filter","brightness(50%)");
  $("#paredeQuartos").css("filter","brightness(50%)");

}

function moveTaverneiro() {
  $("#imgTaverneiro").animate({top: "150px"},3000, function(){
    $("#imgTaverneiro").animate({top: "0px"},3000, moveTaverneiro());
   });
}

/**
 * função que checa o navegador sendo usado, adptando
 * a renderização da imagem conforme navegador
*/
$(document).ready(function(){

    //carregamento das janelas modais
    $("#containerModaisIndex").hide();
    
    var ua = detect.parse(navigator.userAgent);

    if(ua.browser.family == "Chrome"){
        $("html").css("image-rendering","pixelated");
    }else if(ua.browser.family == "Firefox"){
        $("html").css("image-rendering","-moz-crisp-edges");
    }else{
        alert("Infelizmente o navegador " + ua.browser.family + " não é suportado por nossa aplicação. Lamentamos o inconveninete ( ; _ ; ). Atualmente, somente o Chrome e Firefox são suportados.");
    }
    
});

/**
 * função que provê um display às janelas modais, abrindo-o ou 
 * fechando-o
 */

function abrirModal(){
    $("#containerModaisIndex").show();
    carregaModais();
    $("#intPerso").show();
    $("#guard_1").show();  
}





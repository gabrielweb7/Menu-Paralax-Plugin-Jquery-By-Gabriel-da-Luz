/**
* ♥ MenuParalax7 ♥
* _Autor: Gabriel Azuaga Barbosa
* _Descrição: Fixa o [MENU] no topo conforme a rolagem de página
* e possibilita configurações de links para navegação entre as sessões!
* _Version: 1.0 _Criado em: 12/03/2018
* _Github: https://github.com/gabrielweb7/MenuParalax7
**/
$.fn.menuParalax7 = function( options ) {

  /* Configurações do Plugin */
  var settings = $.extend({
    'scrollSpeed'  : 1000,
    'debug'     : false,
    'goToPlusPx' : 3,
    'mySelectorSection' : 'div'
  }, options);

  /* Debug Log ♥ */
  var debug = function(log){
    if(settings.debug) {
      console.log(log);
    }
  }

  /* Retorna ponteiro px atual do scroll da página */
  var getPosScroll = function() {
    return $(window).scrollTop();
  }

  // Adiciona classe nova no objeto selecionado (This) ♥
  $(this).addClass('msaFix');

  //Set the variables needed ♥
  var menuList = {},
  menuHeight = $(".msaFix").height(),
  menuScrollAutoFix = $('.msaFix'),
  menuScrollAutoFixA = $('.msaFixLink');

  /* Grava na memoria se menu está ativo ou não... */
  var statusMenuActive = false;

  /* Captura Posição Top do Objeto(This) ♥ */
  var thisTop = $(this).offset().top;
  debug("thisTop(Offsset): "+thisTop);

  /* Captura height do objeto selecionado ♥ */
  var menuHeight = $(this).height();
  debug("menuHeight: "+menuHeight);

  /* Captura Altura do Top e Height do Objeto Selecionado ♥ */
  var totalMenuHeight = thisTop + menuHeight;
  debug("totalMenuHeight: "+totalMenuHeight);

  /* Captura Posição exatada do scroll ♥ */
  var st = getPosScroll();
  debug("posição exata do scroll: "+st);

  /* Auto Fixer Menu no Topo - Claro... verificando o retorno se for True or false
  e verifica status do menu se está true or false */
  var stickyMenu = function(retorno){
    if(retorno) {
      if(!statusMenuActive) {
        statusMenuActive = true;
        menuScrollAutoFix.addClass('msaFixActive');
        debug("~~ stickyMenu ativado!!!");
      }
    }else{
      if(statusMenuActive) {
          statusMenuActive = false;
          menuScrollAutoFix.removeClass('msaFixActive');
          debug("~~ stickyMenu desativado!!!");
      }
    }
  };

  var checkPosicaoTela = function() {
    /* Se posicao atual da tela for maior que stickTop.. ativar menu! */
    if(getPosScroll() > thisTop) {
      stickyMenu(true);
    } else {
      stickyMenu(false);
    }
  }

  var updateMenuListArray = function() {
    menuScrollAutoFixA.each(function() {
      var name = $(this).html();
      var hrefId = $(this).attr("href");
      var hrefId_ = hrefId.replace("#", "");
      /* Se caso o elemento[Classe] existir... */
      if($("."+hrefId_).length > 0) {
        var oftop = Math.round($("."+hrefId_).offset().top);
        var sectionHeight = Math.round($("."+hrefId_).outerHeight());
        var distanceLimited = oftop + sectionHeight;
        menuList[hrefId_] = { "offsetTop":oftop, "sectionHeight":sectionHeight, "distanceLimited":distanceLimited};
        debug(menuList);
      }
    });
  };

  /* Verifica Posição do Scroll e das sections e verifica qual menu é ativado automaticamente ! */
  var checkMenuActive = function() {
    /* Atualiza menuList Array */
    updateMenuListArray();

    /* Reset Active Menus  */
    $(menuScrollAutoFixA).removeClass('menuActive');

    for (var item in menuList) {
      var offsetTop = menuList[item].offsetTop;
      var sectionHeight = menuList[item].sectionHeight;
      var distanceLimited = menuList[item].distanceLimited;

      debug(item +" = "+offsetTop+ " > Height = "+ sectionHeight + " > Total DL: "+ distanceLimited);

      if(getPosScroll() >= offsetTop && getPosScroll() < distanceLimited) {
        /* Ativar menu! */
        $("a[href='#"+item+"']").addClass('menuActive');
        debug('Menu Ativo['+item+']');
      }
    }
  }

  /* ♥ Checa ponteiro atual do scroll.. Ativar ou não o FIXER MENU !! ♥ */
  checkPosicaoTela();
  /* Check Active Menu Automatic */
  checkMenuActive();

  /* Inicia Evento em Tempo Real do Scroll da Página ♥ */
  $(window).scroll(function() {

    /* ♥ Verifica o scroll atual da pagina.. ativa ou desativa Menu Fixer!! ♥ */
    checkPosicaoTela();
    /* Check Active Menu Automatic */
    checkMenuActive();

    debug('ScrollEvent: ST: '+getPosScroll());
  });

  /* Evento On Click em todo*/
  menuScrollAutoFixA.on('click', function(e){

    e.preventDefault();

    var myOffset = totalMenuHeight;

    var hash = $(this).attr('href').split('#')[1];

    /* Se caso clicar no logotipo ou link ter o href == #inicio ... voltar para o topo! ♥  */
    if(hash == "top") {
      debug('Voltar para o TOPO!!!');
      $("html, body").stop().animate({ scrollTop: 0 }, settings.scrollSpeed);
      return false;
    }
    /* Verifica se elemento existe na página */
    if($(settings.mySelectorSection+'.'+ hash).length > 0) {
      /* Recebe posição top do elemento html no documento ♥ */
      var goTo =  $(settings.mySelectorSection+'.'+ hash).position().top+settings.goToPlusPx;
      /* Animar rolagem até a posição determinada ♥ */
      $("html, body").stop().animate({ scrollTop: goTo }, settings.scrollSpeed);
    }
  });

};

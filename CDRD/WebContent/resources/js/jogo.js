/*-------------------------------------------------------------*/
/*           Contos de Reinos Distantes                        */
/*-------------------------------------------------------------*/

//menu principal
class SceneMenuPrincipal extends Phaser.Scene {
  constructor() {
    super({ key: "sceneMenuPrincipal" });
  }

  init() {}

  preload() {
    this.load.image("bg", "../../resources/style/images/jogo/bgmenu.png");
  }

  create() {
    this.bg = this.add.image(game.width, game.height, "bg").setOrigin(0, 0);

    this.input.manager.enabled = true;

    const ButtonB = this.add.text(110, 270, "Jogar", {
      fontSize: "50px",
      fill: "#000000",
      fontFamily: "pixel font"
    });
    ButtonB.setInteractive();

    ButtonB.on(
      "pointerdown",
      function() {
        console.log("From SceneC to SceneA");
        this.scene.start("sceneMain");
      },
      this
    );

    const ButtonC = this.add.text(730, 270, "Ranking", {
      fontSize: "50px",
      fill: "#000000",
      fontFamily: "pixel font"
    });
    ButtonC.setInteractive();

    ButtonC.on(
      "pointerdown",
      function() {
        this.scene.start("sceneMain");
      },
      this
    );
  }

  update() {}
}

//tela de carregamento
class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "sceneMain" });
  }

  init() {}

  preload() {
    var barraCarregamento = this.add.graphics();

    this.load.image("logo", "../../resources/style/images/jogo/test.jpg");
    for (var i = 0; i < 100; i++) {
      this.load.image("logo" + i, "../../resources/style/images/jogo/test.jpg");
    }

    this.load.on("progress", function(value) {
      console.log(value);
      barraCarregamento.clear();
      barraCarregamento.fillStyle(0x37ac26, 1);
      barraCarregamento.fillRect(320, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + "%");
    });

    this.load.on("fileprogress", function(file) {
      console.log(file.src);
    });

    this.load.on("complete", function() {
      console.log("complete");
      barraCarregamento.destroy();

      textoCarregando.destroy();
      percentText.destroy();
    });

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var textoCarregando = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Carregando...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    textoCarregando.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    percentText.setOrigin(0.5, 0.5);

    /*-------------------Tiles-------------------------
        this.load.image('tiles', '../../resources/style/assets/praia.png');
        this.load.tilemapTiledJSON('praia1', '../../resources/style/assets/praia.json');
        --------------------------------------------------*/
  }

  create() {
    var logo = this.add.image(400, 300, "logo");

    const btnMontanha = this.add.text(110, 270, "Ir para Montanha", {
      fontSize: "50px",
      fill: "#ffffff",
      fontFamily: "pixel font"
    });
    btnMontanha.setInteractive();

    btnMontanha.on(
      "pointerdown",
      function() {
        console.log("From SceneC to SceneA");
        this.scene.start("sceneMontanha");
      },
      this
    );

    /*-------------------Tiles-------------------------
        this.map = this.add.tilemap('praia1');

        var tiles = this.map.addTilesetImage('praia', 'tiles');

        this.backgroundLayer = this.map.createLayer('backgroundLayer', tileset);
        --------------------------------------------------*/
  }

  update() {}
}

//montanha
class SceneMontanha extends Phaser.Scene {
  constructor() {
    super({ key: "sceneMontanha" });
  }

  init() {}

  preload() {
    this.load.image(
      "tilesetMontanha",
      "../../resources/assets/tilesets/montanha1.png"
    );
    this.load.tilemapTiledJSON(
      "mapa",
      "../../resources/assets/json/montanha1.json"
    ); 
  }

  create() {
    this.mapa = this.make.tilemap({key:"mapa"})
    
    this.tileset = this.mapa.addTilesetImage(
      "montanha1",
      "tilesetMontanha"
    );

    this.planoFundo = this.mapa.createStaticLayer(
      "piso",
      this.tileset,
      0,
      0
    );
    this.objCenario = this.mapa.createStaticLayer(
      "cousas",
      this.tileset,
      0,
      0
    );
  }
}

var config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: "jogo",
  pixelArt: true,
  scene: [SceneMenuPrincipal, SceneMain, SceneMontanha]
};

var game = new Phaser.Game(config);

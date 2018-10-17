/*-------------------------------------------------------------*/
/*           Contos de Reinos Distantes                        */
/*-------------------------------------------------------------*/

class sceneMenuPrincipal extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneMenuPrincipal' });
    }

    init(){

    }

    preload ()
    {
        this.load.image('bg', '../../resources/style/images/jogo/bgmenu.png');
    }

    create ()
    {
        this.bg = this.add.image(420, 300, 'bg');

        this.input.manager.enabled = true;

        const ButtonB = this.add.text(70, 270, 'Jogar', {fontSize:'50px', fill: '#000000', fontFamily: 'pixel font'});
        ButtonB.setInteractive();

        ButtonB.on('pointerdown', function(){
            this.scene.start('sceneMain')
        },this);

        const ButtonC = this.add.text(700, 270, 'Ranking', {fontSize:'50px', fill: '#000000', fontFamily: 'pixel font' });
        ButtonC.setInteractive();

        ButtonC.on('pointerdown', function(){
            this.scene.start('sceneMain')
        },this);
    }

    update ()
    {
        
    }

}

class SceneMain extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneMain' });
    }

    init(){
    }

    preload ()
    {
        var barraCarregamento = this.add.graphics();

        this.load.image('logo', '../../resources/style/images/jogo/test.jpg');
        /*for (var i = 0; i < 100; i++) {
            this.load.image('logo'+i, '../../resources/style/images/jogo/test.jpg');
        }*/

        this.load.on('progress', function (value) {
            console.log(value);
            barraCarregamento.clear();
            barraCarregamento.fillStyle(0x37ac26, 1);
            barraCarregamento.fillRect(320, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
         
        this.load.on('complete', function () {
            console.log('complete');
            barraCarregamento.destroy();

            textoCarregando.destroy();
            percentText.destroy();
        });

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var textoCarregando = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Carregando...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        textoCarregando.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        //-------------------Tiles-------------------------
        this.load.image('tiles', '../../resources/style/assets/prainha.png');
        this.load.tilemapTiledJSON('map', '../../resources/style/assets/mapa.json');
        //--------------------------------------------------

        this.load.image('spot', '../../resources/style/assets/spot.png');
    }

    create ()
    {
        //var logo = this.add.image(400, 300, 'logo');
               
        //-------------------Tiles-------------------------
        this.map = this.make.tilemap({key: "map"});

        this.tileset = this.map.addTilesetImage("praia", "tiles");
        // layer = layer statico("NomeDoLayerNoJSON", this.vardoTileset,xOrigem, yOrigem)
        this.belowLayer = this.map.createStaticLayer("layer3", this.tileset,0, 0);
        this.belowLayer = this.map.createStaticLayer("layer2", this.tileset,0, 0);
        //--------------------------------------------------

        this.arrayTabuleiro = [];
        var tileSize = 32;
        var ROW = 0;
        var COL = -10000;
        for(var i = 0; i < 20; i++){
            this.arrayTabuleiro[i] = [];
            for(var j = 0; j < 20; j++){
                //var spot = this.add.sprite(this.tileDestination(j, COL), this.tileDestination(i, ROW), "spot")
                this.arrayTabuleiro[i][j] = {
                		//img : this.add.image((i*tileSize+16),(j*tileSize+16),'spot'),
                    x: i,
                    y: j
                }
            }
        }

        const ButtonA = this.add.text(70, 270, 'aqui', {fontSize:'50px', fill: '#000000', fontFamily: 'pixel font'});
        ButtonA.setInteractive();

        ButtonA.on('pointerdown', function(){
            var x = prompt("digita x");
            var y = prompt("digita y");
            alert(x + " e " + y);
            for(var i = 0; i < 15; i++){
                alert(x + " e " + y + " e " + i +"e" + j);
                for(var j = 0; j < 15; j++){
                    alert(x + " e " + y + " e " + i +"e" + j);
                    if((x==i)&&(y==j)){
                        alert(x + " e " + y + " e " + i +"e" + j + "a");
                        this.arrayTabuleiro[i][j].img = this.add.image(400, 300, 'logo');
                    }
                }
            }
        });

    }
    
    update ()
    {
    }

}

var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    parent: 'jogo',
    pixelArt: true,
    scene: [ sceneMenuPrincipal, SceneMain ]
};

var game = new Phaser.Game(config);
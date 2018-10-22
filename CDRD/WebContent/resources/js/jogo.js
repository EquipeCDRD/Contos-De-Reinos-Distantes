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
        /*
		 * for (var i = 0; i < 100; i++) { this.load.image('logo'+i,
		 * '../../resources/style/images/jogo/test.jpg'); }
		 */

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

        // -------------------Tiles-------------------------
        this.load.image('tiles', '../../resources/style/assets/praia.png');
        this.load.tilemapTiledJSON('map', '../../resources/style/assets/ilha.json');
        // --------------------------------------------------
        
        this.load.image('spot', '../../resources/style/assets/spot.png');
        // Sprite
        this.load.spritesheet('arqueiro', '../../resources/style/assets/arqueirotier0.png', { frameWidth: 40, frameHeight: 40, });
    }

    create ()
    {
        // var logo = this.add.image(400, 300, 'logo');
               
        // -------------------Tiles-------------------------
        this.map = this.make.tilemap({key: "map"});

        this.tileset = this.map.addTilesetImage("praia", "tiles");
        // layer = layer statico("NomeDoLayerNoJSON", this.vardoTileset,xOrigem,
		// yOrigem)
        this.belowLayer = this.map.createStaticLayer("terreno", this.tileset,0, 0);
        this.worldLayer = this.map.createStaticLayer("obstaculo", this.tileset,0, 0);
        this.aboveLayer = this.map.createStaticLayer("detalhes", this.tileset,0, 0);
        
        // --------------------------------------------------
        var arqueiro = this.add.sprite(20, 20, 'arqueiro', 1);
        arqueiro.setDepth(1);
        game.player = arqueiro;
        
            this.anims.create({
                key: 'swalk',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 0, end: 2 }),
                frameRate: 16,
                repeat: -1,
                yoyo: true,
            });
            this.anims.create({
                key: 'ewalk',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 3, end: 5 }),
                frameRate: 16,
                repeat: -1,
                yoyo: true,
            });
            this.anims.create({
                key: 'nwalk',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 6, end: 8 }),
                frameRate: 16,
                repeat: -1,
                yoyo: true,
            });
            this.anims.create({
                key: 'wwalk',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 9, end: 11 }),
                frameRate: 16,
                repeat: -1,
                yoyo: true,
            });
            this.anims.create({
                key: 'satac',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 12, end: 14 }),
                frameRate: 16,
                repeat: 0,
            });
            this.anims.create({
                key: 'eatac',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 15, end: 17 }),
                frameRate: 16,
                repeat: 0,
                yoyo: true,
            });
            this.anims.create({
                key: 'natac',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 18, end: 20 }),
                frameRate: 16,
                repeat: 0,
            });
            this.anims.create({
                key: 'watac',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 21, end: 23 }),
                frameRate: 16,
                repeat: 0,
            });
            
        	
           
        /*
		 * var player = new Array(); for(var i=0;i<15;i++){ player[i] = new
		 * Array(); for(var j=0;j<15;j++){
		 * 
		 * player[i][j] = this.add.sprite(20+40*j, 20+40*i, 'arqueiro', 1);
		 * this.anims.create({ key: i+'a'+j, frames:
		 * this.anims.generateFrameNumbers('arqueiro', { start: 0, end: 2 }),
		 * frameRate: 16, repeat: -1, yoyo: true, }); } }
		 */
        
        
            game.marker = this.add.graphics();
            game.marker.lineStyle(3, 0xffffff, 1);
            game.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

        
        
        game.finder = new EasyStar.js();
        var grid = [];
        for(var y = 0; y < this.map.height; y++){
            var col = [];
            for(var x = 0; x < this.map.width; x++){
                col.push(this.getTileID(x,y));
            }
            grid.push(col);
        }
        game.finder.setGrid(grid);
        /*
		 * this.arrayTabuleiro = []; var tileSize = 40; var ROW = 0; var COL =
		 * 1; for(var i = 0; i < 15; i++){ this.arrayTabuleiro[i] = []; for(var
		 * j = 0; j < 15; j++){ // var spot =
		 * this.add.sprite(this.tileDestination(j, COL), //
		 * this.tileDestination(i, ROW), "spot") this.arrayTabuleiro[i][j] = {
		 * img : this.add.image((i*tileSize+20),(j*tileSize+20),'spot'), posx:
		 * i, posy: j } this.arrayTabuleiro[i][j].img.setInteractive();
		 * this.arrayTabuleiro[i][j].img.on('pointerdown', function(){
		 * alert("x=" + this.x + " y=" + this.y); }) } }
		 */
        const norte = this.add.text(700, 50, 'N', {fontSize:'50px', fill: '#fff', fontFamily: 'pixel font'});
        norte.setInteractive();

        norte.on('pointerdown', function(){
        	arqueiro.anims.play('nwalk');
        });
        const este = this.add.text(750, 100, 'E', {fontSize:'50px', fill: '#fff', fontFamily: 'pixel font'});
        este.setInteractive();

        este.on('pointerdown', function(){
        	arqueiro.anims.play('ewalk');
        });
        const sul = this.add.text(700, 150, 'S', {fontSize:'50px', fill: '#fff', fontFamily: 'pixel font'});
        sul.setInteractive();

        sul.on('pointerdown', function(){
        	arqueiro.anims.play('swalk');
        });
        const oeste = this.add.text(650, 100, 'W', {fontSize:'50px', fill: '#fff', fontFamily: 'pixel font'});
        oeste.setInteractive();

        oeste.on('pointerdown', function(){
        	arqueiro.anims.play('wwalk');
        });
/*
 * for(var i=0;i<15;i++){ for(var j=0;j<15;j++){
 * player[i][j].anims.play(i+'a'+j, true); } }
 */

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
    	var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    	var pointerTileX = this.map.worldToTileX(worldPoint.x);
        var pointerTileY = this.map.worldToTileY(worldPoint.y);
        game.marker.x = this.map.tileToWorldX(pointerTileX);
        game.marker.y = this.map.tileToWorldY(pointerTileY);
        game.marker.setVisible(!this.checkCollision(pointerTileX,pointerTileY));
    }
    
    getTileID (x,y)
    {
        var tile = this.map.getTileAt(x, y, 'obstaculo');
        return tile.index;
    }
    
    checkCollision (x,y)
    {
        var tile = this.map.getTileAt(x, y, 'obstaculo');
        return tile.properties.collide == true;
    }
    
    handleClick(pointer){
        var x = pointer.x;
        var y = pointer.y;
        var toX = Math.floor(x/40);
        var toY = Math.floor(y/40);
        var fromX = Math.floor(this.player.x/40);
        var fromY = Math.floor(this.player.y/40);
        console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');

        Game.finder.findPath(fromX, fromY, toX, toY, function( path ) {
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                console.log(path);
                Game.moveCharacter(path);
            }
        });
        Game.finder.calculate(); // don't forget, otherwise nothing happens
    }
    
    moveCharacter(path){
        // Sets up a list of tweens, one for each tile to walk, that will be
		// chained by the timeline
        var tweens = [];
        for(var i = 0; i < path.length-1; i++){
            var ex = path[i+1].x;
            var ey = path[i+1].y;
            tweens.push({
                targets: Game.player,
                x: {value: ex*Game.map.tileWidth, duration: 200},
                y: {value: ey*Game.map.tileHeight, duration: 200}
            });
        }

        Game.scene.tweens.timeline({
            tweens: tweens
        });
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
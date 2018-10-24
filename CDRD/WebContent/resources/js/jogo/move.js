
var Jogo = {};


    Jogo.init = function(){
    };
    Jogo.preload = function()
    {
    	Jogo.scene = this;

        // -------------------Tiles-------------------------
        this.load.image('tiles', '../../resources/assets/tilesets/praia.png');
        this.load.tilemapTiledJSON('map', '../../resources/assets/json/ilha.json');
        // --------------------------------------------------
        
        this.load.image('spot', '../../resources/assets/sprites/spot.png');
        // Sprite
        this.load.spritesheet('arqueiro', '../../resources/assets/sprites/arqueirotier0.png', { frameWidth: 40, frameHeight: 40, });
   

    };

    Jogo.create = function()
    {
    	
    	this.input.on('pointerdown', Jogo.handleClick); 

        Jogo.map = this.make.tilemap({key: "map"});

        
        Jogo.camera = this.cameras.main;
        Jogo.camera.setBounds(0, 0, 20*32, 20*32);
        

        // --------------------------------------------------
        var arqueiro = this.add.sprite(20, 20, 'arqueiro', 1);
        arqueiro.setDepth(1);
        Jogo.camera.startFollow(arqueiro);
        Jogo.player = arqueiro;

            this.anims.create({
                key: 'swalk',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 0, end: 2 }),
                frameRate: 8,
                repeat: -1,
                yoyo: true,
            });
            this.anims.create({
                key: 'ewalk',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 3, end: 5 }),
                frameRate: 8,
                repeat: -1,
                yoyo: true,
            });
            this.anims.create({
                key: 'nwalk',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 6, end: 8 }),
                frameRate: 8,
                repeat: -1,
                yoyo: true,
            });
            this.anims.create({
                key: 'wwalk',
                frames: this.anims.generateFrameNumbers('arqueiro', { start: 9, end: 11 }),
                frameRate: 8,
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
            const norte = Jogo.scene.add.text(700, 50, 'N', {fontSize:'50px', fill: '#fff', fontFamily: 'pixel font'});
            norte.setInteractive();

            norte.on('pointerdown', function(){
            	arqueiro.anims.play('nwalk');
            });
            const este = Jogo.scene.add.text(750, 100, 'E', {fontSize:'50px', fill: '#fff', fontFamily: 'pixel font'});
            este.setInteractive();

            este.on('pointerdown', function(){
            	arqueiro.anims.play('ewalk');
            });
            const sul = Jogo.scene.add.text(700, 150, 'S', {fontSize:'50px', fill: '#fff', fontFamily: 'pixel font'});
            sul.setInteractive();

            sul.on('pointerdown', function(){
            	arqueiro.anims.play('swalk');
            });
            const oeste = Jogo.scene.add.text(650, 100, 'W', {fontSize:'50px', fill: '#fff', fontFamily: 'pixel font'});
            oeste.setInteractive();

            oeste.on('pointerdown', function(){
            	arqueiro.anims.play('wwalk');
            });
            
            
            var tiles = Jogo.map.addTilesetImage("praia", "tiles");
            // layer = layer statico("NomeDoLayerNoJSON", this.vardoTileset,xOrigem,
    		// yOrigem)
            this.belowLayer = Jogo.map.createStaticLayer("terreno", tiles);
            //this.aboveLayer = Jogo.map.createStaticLayer( "detalhes", tiles);
            //this.worldLayer = Jogo.map.createStaticLayer( "obstaculo", tiles);
        
            Jogo.marker = this.add.graphics();
            Jogo.marker.lineStyle(2, 0x00cc00, 1);
            Jogo.marker.strokeRect(0, 0, Jogo.map.tileWidth, Jogo.map.tileHeight);

        
        
            Jogo.finder = new EasyStar.js();
            
            var grid = [];
            for(var y = 0; y < Jogo.map.height; y++){
                var col = [];
                for(var x = 0; x < Jogo.map.width; x++){
                    col.push(Jogo.getTileID(x,y));
                }
                grid.push(col);
            }
            Jogo.finder.setGrid(grid);


            var tileset = Jogo.map.tilesets[0];
            var properties = tileset.tileProperties;
            var acceptableTiles = [];
            for(var i = tileset.firstgid-1; i < tiles.total; i++){
                if(!properties.hasOwnProperty(i)) {
                    acceptableTiles.push(i+1);
                    continue;
                }
                if(!properties[i].collide) acceptableTiles.push(i+1);
                if(properties[i].cost) Jogo.finder.setTileCost(i+1, properties[i].cost); 
            }
            Jogo.finder.setAcceptableTiles(acceptableTiles);
      
        
        
/*
 * for(var i=0;i<15;i++){ for(var j=0;j<15;j++){
 * player[i][j].anims.play(i+'a'+j, true); } }
 */

        

    }
    
    Jogo.update = function()
    {
    	
    	var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    	var pointerTileX = Jogo.map.worldToTileX(worldPoint.x);
    	var pointerTileY = Jogo.map.worldToTileY(worldPoint.y);
        	Jogo.marker.x = Jogo.map.tileToWorldX(pointerTileX);
            Jogo.marker.y = Jogo.map.tileToWorldY(pointerTileY);
            Jogo.marker.setVisible(!Jogo.checkCollision(pointerTileX,pointerTileY));
    }
    
    Jogo.handleClick = function(pointer){
    	
    		var x = pointer.x;
    		var y = pointer.y;
    		var toX = Math.floor(x/40);
    		var toY = Math.floor(y/40);
	        var fromX = Math.floor(Jogo.player.x/40);
	        var fromY = Math.floor(Jogo.player.y/40);
	        console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');

	        Jogo.finder.findPath(fromX, fromY, toX, toY, function( path ) {
		        if (path === null) {
		            console.warn("Path was not found.");
		        } else {
		            console.log(path);
		            var tweens = [];
		            for(var i = 0; i < path.length-1; i++){
		                var ex = path[i+1].x;
		                var ey = path[i+1].y;
		                tweens.push({
		                    targets: Jogo.player,
		                    x: {value: ex*Jogo.sceneMain.map.tileWidth, duration: 200},
		                    y: {value: ey*Jogo.sceneMain.map.tileHeight, duration: 200}
		                });
		            }    
		            
		            Jogo.scene.tweens.timeline({
		                tweens: tweens
		            });
		        }
		    });
		    Jogo.finder.calculate(); // don't forget, otherwise nothing
											// happens
		
    };
    
    Jogo.getTileID = function(x,y)
    {
        var tile = Jogo.map.getTileAt(x, y);
        return tile.index;
    };
    
    Jogo.checkCollision = function(x,y)
    {
        var tile = Jogo.map.getTileAt(x, y);
        return tile.properties.collide == true;
    };
    
    
    
    Jogo.moveCharacter = function(path){
        // Sets up a list of tweens, one for each tile to walk, that will be
		// chained by the timeline
        
    };	



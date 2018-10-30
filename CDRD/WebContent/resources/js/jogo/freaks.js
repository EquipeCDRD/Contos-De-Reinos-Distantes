	var barraCarregamento = this.add.graphics();

	this.load.image('logo', '../../resources/style/images/jogo/test.jpg');
	/*
	 * for (var i = 0; i < 100; i++) { this.load.image('logo'+i,
	 * '../../resources/style/images/jogo/test.jpg'); }
	 */

	this.load.on('progress', function(value) {
		console.log(value);
		barraCarregamento.clear();
		barraCarregamento.fillStyle(0x37ac26, 1);
		barraCarregamento.fillRect(320, 280, 300 * value, 30);
		percentText.setText(parseInt(value * 100) + '%');
	});

	this.load.on('fileprogress', function(file) {
		console.log(file.src);
	});

	this.load.on('complete', function() {
		console.log('complete');
		barraCarregamento.destroy();

		textoCarregando.destroy();
		percentText.destroy();
	});

	var width = this.cameras.main.width;
	var height = this.cameras.main.height;
	var textoCarregando = this.make.text({
		x : width / 2,
		y : height / 2 - 50,
		text : 'Carregando...',
		style : {
			font : '20px monospace',
			fill : '#ffffff'
		}
	});
	textoCarregando.setOrigin(0.5, 0.5);

	var percentText = this.make.text({
		x : width / 2,
		y : height / 2 - 5,
		text : '0%',
		style : {
			font : '18px monospace',
			fill : '#ffffff'
		}
	});
	percentText.setOrigin(0.5, 0.5);
	
	
	
	
	
	////
	
	
	var Jogo = {};

	Jogo.init = function() {
	};
	Jogo.preload = function() {
		Jogo.scene = this;

		// -------------------Tiles-------------------------
		this.load.image('tiles', '../../resources/assets/tilesets/praia.png');
		this.load.tilemapTiledJSON('map', '../../resources/assets/json/ilha.json');
		// --------------------------------------------------
		// Sprite
		this.load.spritesheet('arqueiro',
				'../../resources/assets/sprites/arqueirotier0.png', {
					frameWidth : 40,
					frameHeight : 40,
				});

	};

	Jogo.create = function() {

		this.input.on('pointerup', Jogo.handleClick);

		Jogo.camera = this.cameras.main;
		Jogo.camera.setBounds(0, 0, 16 * 40, 16 * 40);

		// --------------------------------------------------
		var arqueiro = this.add.sprite(20, 20, 'arqueiro', 1);
		arqueiro.setDepth(1);
		arqueiro.setOrigin(0.5, 0.5);
		Jogo.camera.startFollow(arqueiro);
		Jogo.player = arqueiro;

		Jogo.map = this.make.tilemap({
			key : "map"
		});
		var tilemap = Jogo.map.addTilesetImage('praia', 'tiles');
		// layer = layer statico("NomeDoLayerNoJSON", this.vardoTileset,xOrigem,
		// yOrigem)
		Jogo.map.createStaticLayer( "obstaculo", tilemap);

		Jogo.marker = this.add.graphics();
		Jogo.marker.lineStyle(2, 0x00cc00, 1);
		Jogo.marker.strokeRect(0, 0, Jogo.map.tileWidth, Jogo.map.tileHeight);

		Jogo.finder = new EasyStar.js();

		var grid = [];
		for (var y = 0; y < Jogo.map.height; y++) {
			var col = [];
			for (var x = 0; x < Jogo.map.width; x++) {
				col.push(Jogo.getTileID(x, y));
			}
			grid.push(col);
		}
		Jogo.finder.setGrid(grid);

		var tileset = Jogo.map.tilesets[0];
		var properties = tileset.tileProperties;
		var acceptableTiles = [];
		for (var i = tileset.firstgid - 1; i < tilemap.total; i++) {
			if (!properties.hasOwnProperty(i)) {
				acceptableTiles.push(i + 1);
				continue;
			}
			if (!properties[i].collide)
				acceptableTiles.push(i + 1);
			if (properties[i].cost)
				Jogo.finder.setTileCost(i + 1, properties[i].cost);
		}
		Jogo.finder.setAcceptableTiles(acceptableTiles);

		/*
		 * for(var i=0;i<15;i++){ for(var j=0;j<15;j++){
		 * player[i][j].anims.play(i+'a'+j, true); } }
		 */

	};

	Jogo.update = function() {

		var worldPoint = this.input.activePointer
				.positionToCamera(this.cameras.main);
		
		var pointerTileX = Jogo.map.worldToTileX(worldPoint.x);
		var pointerTileY = Jogo.map.worldToTileY(worldPoint.y);
		Jogo.marker.x = Jogo.map.tileToWorldX(pointerTileX);
		Jogo.marker.y = Jogo.map.tileToWorldY(pointerTileY);
		Jogo.marker.setVisible(!Jogo.checkCollision(pointerTileX, pointerTileY));
	};

	Jogo.checkCollision = function(x, y) {
		var tile = Jogo.map.getTileAt(x, y, 'obstaculo');
		return tile.properties.collide == true;
	};

	Jogo.getTileID = function(x, y) {
	    var tile = Jogo.map.getTileAt(x, y, 'obstaculo');
		return tile.index;
	};

	Jogo.handleClick = function(pointer) {

		var x = Jogo.camera.scrollX + pointer.x;
		var y = Jogo.camera.scrollY + pointer.y;
		if (x >= 0 && y > 0 & x < 16 && y < 16) {
			var toX = Math.floor(x / 40);
			var toY = Math.floor(y / 40);
			var fromX = Math.floor(Jogo.player.x / 40);
			var fromY = Math.floor(Jogo.player.y / 40);
			console.log('going from (' + fromX + ',' + fromY + ') to (' + toX + ','
					+ toY + ')');

			Jogo.finder.findPath(fromX, fromY, toX, toY, function(path) {
				if (path === null) {
					console.warn("Path was not found.");
				} else {
					console.log(path);
					Jogo.moveCharacter(path);
				}
			});
			Jogo.finder.calculate(); // don't forget, otherwise nothing
			// happens
		}
	};


	Jogo.moveCharacter = function(path) {
		var tweens = [];
		// Sets up a list of tweens, one for each tile to walk, that will be
		// chained by the timeline
		for (var i = 0; i < path.length - 1; i++) {
			var ex = path[i + 1].x;
			var ey = path[i + 1].y;
			tweens.push({
				targets : Jogo.player,
				x : {
					value : ex * Jogo.map.tileWidth,
					duration : 200
				},
				y : {
					value : ey * Jogo.map.tileHeight,
					duration : 200
				}
			});
		}

		Jogo.scene.tweens.timeline({
			tweens : tweens
		});

	};
	
	
	
	
	
	
	
	////////////mamaluigi
	
	
	
	

	Jogo.update = function() {
		var worldPoint = this.input.activePointer
				.positionToCamera(this.cameras.main);

		// Rounds down to nearest tile
		var pointerTileX = Jogo.map.worldToTileX(worldPoint.x);
		var pointerTileY = Jogo.map.worldToTileY(worldPoint.y);
		Jogo.marker.x = Jogo.map.tileToWorldX(pointerTileX);
		Jogo.marker.y = Jogo.map.tileToWorldY(pointerTileY);
		Jogo.marker.setVisible(!Jogo.checkCollision(pointerTileX, pointerTileY));
	};

	Jogo.checkCollision = function(x, y) {
		var tile = Jogo.map.getTileAt(x, y);
		return tile.properties.collide == true;
	};

	Jogo.getTileID = function(x, y) {
		var tile = Jogo.map.getTileAt(x, y);
		return tile.index;
	};

	Jogo.handleClick = function(pointer) {
		var x = Jogo.camera.scrollX + pointer.x;
		var y = Jogo.camera.scrollY + pointer.y;
		var toX = Math.floor(x / 32);
		var toY = Math.floor(y / 32);
		var fromX = Math.floor(Jogo.player.x / 32);
		var fromY = Math.floor(Jogo.player.y / 32);
		console.log('going from (' + fromX + ',' + fromY + ') to (' + toX + ','
				+ toY + ')');

		Jogo.finder.findPath(fromX, fromY, toX, toY, function(path) {
			if (path === null) {
				console.warn("Path was not found.");
			} else {
				console.log(path);
				Jogo.moveCharacter(path);
			}
		});
		Jogo.finder.calculate(); // don't forget, otherwise nothing happens
	};

	Jogo.moveCharacter = function(path) {
		// Sets up a list of tweens, one for each tile to walk, that will be chained
		// by the timeline
		var tweens = [];
		for (var i = 0; i < path.length - 1; i++) {
			var ex = path[i + 1].x;
			var ey = path[i + 1].y;
			tweens.push({
				targets : Jogo.player,
				x : {
					value : ex * Jogo.map.tileWidth,
					duration : 200
				},
				y : {
					value : ey * Jogo.map.tileHeight,
					duration : 200
				}
			});
		}

		Jogo.scene.tweens.timeline({
			tweens : tweens
		});
	};
	////
	/*-------------------------------------------------------------*/
	/*           Contos de Reinos Distantes                        */
	/*-------------------------------------------------------------*/

	var config = {
	    type: Phaser.AUTO,
	    width: 960,
	    height: 640,
	    parent: 'jogo',
	    pixelArt: true,
	    scene: [ Jogo ]
	};

	var game = new Phaser.Game(config);

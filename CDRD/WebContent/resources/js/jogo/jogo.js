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
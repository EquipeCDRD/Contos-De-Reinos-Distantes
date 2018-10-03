/*-------------------------------------------------------------*/
/*           Contos de Reinos Distantes                        */
/*-------------------------------------------------------------*/

class SceneMain extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneMain' });
    }

    init(){

    }

    preload ()
    {
        
    }

    create ()
    {
        
    }

    update ()
    {
        
    }

}

var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
  },
    scene: [ SceneMain ]
};

var game = new Phaser.Game(config);
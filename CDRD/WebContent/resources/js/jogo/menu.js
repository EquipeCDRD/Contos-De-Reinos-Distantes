var Menu = {};

Menu.preload = function() {
	this.load.image("bg", "../../resources/style/images/jogo/bgmenu.png");
}

Menu.create = function() {
	this.bg = this.add.image(420, 300, 'bg');

	this.input.manager.enabled = true;

	const ButtonB = this.add.text(70, 270, 'Jogar', {
		fontSize : '50px',
		fill : '#000000',
		fontFamily : 'pixel font'
	});
	ButtonB.setInteractive();

	ButtonB.on('pointerdown', function() {
		this.scene.start('Jogo')
	}, this);

	const ButtonC = this.add.text(700, 270, 'Ranking', {
		fontSize : '50px',
		fill : '#000000',
		fontFamily : 'pixel font'
	});
	ButtonC.setInteractive();

	ButtonC.on('pointerdown', function() {
		this.scene.start('Jogo')
	}, this);
}

Menu.update = function() {

}
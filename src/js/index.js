import Phaser from './phaser';

function create() {
  const graphics = this.add.graphics();

  graphics.fillStyle(0xffffff);
  graphics.lineStyle(2, 0xff4433);

  //  Draw A
  graphics.beginPath();
  graphics.moveTo(365, 130);
  graphics.lineTo(394, 60);
  graphics.lineTo(446, 60);
  graphics.lineTo(488, 130);
  graphics.lineTo(451, 130);
  graphics.lineTo(444, 120);
  graphics.lineTo(407, 120);
  graphics.lineTo(402, 130);
  graphics.closePath();
  graphics.strokePath();

  graphics.beginPath();
  graphics.moveTo(411, 100);
  graphics.lineTo(420, 80);
  graphics.lineTo(436, 100);
  graphics.closePath();
  graphics.strokePath();
}

const config = {
  type: Phaser.Constants.AUTO,
  width: 800,
  height: 600,
  scene: {
    create,
  },
};

new Phaser.Game(config);

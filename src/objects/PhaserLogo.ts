import IImageConstructor from '../interfaces/IImageConstructor'

export default class PhaserLogo extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body

  constructor({ scene, x, y, texture, frame }: IImageConstructor) {
    super(scene, x, y, texture, frame)

    this.initSprite()
    this.initPhysics()
    this.scene.add.existing(this)
  }

  private initSprite() {
    this.setScale(0.5)
  }

  private initPhysics() {
    this.scene.physics.world.enable(this)
    this.body.setVelocity(100, 200)
    this.body.setBounce(1, 1)
    this.body.setCollideWorldBounds(true)
  }
}

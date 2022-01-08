import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader })
  }

  preload() {
    this.load.image(TextureKeys.Elephant, 'images/elephant.png')
    this.load.image(TextureKeys.RedParticle, 'images/red.png')
  }

  create() {
    this.scene.start(SceneKeys.MainScene)
  }
}

import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader })
  }

  preload() {
    this.load.image(TextureKeys.PhaserLogo, 'images/phaser3-logo.png')
    this.load.image(TextureKeys.RedParticle, 'images/red.png')
  }

  create() {
    this.scene.start(SceneKeys.MainScene)
  }
}

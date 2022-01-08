import SceneKeys from '../consts/SceneKeys'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader })
  }

  preload() {
    this.load.image('elephant', 'images/elephant.png')
  }

  create() {
    this.scene.start(SceneKeys.MainScene)
  }
}

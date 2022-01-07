import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import PhaserLogo from '../objects/PhaserLogo'
import GameConfig from '../config'

export default class MainScene extends Phaser.Scene {
  private phaserLogo!: PhaserLogo

  constructor() {
    super({ key: SceneKeys.MainScene })
  }

  create() {
    const particles = this.add.particles(TextureKeys.RedParticle)

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD'
    })

    this.phaserLogo = new PhaserLogo({
      scene: this,
      x: Math.floor(Number(GameConfig.width) / 2),
      y: Math.floor(Number(GameConfig.height) / 2),
      texture: TextureKeys.PhaserLogo
    })

    emitter.startFollow(this.phaserLogo)
  }
}

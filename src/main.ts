import 'phaser'
import GameConfig from './config'

class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)
  }
}

window.addEventListener('load', () => {
  new Game(GameConfig)
})

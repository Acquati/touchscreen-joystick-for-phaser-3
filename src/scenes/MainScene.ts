import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import PhaserLogo from '../objects/PhaserLogo'
import GameConfig from '../config'

export default class MainScene extends Phaser.Scene {
  private joyStick!: any
  private text!: Phaser.GameObjects.Text

  constructor() {
    super({ key: SceneKeys.MainScene })
  }

  preload() {
    const rexVirtualJoystickPluginUrl =
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js'
    this.load.plugin(
      'rexvirtualjoystickplugin',
      rexVirtualJoystickPluginUrl,
      true
    )
  }

  create() {
    this.joyStick = this.plugins
      .get('rexvirtualjoystickplugin')
      .add(this, {
        x: 400,
        y: 300,
        radius: 70,
        base: this.add.circle(0, 0, 70, 0x888888, 0.2),
        thumb: this.add.circle(0, 0, 30, 0xcccccc, 0.2),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        forceMin: 10
        // enable: true
      })
      .on('update', this.dumpJoyStickState, this)

    console.log(this.joyStick)

    this.text = this.add.text(0, 0, '')
    this.dumpJoyStickState()
  }

  private dumpJoyStickState() {
    const cursorKeys = this.joyStick.createCursorKeys()
    var joystickValues = 'Key down: '
    for (let name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        joystickValues += `${name} `
      }
    }

    joystickValues += `
Force: ${Math.floor(this.joyStick.force * 100) / 100}
Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
`

    joystickValues += '\nTimestamp:\n'
    for (let name in cursorKeys) {
      const key = cursorKeys[name]
      joystickValues += `${name}: duration=${key.duration / 1000}\n`
    }
    this.text.setText(joystickValues)
  }
}

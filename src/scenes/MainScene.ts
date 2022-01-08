import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import GameConfig from '../config'

export default class MainScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private joyStick!: any
  private text!: Phaser.GameObjects.Text
  private player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private leftKeyDebug!: Phaser.GameObjects.Text
  private rightKeyDebug!: Phaser.GameObjects.Text
  private upKeyDebug!: Phaser.GameObjects.Text
  private downKeyDebug!: Phaser.GameObjects.Text

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

    this.player = this.physics.add.image(
      Math.floor(Number(GameConfig.width) / 2),
      Math.floor(Number(GameConfig.height) / 2),
      TextureKeys.Elephant
    )
    this.player.setCollideWorldBounds(true)

    emitter.startFollow(this.player)

    this.cursors = this.input.keyboard.createCursorKeys()

    const joyStickConfig = {
      radius: 80,
      x: 30,
      y: 30
    }

    this.joyStick = this.plugins
      .get('rexVirtualJoystick')
      .add(this, {
        x: joyStickConfig.radius + joyStickConfig.x,
        y:
          Number(GameConfig.height) -
          (joyStickConfig.radius + joyStickConfig.y),
        radius: joyStickConfig.radius,
        base: this.add.circle(0, 0, joyStickConfig.radius, 0x888888, 0.2),
        thumb: this.add.circle(
          0,
          0,
          Math.floor(joyStickConfig.radius / 2),
          0xcccccc,
          0.2
        ),
        dir: '8dir', // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        // fixed: true,
        forceMin: 10
        // enable: true
      })
      .on('update', this.dumpJoyStickState, this)

    this.text = this.add.text(10, 10, '')
    this.joyStick.createCursorKeys()
    this.dumpJoyStickState()

    this.upKeyDebug = this.add.text(
      Math.floor(Number(GameConfig.width) / 2),
      10,
      'Up'
    )
    this.rightKeyDebug = this.add.text(
      Number(GameConfig.width) - 200,
      Math.floor(Number(GameConfig.height) / 2) - 40,
      'Right'
    )
    this.downKeyDebug = this.add.text(
      Math.floor(Number(GameConfig.width) / 2),
      Number(GameConfig.height) - 80,
      'Down'
    )
    this.leftKeyDebug = this.add.text(
      10,
      Math.floor(Number(GameConfig.height) / 2) - 40,
      'Left'
    )
  }

  private dumpJoyStickState() {
    const cursorKeys = this.joyStick.createCursorKeys()

    if (cursorKeys.up.isDown && cursorKeys.right.isDown) {
      this.cursors.up.isDown = true
      this.cursors.right.isDown = true
      this.cursors.down.isDown = false
      this.cursors.left.isDown = false
    } else if (cursorKeys.right.isDown && cursorKeys.down.isDown) {
      this.cursors.up.isDown = false
      this.cursors.right.isDown = true
      this.cursors.down.isDown = true
      this.cursors.left.isDown = false
    } else if (cursorKeys.down.isDown && cursorKeys.left.isDown) {
      this.cursors.up.isDown = false
      this.cursors.right.isDown = false
      this.cursors.down.isDown = true
      this.cursors.left.isDown = true
    } else if (cursorKeys.left.isDown && cursorKeys.up.isDown) {
      this.cursors.up.isDown = true
      this.cursors.right.isDown = false
      this.cursors.down.isDown = false
      this.cursors.left.isDown = true
    } else if (cursorKeys.up.isDown) {
      this.cursors.up.isDown = true
      this.cursors.right.isDown = false
      this.cursors.down.isDown = false
      this.cursors.left.isDown = false
    } else if (cursorKeys.right.isDown) {
      this.cursors.up.isDown = false
      this.cursors.right.isDown = true
      this.cursors.down.isDown = false
      this.cursors.left.isDown = false
    } else if (cursorKeys.down.isDown) {
      this.cursors.up.isDown = false
      this.cursors.right.isDown = false
      this.cursors.down.isDown = true
      this.cursors.left.isDown = false
    } else if (cursorKeys.left.isDown) {
      this.cursors.up.isDown = false
      this.cursors.right.isDown = false
      this.cursors.down.isDown = false
      this.cursors.left.isDown = true
    } else {
      this.cursors.up.isDown = false
      this.cursors.right.isDown = false
      this.cursors.down.isDown = false
      this.cursors.left.isDown = false
    }

    var joystickValues = 'Key down: '
    for (let name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        joystickValues += name + ' '
      }
    }

    joystickValues +=
      '\nForce: ' +
      Math.floor(this.joyStick.force * 100) / 100 +
      '\nAngle: ' +
      Math.floor(this.joyStick.angle * 100) / 100

    joystickValues += '\nTimestamp:\n'
    for (let name in cursorKeys) {
      const key = cursorKeys[name]
      joystickValues += name + ': duration=' + key.duration / 1000 + '\n'
    }
    this.text.setText(joystickValues)
  }

  update(time: number, delta: number) {
    this.player.setVelocity(0)

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300)
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-300)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(300)
    }

    this.leftKeyDebug.setText([
      'Left: ' + this.cursors.left.isDown,
      'down: ' + this.cursors.left.timeDown,
      'up: ' + this.cursors.left.timeUp,
      'duration: ' +
        (this.cursors.left.isDown
          ? this.cursors.left.getDuration()
          : this.cursors.left.duration)
    ])

    this.rightKeyDebug.setText([
      'Right: ' + this.cursors.right.isDown,
      'down: ' + this.cursors.right.timeDown,
      'up: ' + this.cursors.right.timeUp,
      'duration: ' +
        (this.cursors.right.isDown
          ? this.cursors.right.getDuration()
          : this.cursors.right.duration)
    ])

    this.upKeyDebug.setText([
      'Up: ' + this.cursors.up.isDown,
      'down: ' + this.cursors.up.timeDown,
      'up: ' + this.cursors.up.timeUp,
      'duration: ' +
        (this.cursors.up.isDown
          ? this.cursors.up.getDuration()
          : this.cursors.up.duration)
    ])

    this.downKeyDebug.setText([
      'Down: ' + this.cursors.down.isDown,
      'down: ' + this.cursors.down.timeDown,
      'up: ' + this.cursors.down.timeUp,
      'duration: ' +
        (this.cursors.down.isDown
          ? this.cursors.down.getDuration()
          : this.cursors.down.duration)
    ])
  }
}

/**
 * Phaser 3 Game Scene
 * Mobile-first catch game: drag bucket, catch falling items, 30s timer.
 */

const GAME_DURATION = 30; // seconds

const ITEMS = [
  { emoji: '🍊', label: 'orange', points: 10, color: 0xFF8C00 },
  { emoji: '🥭', label: 'mango', points: 15, color: 0xFFB800 },
  { emoji: '🍋', label: 'lemon', points: 10, color: 0xFFFF00 },
  { emoji: '🍓', label: 'strawberry', points: 20, color: 0xFF2D55 },
  { emoji: '🫐', label: 'blueberry', points: 25, color: 0x6B5BFF },
  { emoji: '🍍', label: 'pineapple', points: 15, color: 0xFFD700 },
  { emoji: '☕', label: 'coffee', points: 30, color: 0x8B4513 },
  { emoji: '🥤', label: 'juice', points: 25, color: 0xFF6B2B },
  { emoji: '🍔', label: 'burger', points: 5, color: 0xDEB887 },
  { emoji: '🍟', label: 'fries', points: 5, color: 0xFFD700 },
  { emoji: '🎫', label: 'coupon', points: 50, color: 0xFF2D87 },
];

export function createGameScene(Phaser, { onScore, onTimeUpdate, onGameEnd }) {
  return class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
      this.score = 0;
      this.timeLeft = GAME_DURATION;
      this.items = [];
      this.spawnTimer = null;
      this.countdownTimer = null;
      this.bucketX = 0;
      this.isDragging = false;
      this.targetX = 0;
      this.gameActive = false;
    }

    preload() {
      // All graphics are drawn procedurally — nothing to preload
    }

    create() {
      const W = this.scale.width;
      const H = this.scale.height;

      this.bucketX = W / 2;
      this.targetX = W / 2;

      // Background gradient
      const bg = this.add.graphics();
      bg.fillGradientStyle(0x0D0D0D, 0x0D0D0D, 0x1a0a1a, 0x0a0a1a, 1);
      bg.fillRect(0, 0, W, H);

      // Decorative lane lines
      const lanes = this.add.graphics();
      lanes.lineStyle(1, 0xffffff, 0.04);
      for (let x = 0; x < W; x += 60) {
        lanes.beginPath();
        lanes.moveTo(x, 0);
        lanes.lineTo(x, H);
        lanes.strokePath();
      }

      // Ground glow line
      const groundY = H - 80;
      const groundGlow = this.add.graphics();
      groundGlow.lineStyle(2, 0xFF6B2B, 0.6);
      groundGlow.beginPath();
      groundGlow.moveTo(0, groundY);
      groundGlow.lineTo(W, groundY);
      groundGlow.strokePath();

      // Bucket container
      this.bucket = this.add.container(this.bucketX, H - 55);
      this._drawBucket(W);

      // Input: touch drag
      this.input.on('pointermove', (pointer) => {
        if (pointer.isDown) {
          this.targetX = Phaser.Math.Clamp(pointer.x, 45, W - 45);
        }
      });
      this.input.on('pointerdown', (pointer) => {
        this.targetX = Phaser.Math.Clamp(pointer.x, 45, W - 45);
      });

      // Input: keyboard
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      });

      // Spawn items
      this.spawnTimer = this.time.addEvent({
        delay: 900,
        callback: this._spawnItem,
        callbackScope: this,
        loop: true,
      });

      // Countdown
      this.countdownTimer = this.time.addEvent({
        delay: 1000,
        callback: this._tick,
        callbackScope: this,
        loop: true,
      });

      this.gameActive = true;

      // Particle-style background stars
      this._addBackgroundParticles(W, H);
    }

    _drawBucket(W) {
      const bucketW = Math.min(80, W * 0.22);
      const bucketH = 40;

      const g = this.add.graphics();

      // Shadow
      g.fillStyle(0x000000, 0.3);
      g.fillEllipse(0, bucketH / 2 + 4, bucketW + 8, 14);

      // Bucket body gradient-ish
      g.fillStyle(0xFF6B2B, 1);
      g.fillRoundedRect(-bucketW / 2, -bucketH / 2, bucketW, bucketH, 12);

      // Bucket rim
      g.fillStyle(0xFFB800, 1);
      g.fillRoundedRect(-bucketW / 2, -bucketH / 2, bucketW, 10, { tl: 12, tr: 12, bl: 0, br: 0 });

      // Inner shine
      g.fillStyle(0xffffff, 0.15);
      g.fillRoundedRect(-bucketW / 2 + 6, -bucketH / 2 + 14, bucketW - 12, bucketH - 22, 6);

      // Handle
      g.lineStyle(3, 0xFFB800, 1);
      g.beginPath();
      g.arc(0, -bucketH / 2 - 6, 12, Phaser.Math.DegToRad(200), Phaser.Math.DegToRad(340));
      g.strokePath();

      this.bucket.add(g);

      // Store bucket hitbox info
      this.bucketW = bucketW;
      this.bucketH = bucketH;
    }

    _addBackgroundParticles(W, H) {
      for (let i = 0; i < 30; i++) {
        const x = Phaser.Math.Between(0, W);
        const y = Phaser.Math.Between(0, H);
        const size = Phaser.Math.FloatBetween(1, 3);
        const alpha = Phaser.Math.FloatBetween(0.05, 0.2);
        const dot = this.add.graphics();
        dot.fillStyle(0xffffff, alpha);
        dot.fillCircle(x, y, size);

        this.tweens.add({
          targets: dot,
          alpha: { from: alpha, to: alpha * 0.3 },
          duration: Phaser.Math.Between(1500, 3500),
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
          delay: Phaser.Math.Between(0, 2000),
        });
      }
    }

    _spawnItem() {
      if (!this.gameActive) return;
      const W = this.scale.width;

      const template = Phaser.Utils.Array.GetRandom(ITEMS);
      const x = Phaser.Math.Between(30, W - 30);
      const speed = Phaser.Math.FloatBetween(120, 200) + (GAME_DURATION - this.timeLeft) * 3;

      const container = this.add.container(x, -30);

      // Background circle for item
      const circle = this.add.graphics();
      const radius = 22;
      circle.fillStyle(template.color, 0.25);
      circle.fillCircle(0, 0, radius);
      circle.lineStyle(2, template.color, 0.7);
      circle.strokeCircle(0, 0, radius);
      container.add(circle);

      // Emoji text
      const text = this.add.text(0, 0, template.emoji, {
        fontSize: '26px',
        align: 'center',
      }).setOrigin(0.5);
      container.add(text);

      // Points label
      const pts = this.add.text(0, 28, `+${template.points}`, {
        fontSize: '10px',
        color: '#' + template.color.toString(16).padStart(6, '0'),
        fontStyle: 'bold',
      }).setOrigin(0.5);
      container.add(pts);

      // Slight wobble
      this.tweens.add({
        targets: container,
        x: { value: `+=${Phaser.Math.Between(-20, 20)}`, ease: 'Sine.easeInOut' },
        duration: 800,
        yoyo: true,
        repeat: -1,
      });

      container.setData('speed', speed);
      container.setData('points', template.points);
      container.setData('radius', radius);
      container.setData('color', template.color);
      container.setData('emoji', template.emoji);

      this.items.push(container);
    }

    _tick() {
      if (!this.gameActive) return;
      this.timeLeft--;
      onTimeUpdate(this.timeLeft);
      if (this.timeLeft <= 0) {
        this._endGame();
      }
    }

    _endGame() {
      this.gameActive = false;
      this.spawnTimer.remove();
      this.countdownTimer.remove();

      // Clear remaining items
      this.items.forEach((item) => item.destroy());
      this.items = [];

      // Flash effect
      const flash = this.add.rectangle(
        this.scale.width / 2,
        this.scale.height / 2,
        this.scale.width,
        this.scale.height,
        0xffffff,
        0.4,
      );
      this.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 400,
        onComplete: () => {
          flash.destroy();
          onGameEnd(this.score);
        },
      });
    }

    _checkCollision(item) {
      const bx = this.bucket.x;
      const by = this.bucket.y;
      const halfW = this.bucketW / 2 + 8;
      const halfH = this.bucketH / 2 + 8;
      const radius = item.getData('radius');

      const dx = Math.abs(item.x - bx);
      const dy = Math.abs(item.y - by);

      return dx < halfW + radius * 0.5 && dy < halfH;
    }

    _catchItem(item, idx) {
      const points = item.getData('points');
      const color = item.getData('color');

      this.score += points;
      onScore(this.score);

      // Score pop-up
      const popColor = '#' + color.toString(16).padStart(6, '0');
      const pop = this.add.text(item.x, item.y, `+${points}`, {
        fontSize: '22px',
        color: popColor,
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 3,
      }).setOrigin(0.5);

      this.tweens.add({
        targets: pop,
        y: item.y - 60,
        alpha: 0,
        scaleX: 1.4,
        scaleY: 1.4,
        duration: 700,
        ease: 'Power2',
        onComplete: () => pop.destroy(),
      });

      // Burst particles
      this._burstParticles(item.x, item.y, color);

      // Bucket bounce
      this.tweens.add({
        targets: this.bucket,
        scaleY: { from: 1, to: 0.85 },
        duration: 80,
        yoyo: true,
        ease: 'Power2',
      });

      item.destroy();
      this.items.splice(idx, 1);
    }

    _burstParticles(x, y, color) {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dist = Phaser.Math.Between(20, 50);
        const dot = this.add.graphics();
        dot.fillStyle(color, 1);
        dot.fillCircle(x, y, Phaser.Math.Between(2, 5));

        this.tweens.add({
          targets: dot,
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          alpha: 0,
          scaleX: 0,
          scaleY: 0,
          duration: 400,
          ease: 'Power2',
          onComplete: () => dot.destroy(),
        });
      }
    }

    update(_time, delta) {
      if (!this.gameActive) return;

      const W = this.scale.width;
      const speed = 6;

      // Keyboard movement
      if (this.cursors.left.isDown || this.wasd.left.isDown) {
        this.targetX = Phaser.Math.Clamp(this.targetX - speed * 2, 45, W - 45);
      }
      if (this.cursors.right.isDown || this.wasd.right.isDown) {
        this.targetX = Phaser.Math.Clamp(this.targetX + speed * 2, 45, W - 45);
      }

      // Smooth bucket movement
      this.bucket.x = Phaser.Math.Linear(this.bucket.x, this.targetX, 0.18);

      const H = this.scale.height;
      const dt = delta / 1000;

      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        item.y += item.getData('speed') * dt;

        // Collision check
        if (this._checkCollision(item)) {
          this._catchItem(item, i);
          continue;
        }

        // Off-screen (missed)
        if (item.y > H + 40) {
          item.destroy();
          this.items.splice(i, 1);
        }
      }
    }
  };
}

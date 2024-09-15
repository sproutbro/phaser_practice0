import { createSpritesheet } from "./config/spritesheet.js";
import { createAnimations } from "./config/animations.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  createSpritesheet.call(this);
  this.load.image("tiles", "assets/tiles/towerDefense_tilesheet.png");
  this.load.tilemapTiledJSON("map", "assets/tilemap.json");
}

function create() {
  createAnimations.call(this);

  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("towerDefense_tilesheet", "tiles");
  map.createLayer("Tile Layer 1", tileset, 0, 0);

  const mapWidth = map.widthInPixels;
  const mapHeight = map.heightInPixels;
  this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

  this.socket = io();

  this.socket.on("players", setPlayers.bind(this));
  this.socket.on("hitEnemy", (hitEnemy) => {
    const { fire, enemies } = hitEnemy;
    const _fire = this.add
      .sprite(fire.clickedX, fire.clickedY)
      .play("fire", true);
    this.enemy.energyGauge.setText("Energy: " + enemies.zombie.energy);
    this.time.delayedCall(500, () => {
      _fire.destroy();
    });
  });

  this.socket.on("newPlayer", (player) => {
    this.players[player.id] = this.physics.add
      .sprite(player.x, player.y)
      .setCollideWorldBounds(true)
      .play("princess_down", true);

    this.players[player.id].energy = player.energy;

    this.players[player.id].energyGauge = this.add.text(
      player.x,
      player.y + 40,
      "Energy: " + player.energy,
      { fontSize: "16px", fill: "#fff" }
    );
  });

  this.socket.on("movePlayer", (player) => {
    if (this.players[player.id]) {
      this.players[player.id].setPosition(player.x, player.y);
    }
  });

  this.socket.on("moveEnemy", (enemy) => {
    this.enemy.setVelocity(enemy.x, enemy.y);
  });

  this.socket.on("removePlayer", (id) => {
    console.log(this.players[id].destroy());
    delete this.players[id];
  });

  function setPlayers(data) {
    this.players = {};
    const { players, enemies } = data;
    for (const key in players) {
      const newPlayer = players[key];

      this.players[key] = this.physics.add
        .sprite(newPlayer.x, newPlayer.y)
        .setCollideWorldBounds(true)
        .play("princess_down", true);

      this.players[key].energy = newPlayer.energy;

      this.players[key].energyGauge = this.add.text(
        newPlayer.x,
        newPlayer.y + 40,
        "Energy: " + newPlayer.energy,
        { fontSize: "16px", fill: "#fff" }
      );
    }

    this.player = this.players[this.socket.id];
    this.targetX = this.player.x;
    this.targetY = this.player.y;
    this.input.on("pointerdown", pointerdown.bind(this));
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(this.player);

    this.enemies = {};
    for (const key in enemies) {
      const newEnemy = enemies[key];
      this.enemies[key] = this.physics.add
        .sprite(newEnemy.x, newEnemy.y)
        .setCollideWorldBounds(true)
        .play("walk", true);
      this.enemies[key].setSize(
        this.enemies[key].width,
        this.enemies[key].height
      );
      this.enemies[key].energy = newEnemy.energy;

      this.enemies[key].energyGauge = this.add.text(
        newEnemy.x,
        newEnemy.y + 40,
        "Energy: " + newEnemy.energy,
        { fontSize: "16px", fill: "#fff" }
      );
    }

    this.enemy = this.enemies["zombie"];
    this.physics.add.collider(this.player, this.enemy, hitPlayer.bind(this));
  }

  function hitPlayer() {
    this.player.energy--;
    this.player.energyGauge.setText("Energy: " + this.player.energy);
  }

  function pointerdown(pointer) {
    const clickedX = pointer.worldX;
    const clickedY = pointer.worldY;

    const objects = this.physics.overlapRect(clickedX, clickedY, 1, 1);

    if (objects.length > 0) {
      this.socket.emit("hitEnemy", {
        fire: { clickedX, clickedY },
      });
    } else {
      this.targetX = pointer.worldX;
      this.targetY = pointer.worldY;

      const angle = Phaser.Math.Angle.Between(
        this.player.x,
        this.player.y,
        this.targetX,
        this.targetY
      );
      const speed = 200;

      this.player.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    }
  }
}

function update() {
  if (!this.player) return;
  if (!this.enemy) return;
  // this.physics.moveToObject(this.enemy, this.player, 50);
  this.player.energyGauge.setPosition(
    this.player.x - this.player.energyGauge.width / 2,
    this.player.y + 40
  );
  this.enemy.energyGauge.setPosition(
    this.enemy.x - this.enemy.energyGauge.width / 2,
    this.enemy.y + 40
  );

  if (
    Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.targetX,
      this.targetY
    ) < 4
  ) {
    this.player.setVelocity(0, 0); // 속도를 0으로 설정하여 멈춤
    this.player.x = this.targetX; // 목표 위치로 정확히 설정
    this.player.y = this.targetY;
  }
  if (this.player.x !== this.targetX || this.player.y !== this.targetY) {
    this.socket.emit("movePlayer", {
      id: this.socket.id,
      x: this.player.x,
      y: this.player.y,
    });
  }
}

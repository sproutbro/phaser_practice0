export function createSpritesheet() {
  this.load.spritesheet("orc1_idle", "assets/sprites/orc1_idle_full.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("orc1_walk", "assets/sprites/orc1_walk_full.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("orc2_idle", "assets/sprites/orc2_idle_full.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("orc2_walk", "assets/sprites/orc2_walk_full.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("princess", "assets/sprites/princess_sprite.png", {
    frameWidth: 47.75,
    frameHeight: 62.5,
  });
  this.load.spritesheet("zombie", "assets/sprites/character_zombie_sheet.png", {
    frameWidth: 96,
    frameHeight: 128,
  });

  this.load.spritesheet("fire", "assets/sprites/fire2_64.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
}

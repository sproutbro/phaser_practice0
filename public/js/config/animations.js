export function createAnimations() {
  this.anims.create({
    key: "princess_down",
    frames: this.anims.generateFrameNumbers("princess", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "princess_left",
    frames: this.anims.generateFrameNumbers("princess", {
      start: 4,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "princess_right",
    frames: this.anims.generateFrameNumbers("princess", {
      start: 8,
      end: 11,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "princess_up",
    frames: this.anims.generateFrameNumbers("princess", {
      start: 12,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "orc1_idle",
    frames: this.anims.generateFrameNumbers("orc1_idle", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "orc1_left",
    frames: this.anims.generateFrameNumbers("orc1_walk", {
      start: 12,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "orc1_right",
    frames: this.anims.generateFrameNumbers("orc1_walk", {
      start: 18,
      end: 23,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "orc1_up",
    frames: this.anims.generateFrameNumbers("orc1_walk", {
      start: 6,
      end: 11,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "orc1_down",
    frames: this.anims.generateFrameNumbers("orc1_walk", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNumbers("zombie", {
      start: 36,
      end: 43,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "fire",
    frames: this.anims.generateFrameNumbers("fire", {
      start: 0,
      end: 59,
    }),
    frameRate: 10,
    repeat: -1,
  });
}

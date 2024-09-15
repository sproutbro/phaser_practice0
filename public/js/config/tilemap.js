export function createMaps() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("towerDefense_tilesheet", "tiles");
  map.createLayer("Tile Layer 1", tileset, 0, 0);
  const mapWidth = map.widthInPixels;
  const mapHeight = map.heightInPixels;
  this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
}

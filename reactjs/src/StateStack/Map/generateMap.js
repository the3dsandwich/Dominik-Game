class Tile {
  constructor(loc) {
    this.loc = loc;
    this.display = "E";
  }
}

class FieldTile extends Tile {
  constructor(loc) {
    super(loc);
    this.loc = loc;
    this.display = "X";
  }
}

class PathTile extends Tile {
  constructor(loc) {
    super(loc);
    this.loc = loc;
    this.display = ".";
  }
}
class LadderTile extends Tile {
  constructor(loc) {
    super(loc);
    this.loc = loc;
    this.display = "L";
  }
}

class PlayerTile extends Tile {
  constructor(loc) {
    super(loc);
    this.loc = loc;
    this.display = "@";
  }
}

class ItemTile extends Tile {
  constructor(loc) {
    super(loc);
    this.loc = loc;
    this.display = "I";
  }
}

class MonsterTile extends Tile {
  constructor(loc) {
    super(loc);
    this.loc = loc;
    this.display = "M";
  }
}

const randomSelect = (elements, weights) => {
  if (elements.length !== weights.length) return null;
  const randNum = Math.random();
  let tw = 0,
    i = 0;
  for (const w of weights) {
    tw += w;
    if (randNum < tw) return elements[i];
    i++;
  }
};

const isNei = (a, b, alldir, size) => {
  if (0 <= a && a < size * size && 0 <= b && b < size * size) {
    if (Math.abs(a - b) === 1)
      return Math.floor(a / size) === Math.floor(b / size);
    if (Math.abs(a - b) === size) return true;
    if (
      (Math.abs(a - b) === size - 1 || Math.abs(a - b) === size + 1) &&
      alldir
    )
      return Math.floor(a / size) !== Math.floor(b / size);
  }
  return false;
};

const countNei = (i, g_map, t, size) =>
  [i - size, i - 1, i + 1, i + size].filter(
    x => isNei(x, i, false, size) && g_map[i] instanceof t
  ).length;

const setMINei = (i, g_map, size) => {
  [
    i - size - 1,
    i - size,
    i - size + 1,
    i - 1,
    i + 1,
    i + size - 1,
    i + size,
    i + size + 1
  ]
    .filter(x => isNei(x, i, true, size))
    .forEach(tileIndex => (g_map[tileIndex] = new PathTile(tileIndex)));
  return g_map;
};

const generateMap = size => {
  let g_map = [];
  let pathChecked = [];
  let monsterCount = 0;
  let itemCount = 0;

  // randomly assign terrain choices by weight
  for (let index = 0; index < size * size; index++) {
    g_map[index] = randomSelect(
      [
        new FieldTile(index),
        new PathTile(index),
        new MonsterTile(index),
        new ItemTile(index)
      ],
      [0.38, 0.6, 0.01, 0.01]
    );
    pathChecked[index] = false;
  }

  // Shrink isolated FIELD
  for (const tile of g_map) {
    if (
      tile instanceof FieldTile &&
      countNei(tile.loc, g_map, FieldTile, size) < 1
    )
      g_map[tile.loc] = new PathTile(tile.loc);
  }

  // Shrink isolated PATH
  for (const tile of g_map) {
    if (
      tile instanceof PathTile &&
      countNei(tile.loc, g_map, PathTile, size) < 2
    )
      g_map[tile.loc] = new FieldTile(tile.loc);
  }

  // Change Monster and Item neighbor to PATH
  for (const tile of g_map) {
    if (tile instanceof MonsterTile || tile instanceof ItemTile) {
      // set neighbors to pathtile
      g_map = setMINei(tile.loc, g_map, size);
    }
  }

  // Change border to FIELD
  for (const tile of g_map) {
    if (
      Math.floor(tile.loc / size) === 0 ||
      Math.floor(tile.loc / size) === size - 1 ||
      tile.loc % size === 0 ||
      tile.loc % size === size - 1
    )
      g_map[tile.loc] = new FieldTile(tile.loc);
  }

  let largestBlock = [];
  // Mark visited tiles as True in path_chked in visited blocks
  for (const tile of g_map) {
    if (tile instanceof PathTile && !pathChecked[tile.loc]) {
      let frontiers = [];
      frontiers.push(tile.loc);
      while (true) {
        let pre = frontiers;
        for (const j of frontiers) {
          pathChecked[j] = true;
          frontiers.push(
            ...[j - size, j - 1, j + 1, j + size].filter(
              x =>
                isNei(x, j, false, size) &&
                !pre.includes(x) &&
                (g_map[x] instanceof ItemTile ||
                  g_map[x] instanceof MonsterTile ||
                  g_map[x] instanceof PathTile)
            )
          );
        }
        frontiers.sort();
        if (pre === frontiers) {
          if (largestBlock.length < frontiers.length) largestBlock = frontiers;
          break;
        }
      }
    }
  }

  // Delete all blocks that are not the largest block
  for (const tile of g_map) {
    if (!largestBlock.includes(tile.loc))
      g_map[tile.loc] = new FieldTile(tile.loc);
  }

  // Assign random tile as LADDER
  let ladderIndex = Math.floor(Math.random() * size * size);
  while (!largestBlock.includes(ladderIndex))
    ladderIndex = Math.floor(Math.random() * size * size);
  g_map[ladderIndex] = new LadderTile(ladderIndex);

  // Count monster and items
  for (const tile of g_map) {
    if (tile instanceof MonsterTile) monsterCount++;
    if (tile instanceof ItemTile) itemCount++;
  }

  return {
    map: g_map,
    size: size,
    blockSize: largestBlock.length,
    ladderIndex: ladderIndex,
    playerLoc: ladderIndex,
    monsterCount: monsterCount,
    itemCount: itemCount,
    viewRange: 7
  };
};

export default generateMap;
export { PlayerTile, FieldTile, isNei };

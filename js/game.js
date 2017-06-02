import { render }    from './util/render';
import { input }     from './util/input';
import { animation } from './util/animation';
import { movement }  from './util/movement';
import { physics }   from './util/physics';

import Mario  from './entities/mario';
import Goomba from './entities/goomba';
import Koopa  from './entities/koopa';
import Mushroom from './entities/mushroom';
import Coin   from './entities/coin';
import Score  from './entities/score';

// COLISSIONS. STOMP IF MARIO IS COMING DOWN. Y VEL > 0

// mario shrink on damage. no growing while dying
// build level
// finish: better hitboxes. damage.
// invisible wall on left edge. game reset
// shells kill goombas

// extras: animate blocks. mario duck/run

class Game {
  init() {
    const canvasEl = document.getElementById('game-canvas');
    const ctx = canvasEl.getContext('2d');
    ctx.scale(2, 2);

    const canvas = {
      canvas: canvasEl,
      ctx: ctx
    };

    const viewport = {
      width: 760,
      height: 600,
      vX: 0,
      vY: 0
    };

    const backgroundMusic =
      new Audio('./assets/audio/music/underground_theme.mp3');
    backgroundMusic.loop = true;

    const spriteSheet = new Image();
    spriteSheet.src = './assets/sprites/spritesheet.png';

    spriteSheet.addEventListener('load', () => {

      const data = {
        animationFrame: 0,
        spriteSheet: spriteSheet,
        canvas: canvas,
        viewport: viewport,
        entities: {},
        userControl: true
      };

      const mario = new Mario(spriteSheet, 30, 0, 16, 16);
      const score = new Score(290, 30);

      const goomba = new Goomba(spriteSheet, 100, 0, 16, 16);
      const koopa  = new Koopa(spriteSheet, 200, 0, 16, 24);
      const mushroom  = new Mushroom(spriteSheet, 250, 0, 16, 16);

      // backgroundMusic.play();

      input.init(data);
      data.entities.mario = mario;
      data.entities.score = score;
      data.entities.coins = [];
      data.entities.mushrooms = [mushroom];
      data.entities.goombas = [goomba];
      data.entities.koopas = [koopa];

      render.init(data);
      this.run(data);
    });
  }

  run(data) {
    const loop = () => {
      input.update(data);
      animation.update(data);
      movement.update(data);
      physics.update(data);

      this.updateView(data);
      render.update(data);

      data.animationFrame++;
      window.requestAnimationFrame(loop);
    };

    loop();
  }

  updateView(data) {
    const viewport = data.viewport;
    const margin = viewport.width / 4;
    const mario = data.entities.mario;
    const score = data.entities.score;

    const center = {
      x: mario.xPos + (mario.width  * 0.5),
      y: mario.yPos + (mario.height * 0.5)
    };

    if (center.x < viewport.vX + margin * 2) {
      viewport.vX = Math.max(center.x - margin, 0);
    } else if (center.x > viewport.vX + viewport.width - margin * 2) {
      viewport.vX =
        Math.min(center.x + margin - viewport.width, 3400 - viewport.width);
    }

    if (center.y < viewport.vY + margin) {
      viewport.vY = Math.max(center.y - margin, 0);
    } else if (center.y > viewport.vY + viewport.height - margin) {
      viewport.vY =
        Math.min(center.y + margin - viewport.height, 800 - viewport.height);
    }
  }
}

const game = new Game;
game.init();

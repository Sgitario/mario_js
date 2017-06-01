import Entity from './entity';
import Sprite from './sprite';

class Koopa extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 253, 29, 16, 24);
    super('koopa', sprite, xPos, yPos, width, height);

    let self = this;
    this.squishSound = new Audio('./assets/audio/sounds/stomp.wav');

    this.spriteAnimations = {
      walkRight : {
        frames: [
          new Sprite(img, 253, 29, 16, 24),
          new Sprite(img, 237, 29, 16, 24)
        ],
        currentFrame: 0
      },

      walkLeft: {
        frames: [
          new Sprite(img, 173, 5, 16, 24),
          new Sprite(img, 189, 5, 16, 24)
        ],
        currentFrame: 0
      },
      hiding: new Sprite(img, 237, 14, 8, 8)
    };

    this.states = {
      walking: {
        movement(data) {
          if (self.direction === "right") {
            self.xPos += self.velX;
          } else {
            self.xPos -= self.velX;
          }
        },

        animation(data) {
          if (self.direction === "right") {
            if (data.animationFrame % 10 === 0) {
              self.sprite = self.spriteAnimations.walkRight.
                frames[self.spriteAnimations.walkRight.currentFrame];

              self.spriteAnimations.walkRight.currentFrame++;

              if (self.spriteAnimations.walkRight.currentFrame > 1) {
                self.spriteAnimations.walkRight.currentFrame = 0;
              }
            }
          } else {
            if (data.animationFrame % 10 === 0) {
              self.sprite = self.spriteAnimations.walkLeft.
                frames[self.spriteAnimations.walkLeft.currentFrame];
              self.spriteAnimations.walkLeft.currentFrame++;

              if (self.spriteAnimations.walkLeft.currentFrame > 1) {
                self.spriteAnimations.walkLeft.currentFrame = 0;
              }
            }
          }
        }
      },

      hiding: {
        movement(data) {
          self.velX = 0;
        },
        animation(data) {
          self.sprite = self.spriteAnimations.hiding;
        }
      },

      sliding: {
        movement(data) {
          self.velX = 2;
          if (self.direction === "right") {
            self.xPos += self.velX;
          } else {
            self.xPos -= self.velX;
          }
        },

        animation(data) {
          self.sprite = self.spriteAnimations.hiding;
        }
      }
    };

    this.currentState = this.states.walking;
    this.direction = 'right';
    this.velY = 0;
    this.velX = .5;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }
}

export default Koopa;


// level 1-1 locations
// <object id="150" x="400" y="176" width="16" height="16"/>
// <object id="151" x="864" y="176" width="16" height="16"/>
// <object id="152" x="2352" y="176" width="16" height="16"/>

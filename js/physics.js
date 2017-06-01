export const physics = {
  update(data) {
    this.collisionDetection(data);
    this.sceneryCollisionDetection(data);

    this.gravity(data.entities.mario);

    data.entities.goombas.forEach(goomba => {
      this.gravity(goomba);
    });

    data.entities.koopas.forEach(koopa => {
      this.gravity(koopa);
    });
  },

  collisionDetection(data) {
    const mario = data.entities.mario;
    const goombas = data.entities.goombas;
    const koopas = data.entities.koopas;

    const entityCollisionCheck = (entity) => {
      if (mario.xPos < entity.xPos + entity.width &&
          mario.xPos + mario.width > entity.xPos &&
          mario.yPos < entity.yPos + entity.height &&
          mario.height + mario.yPos > entity.yPos) {
        // Collision Occured
        this.handleCollision(data, entity);
      }
    };

    goombas.forEach(goomba => {
      entityCollisionCheck(goomba);
    });

    koopas.forEach(koopa => {
      entityCollisionCheck(koopa);
    });
  },

  handleCollision(data, entity) {
    const mario = data.entities.mario;

    if ((entity.type === 'goomba') ||
       (entity.type === 'koopa')) {

      // Left side
      if (mario.xPos < entity.xPos && mario.yPos >= entity.yPos) {
        mario.xPos = entity.xPos - mario.width;
        console.log('mario dead');
      }
      // Right side
      if (mario.xPos > entity.xPos && mario.yPos >= entity.yPos) {
        mario.xPos = entity.xPos + entity.width;
        console.log('mario dead');
      }
      // Top
      if (mario.yPos < entity.yPos && (mario.xPos + mario.width) > entity.xPos &&
          mario.xPos < (entity.xPos + entity.width) && mario.yVel >= 0) {
            mario.currentState = mario.states.standing;
            mario.yPos = entity.yPos - mario.height;
            mario.yVel = 0;
            console.log(`${entity.type} dead`);
            // entity.dead = true
      }

      // if (mario.yPos < entity.yPos && (mario.xPos + mario.width) > entity.xPos + 10 &&
      //     mario.xPos < (entity.xPos + entity.width) - 10 && mario.yVel >= 0) {
      //       mario.currentState = mario.states.standing;
      //       mario.yPos = entity.yPos - mario.height;
      //       mario.yVel = 0;
      // }
    }
  },

  sceneryCollisionDetection(data) {
    const mario = data.entities.mario;
    const goombas = data.entities.goombas;
    const koopas = data.entities.koopas;
    const scenery = data.entities.scenery;
    this.sceneryCollisionCheck([mario], scenery);
    this.sceneryCollisionCheck(goombas, scenery);
    this.sceneryCollisionCheck(koopas, scenery);
  },

  sceneryCollisionCheck(entities, scenery) {
    entities.forEach(entity => {
      scenery.forEach(scene => {
        if (entity.xPos < scene.xPos + scene.width &&
          entity.xPos + entity.width > scene.xPos &&
          entity.yPos < scene.yPos + scene.height &&
          entity.height + entity.yPos > scene.yPos) {
            // Collision Occured
            this.sceneryCollision(entity, scene);
          }
      });
    });
  },

  sceneryCollision(entity, scene) {
      // Left side
      if (entity.xPos < scene.xPos && entity.yPos >= scene.yPos) {
        entity.xPos = scene.xPos - entity.width;

        if ((entity.type === 'goomba') || (entity.type === 'koopa')) {
          entity.direction = entity.direction === 'left' ? 'right' : 'left';
        }
      }
      // Right side
      if (entity.xPos > scene.xPos && entity.yPos >= scene.yPos) {
        entity.xPos = scene.xPos + scene.width;

        if ((entity.type === 'goomba') || (entity.type === 'koopa')) {
          entity.direction = entity.direction === 'left' ? 'right' : 'left';
        }
      }
      // Top
      if (entity.yPos < scene.yPos && (entity.xPos + entity.width) > scene.xPos + 10 &&
          entity.xPos < (scene.xPos + scene.width) - 10 && entity.yVel >= 0) {
            if (entity.type === 'mario') {
              entity.currentState = entity.states.standing;
            }
            entity.yPos = scene.yPos - entity.height;
            entity.yVel = 0;
      }

      // if (mario.yPos < entity.yPos && (mario.xPos + mario.width) > entity.xPos + 10 &&
      //     mario.xPos < (entity.xPos + entity.width) - 10 && mario.yVel >= 0) {
      //       mario.currentState = mario.states.standing;
      //       mario.yPos = entity.yPos - mario.height;
      //       mario.yVel = 0;
      // }
    },

  gravity(entity) {
    entity.yVel += 1.2;
    entity.yPos += entity.yVel;
  }
};

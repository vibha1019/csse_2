---
layout: default
title: JS Mario Animation
description: Use JavaScript without external libararies to animate Mario moving across screen, OOP style.
categories: [C5.0, C7.0, C7.6]
image: /images/mario_animation.png
courses: { csse: {week: 6} }
type: ccc
---

{% assign sprite_file = site.baseurl | append: page.image %}
{% assign hash = site.data.mario_metadata %}
{% assign pixels = 512 %} <!-- Increase pixel size to make the sprite bigger -->

<p id="mario" class="sprite"></p>
  
<style>
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  #mario {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}}* -1px);
  }
</style>

<script>
  var mario_metadata = {};
  {% for key in hash %}
    var key = "{{ key | first }}";
    var values = {};
    values["row"] = {{ hash[key].row }};
    values["col"] = {{ hash[key].col }};
    values["frames"] = {{ hash[key].frames }};
    mario_metadata[key] = values;
  {% endfor %}

  class Mario {
    constructor(meta_data) {
      this.tID = null;
      this.positionX = 0;
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario");
      this.pixels = {{ pixels }};
      this.interval = 100;
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }

    animate(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startWalking() {
      this.stopAnimate();
      this.animate(this.obj["Walk"], 3);
    }

    startRunning() {
      this.stopAnimate();
      this.animate(this.obj["Run1"], 6);
    }

    startPuffing() {
      this.stopAnimate();
      this.animate(this.obj["Puff"], 0);
    }

    startCheering() {
      this.stopAnimate();
      this.animate(this.obj["Cheer"], 0);
    }

    startFlipping() {
      this.stopAnimate();
      this.animate(this.obj["Flip"], 0);
    }

    startResting() {
      this.stopAnimate();
      this.animate(this.obj["Rest"], 0);
    }

    startWalkingLeft() {
      this.stopAnimate();
      this.animate(this.obj["WalkL"], -3);  // Negative speed for left movement
    }

    startRunningLeft() {
      this.stopAnimate();
      this.animate(this.obj["Run1L"], -6);  // Negative speed for left movement
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  const mario = new Mario(mario_metadata);

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed === 0) {
          mario.startWalking();
        } else if (mario.currentSpeed === 3) {
          mario.startRunning();
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        mario.startWalkingLeft();
      }
    }
  });

  window.addEventListener("touchstart", (event) => {
    event.preventDefault();
    if (event.touches[0].clientX > window.innerWidth / 2) {
      if (currentSpeed === 0) {
        mario.startWalking();
      } else if (currentSpeed === 3) {
        mario.startRunning();
      }
    } else {
      mario.startWalkingLeft();
    }
  });

  window.addEventListener("blur", () => {
    mario.stopAnimate();
  });

  window.addEventListener("focus", () => {
    mario.startFlipping();
  });

  document.addEventListener("DOMContentLoaded", () => {
    mario.startResting();
  });

</script>

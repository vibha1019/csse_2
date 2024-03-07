---
layout: base
title: Course Outlines
image: /images/mario_animation.png
hide: true
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Outlines</title>
  <style>
    /* CSS style rules for the id and class of the sprite... */
    .sprite {
      height: 256px;
      width: 256px;
      background-image: url('/images/mario_animation.png');
      background-repeat: no-repeat;
    }
  </style>
</head>
<body>
  <button onclick="startMario()">Start Mario</button>
  <button onclick="stopMario()">Stop Mario</button>

  <p id="mario" class="sprite" style="display: none;"></p>

  <script>
    // Convert YML hash to JavaScript key:value objects
    var mario_metadata = {};
    {% for key in hash %}
    var key = "{{key | first}}";
    var values = {};
    values["row"] = {{key.row}};
    values["col"] = {{key.col}};
    values["frames"] = {{key.frames}};
    mario_metadata[key] = values;
    {% endfor %}

    // Game object for player
    class Mario {
      constructor(meta_data) {
        this.tID = null;  // Capture setInterval() task ID
        this.positionX = 0;  // Current position of sprite in X direction
        this.currentSpeed = 0;
        this.marioElement = document.getElementById("mario"); // HTML element of sprite
        this.pixels = 256; // Pixel offset of images in the sprite, set by liquid constant
        this.interval = 100; // Animation time interval
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

      startWalkingRight() {
        this.stopAnimate();
        this.animate(this.obj["Walk"], 3);
      }

      startRunningRight() {
        this.stopAnimate();
        this.animate(this.obj["Run1"], 6);
      }

      startWalkingLeft() {
        this.stopAnimate();
        this.animate(this.obj["WalkL"], -3);  // Negative speed for left movement
      }

      startRunningLeft() {
        this.stopAnimate();
        this.animate(this.obj["Run1L"], -6);  // Negative speed for left movement
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

      stopAnimate() {
        clearInterval(this.tID);
      }
    }

    const mario = new Mario(mario_metadata);

    // Function to start Mario
    function startMario() {
      document.getElementById("mario").style.display = "block";
      mario.startResting();
      alert("Instructions:\n\nArrow keys to move Mario:\n- Left Arrow: Left Walk\n- Right Arrow: Right Walk\n- Hold Left Arrow: Left Run\n- Hold Right Arrow: Right Run\n\nPress 'p' to make Mario puff\nPress 'f' to make Mario flip\nPress 'r' to make Mario rest");
    }

    // Function to stop Mario
    function stopMario() {
      mario.stopAnimate();
      document.getElementById("mario").style.display = "none";
    }

    // Event control
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (mario.currentSpeed === 0 || mario.currentSpeed === -3 || mario.currentSpeed === -6) {
          mario.startWalkingRight();
        } else if (mario.currentSpeed === 3) {
          mario.startRunningRight();
        }
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (mario.currentSpeed === 0 || mario.currentSpeed === 3 || mario.currentSpeed === 6) {
          mario.startWalkingLeft();
        } else if (mario.currentSpeed === -3) {
          mario.startRunningLeft();
        }
      } else if (event.key === "p") {
        event.preventDefault();
        mario.startPuffing();
      } else if (event.key === "f") {
        event.preventDefault();
        mario.startFlipping();
      } else if (event.key === "r") {
        event.preventDefault();
        mario.startResting();
      }
    });
  </script>

  Investing in Your Technical Future

Explore the Computer Science Pathway at Del Norte High School. All Del Norte CompSci classes are designed to provide a real-world development experience. Grading is focused on time invested, analytics, participation with peers, and engagement in learning.

- Project-based learning with teacher support
- Tech Talks by teacher complemented with Student Teaching
- Course learning includes Coding Languages, DevOps, GitHub, Research, and Creativity
- Student teams practice Agile Development Methodologies: planning, communication, collaboration
- Class lab time provided and approximately 2-3 hours of homework per week

</body>
</html>


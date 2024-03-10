---
layout: base
title: Course Outlines
image: /images/mario_animation.png
hide: true
---

<!-- Liquid: statements -->

<!-- Include submenu from _includes to top of pages -->
{% include nav_home.html %}
<!--- Concatenation of site URL to frontmatter image  --->
{% assign sprite_file = site.baseurl | append: page.image %}
<!--- Hash is a list variable containing mario metadata for sprite --->
{% assign hash = site.data.mario_metadata %}  
<!--- Size width/height of Sprit images --->
{% assign pixels = 256 %} 

<!--- HTML for page contains <p> tag named "Mario" and class properties for a "sprite"  -->

<button onclick="startMario()">Start Mario</button>

<p id="mario" class="sprite" style="display: none;"></p>
  
<!--- Embedded Cascading Style Sheet (CSS) rules, define how HTML elements look --->
<style>

  /* CSS style rules for the id and class of the sprite... */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  /* Background position of sprite element */
  #mario {
    background-position: calc({{mario_metadata["Walk"].col}} * {{pixels}} * -1px) calc({{mario_metadata["Walk"].row}} * {{pixels}}* -1px);
  }
</style>

<script>
  ////////// convert YML hash to JavaScript key:value objects /////////

  var mario_metadata = {}; // Key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  // Key
  var values = {} // Values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  mario_metadata[key] = values; // Key with values added

  {% endfor %}

  ////////// game object for player /////////

  class Mario {
    constructor(meta_data) {
      this.tID = null;  // Capture setInterval() task ID
      this.positionX = 0;  // Current position of sprite in X direction
      this.currentSpeed = 0;
      this.runningInterval = 50; // Animation time interval for running (50 milliseconds for faster animation)
      this.walkingInterval = 100; // Animation time interval for walking (original speed)
      this.facingLeft = false; // Initially facing right
      this.marioElement = document.getElementById("mario"); // HTML element of sprite
      this.pixels = {{pixels}}; // Pixel offset of images in the sprite, set by liquid constant
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }

    animate(obj, speed, interval, loop) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;
      let loops = 0;

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

        if (!loop) {
          loops++;
          if (loops >= obj.frames) {
            clearInterval(this.tID);
          }
        }
      }, interval);
    }

    startWalkingRight() {
      this.stopAnimate();
      this.animate(this.obj["Walk"], 3, this.walkingInterval, true);
      this.facingLeft = false;
    }

    startRunningRight() {
      this.stopAnimate();
      this.animate(this.obj["Run1"], 6, this.runningInterval, true);
      this.facingLeft = false;
    }

    startWalkingLeft() {
      this.stopAnimate();
      this.animate(this.obj["WalkL"], -3, this.walkingInterval, true);  // Negative speed for left movement
      this.facingLeft = true;
    }

    startRunningLeft() {
      this.stopAnimate();
      this.animate(this.obj["Run1L"], -6, this.runningInterval, true);  // Negative speed for left movement
      this.facingLeft = true;
    }

    startPuffing() {
      this.stopAnimate();
      if (this.facingLeft) {
        this.animate(this.obj["PuffL"], 0, this.walkingInterval, true);
      } else {
        this.animate(this.obj["Puff"], 0, this.walkingInterval, true);
      }
    }

    startCheering() {
      this.stopAnimate();
      this.animate(this.obj["Cheer"], 0, this.walkingInterval, true);
    }

    startFlipping() {
      this.stopAnimate();
      if (this.facingLeft) {
        this.animate(this.obj["FlipL"], 0, this.walkingInterval, false);
      } else {
        this.animate(this.obj["Flip"], 0, this.walkingInterval, false);
      }
    }

    startResting() {
      this.stopAnimate();
      if (this.facingLeft) {
        this.animate(this.obj["RestL"], 0, this.walkingInterval, true);
      } else {
        this.animate(this.obj["Rest"], 0, this.walkingInterval, true);
      }
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  const mario = new Mario(mario_metadata);

  ////////// event control /////////

  function startMario() {
    document.getElementById("mario").style.display = "block";
    mario.startResting();
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
<style>
  h1 {
    font-family: 'Courier New', serif;
    color: violet;
  }

  h2 {
    font-family: 'Courier New', serif;
    color: violet;
  }

  h3 {
    font-family: 'Courier New', serif;
    color: violet;
  }

  p {
    font-family: 'Courier New', sans-serif;
    color: beige;
  }
</style>

<html>
<head>
    <title>Vibha's Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #FFF; /* Default text color on black background */
            background-color: #000; /* Black background */
        }

        h1 {
            font-family: 'Times New Roman', serif; /* Custom font for headings */
            color: #FF69B4; /* Custom color for headings (pink) */
        }

        h2 {
            font-family: 'Times New Roman', serif; /* Custom font for headings */
            color: #87CEEB; /* Custom color for headings (light blue) */
        }

        p {
            font-family: 'Arial', sans-serif; /* Custom font for paragraphs */
            color: #FFF; /* Custom color for paragraphs (white) */
        }
    </style>
</head>
<body>

<h1>Vibha Mandayam</h1>

<h2>Introduction</h2>
<p>My name is Vibha Mandayam, and I am a freshman at DNHS. I'm excited to learn more about computer science through the classes I take in the next 4 years.</p>

<h2>Goals</h2>
<p>I am excited to create more games and apps. My group was able to create a game last trimester, and I would like to continue making more advanced projects in the future.</p>

</body>
</html>

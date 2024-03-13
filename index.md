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

<section id="game-section">
    <h1>Group Project</h1>
    <p>This is where your game will appear.</p>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                margin: 0;
                overflow: hidden;
                background-image: url('https://raw.githubusercontent.com/vibha1019/group_project/main/hay-day-pop-farm-landscape-5gnb6fggiz8rj9h4.jpg');
                background-size: cover; /* Adjust the background size as needed */
                background-repeat: no-repeat; /* Prevent the background image from repeating */
            }
            .wrap {
                margin-left: auto;
                margin-right: auto;
            }
            canvas {
                display: block;
                border-style: solid;
                border-width: 30px;
                border-color: #FFFFFF;
            }
            canvas:focus {
                outline: block;
            }  
            #game-container {
                position: relative;
                width: 100%;
                height: 100vh;
                box-sizing: border-box;
                border: 20px solid #000; /* Thick black border */
                overflow: hidden;
                margin: 0 auto;
            }  
            #hamster {
                position: absolute;
                bottom: 10px;
                left: 0;
                transform: translateX(0);
                font-size: 10em; /* Adjust the font size to make the hamster bigger */
                transition: transform 0.3s ease-out; /* Adjust the transition duration for a faster slide */
            } 
            #score {
                position: absolute;
                bottom: 10px;
                right: 10px;
                font-size: 2em;
                color: white;
            }
            .falling-item {
                position: absolute;
                font-size: 4em; /* Adjust the font size to make the carrots bigger */
                animation: fall 3s linear infinite;
            } 
            @keyframes fall {
                to {
                    transform: translateY(100vh);
                }
            }
            .modal {
                display: none;
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgb(0,0,0);
                background-color: rgba(0,0,0,0.4);
                padding-top: 60px;
            }
            .modal-content {
                background-color: #fefefe;
                margin: 5% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 80%;
                max-width: 400px;
                text-align: center;
            }
            .modal-content h2 {
                margin-bottom: 20px;
            }
            .difficulty-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 20px;
            }
            .difficulty-buttons button {
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                background-color: #4CAF50; /* Green color */
                color: white;
                border: none;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            .difficulty-buttons button:hover {
                background-color: #45a049; /* Darker green color on hover */
            }
            .start-button {
                background-color: #008CBA; /* Blue color */
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .start-button:hover {
                background-color: #0077A3; /* Darker blue color on hover */
            }
            .restart-button {
                display: block;
                margin: 10px auto;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                background-color: #008CBA; /* Blue color */
                color: white;
                border: none;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            .restart-button:hover {
                background-color: #0077A3; /* Darker blue color on hover */
            }
        </style>
    </head>
    <body>
        <!-- Modal box for game over -->
        <div id="game-over-modal" class="modal">
            <div class="modal-content">
                <h2>Game Over!</h2>
                <p>Your final score: <span id="final-score-modal">0</span></p>
                <p>High Score: <span id="high-score">0</span></p>
                <button class="restart-button" onclick="restartGame()">Restart</button>
            </div>
        </div>
        <!-- Modal box for selecting difficulty level -->
        <div id="modal" class="modal">
            <div class="modal-content">
                <h2>Hamster Chomp</h2>
                <div class="difficulty-buttons">
                    <button onclick="setGameMode('easy')">Easy</button>
                    <button onclick="setGameMode('medium')">Medium</button>
                    <button onclick="setGameMode('fast')">Fast</button>
                </div>
                <button class="start-button" onclick="startGame()">Start Game</button>
            </div>
        </div>
        <div id="hamster">🐹</div>
        <div id="score">Score: 0</div>
        <script>
            const hamster = document.getElementById('hamster');
            const scoreElement = document.getElementById('score');
            const finalScoreElement = document.getElementById('final-score-modal');
            const highScoreElement = document.getElementById('high-score');
            let hamsterPosition = 0;
            let score = 0;
            let itemCreationInterval;
            let collisionCheckInterval;
            let currentMode = 'easy'; // Initialize current mode to 'easy'
            let highScore = localStorage.getItem('highScore') || 0; // Retrieve high score from localStorage
            highScoreElement.textContent = highScore; // Display high score
            // Define different game modes with corresponding falling speeds
            const gameModes = {
                easy: { speed: 3000 },   // Slow speed
                medium: { speed: 2000 }, // Medium speed
                fast: { speed: 1000 }    // Fast speed
            };
            // Function to set the game mode based on user selection
            function setGameMode(mode) {
                currentMode = mode;
                // Optionally, update other game parameters based on the selected mode
            }
            // Function to start the game
            function startGame() {
                document.getElementById('modal').style.display = 'none'; // Hide modal box
                setTimeout(() => {
                    itemCreationInterval = setInterval(createFallingItem, gameModes[currentMode].speed);
                    collisionCheckInterval = setInterval(() => {
                        document.querySelectorAll('.falling-item').forEach((item) => {
                            checkCollision(item);
                        });
                    }, 100);
                }, 2000); // Adjust the delay duration (in milliseconds) as needed
            }
            // Add event listener to move hamster when arrow keys are pressed
            window.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft') {
                    moveHamster('left');
                } else if (event.key === 'ArrowRight') {
                    moveHamster('right');
                }
            });
            // Function to move hamster
            function moveHamster(direction) {
                const step = 50; // Adjust the step for a faster slide
                const bodyWidth = document.body.clientWidth;
                if (direction === 'left') {
                    hamsterPosition = Math.max(hamsterPosition - step, 0);
                } else if (direction === 'right') {
                    hamsterPosition = Math.min(hamsterPosition + step, bodyWidth);
                }
                hamster.style.transform = `translateX(${hamsterPosition}px)`;
            }
            // Function to create falling items
            function createFallingItem() {
                const fallingItem = document.createElement('div');
                fallingItem.classList.add('falling-item');
                fallingItem.innerHTML = '🥕'; // Carrot emoji
                fallingItem.style.left = `${Math.random() * 90 + 5}vw`;
                fallingItem.style.top = `${Math.random() * -10 - 10}vh`; // Adjust the value for a higher initial position
                document.body.appendChild(fallingItem);
                fallingItem.addEventListener('animationend', () => {
                    fallingItem.remove();
                });
                checkCollision(fallingItem);
            }
            // Function to check collision between falling items and hamster
            function checkCollision(fallingItem) {
                const hamsterRect = hamster.getBoundingClientRect();
                const itemRect = fallingItem.getBoundingClientRect();       
                // Define a margin to consider the item as "reaching" the bottom
                const margin = 100; // Adjust as needed        
                // Check if falling item is close to the bottom of the game area
                if (itemRect.bottom + margin >= window.innerHeight) {
                    // Falling item is close to the bottom, trigger game over logic
                    showGameOver();
                    return; // Exit the function early to prevent further processing
                }        
                // Check collision with hamster
                if (
                    itemRect.bottom >= hamsterRect.top &&
                    itemRect.top <= hamsterRect.bottom &&
                    itemRect.right >= hamsterRect.left &&
                    itemRect.left <= hamsterRect.right
                ) {
                    // Collision occurred with hamster
                    fallingItem.remove();
                    score++;
                    scoreElement.textContent = `Score: ${score}`;
                }
            }
            // Function to display game over modal
            function showGameOver() {
                document.getElementById('game-over-modal').style.display = 'block';
                finalScoreElement.textContent = score;
                // Update high score if necessary
                if (score > highScore) {
                    highScore = score;
                    highScoreElement.textContent = highScore;
                    localStorage.setItem('highScore', highScore); // Store high score in localStorage
                }
                // Stop the game
                clearInterval(itemCreationInterval);
                clearInterval(collisionCheckInterval);
            }
            // Function to restart the game
            function restartGame() {
                document.getElementById('game-over-modal').style.display = 'none';
                // Reset variables and restart the game
                score = 0;
                scoreElement.textContent = 'Score: 0';
                itemCreationInterval = setInterval(createFallingItem, gameModes[currentMode].speed);
                collisionCheckInterval = setInterval(() => {
                    document.querySelectorAll('.falling-item').forEach((item) => {
                        checkCollision(item);
                    });
                }, 100);
            }
            // Show modal box when the page loads
            window.addEventListener('load', () => {
                document.getElementById('modal').style.display = 'block';
            });
        </script>
    </body>
    </html>
    <!-- Your game code goes here -->
</section>

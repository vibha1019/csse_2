import GameEnv from './GameEnv.js';

const GameControl = {
    // Existing methods...

    gameLoop() {
        // Turn game loop off during transitions
        if (!this.inTransition) {
            // Get current level
            GameEnv.update();
            const currentLevel = GameEnv.currentLevel;

            // currentLevel is defined
            if (currentLevel) {
                // run the isComplete callback function
                if (currentLevel.isComplete && currentLevel.isComplete()) {
                    const currentIndex = GameEnv.levels.indexOf(currentLevel);
                    // next index is in bounds
                    if (currentIndex !== -1 && currentIndex + 1 < GameEnv.levels.length) {
                        // transition to the next level
                        this.transitionToLevel(GameEnv.levels[currentIndex + 1]);
                    } 
                }
            // currentLevel is null, (ie start or restart game)
            } else {
                // transition to beginning of game
                this.transitionToLevel(GameEnv.levels[0]);
            }
        }

        // Update score and time display
        document.getElementById("scoreDisplay").innerText = `Score: ${GameEnv.score}`;
        document.getElementById("timeDisplay").innerText = `Time: ${GameEnv.time}`;

        // recycle gameLoop, aka recursion
        requestAnimationFrame(this.gameLoop.bind(this));  
    },

    // Existing methods...
};

export default GameControl;

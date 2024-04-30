## FINITE STATE MACHINES

# THE ISSUE
During the past weeks, our group was tasked with the issues of the jump platform. The player was able to go through jump platforms, we wanted to prevent that and have the player climb up the jump platform when it touches the sides. 


# WHAT WE LEARNED

We learned that finite state machines reads what is going on in the code and reacts to it (if x happens, then y). For example, when we were working on the jump platform, we had to communicate in the code that if the player touches the left or right side of the platform, it could only go a certain directions and it has to climb up. The computer then reads the code, and if the requirements are met (if the player touches the left or right side) it carries out the ‘then’ functions. To carry out these functions, the computer has to recognize when the player has touched the jump platform. If it has, then the computer knows to enter the jump platform state to carry out the functions. 


# APPLICATION

We decided to add more code in the JumpPlatform case, so there would be more clarity on what to do when the player is in a collision state, and when it is accessing the jump platform. 
```
case "jumpPlatform":
                // Player is on top of the jump platform
                if (this.collisionData.touchPoints.this.onTopofPlatform) {
                    this.state.movement = { up: false, down: false, left: true, right: true, falling: false};
                    this.gravityEnabled = false;
                } else if (this.collisionData.touchPoints.this.right) {
                    this.state.movement = { up: false, down: false, left: true, right: false, falling: false};
                    this.y -= 4;

                // Player is touching the wall with left side
                } else if (this.collisionData.touchPoints.this.left) {
                    this.state.movement = { up: false, down: false, left: false, right: true, falling: false};
                    this.y -= 4;
                }
            

                break;
```

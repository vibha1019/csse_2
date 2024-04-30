## <span style="font-family: Arial, sans-serif; color: #333;">FINITE STATE MACHINES</span>

# <span style="font-family: Arial, sans-serif; color: #333;">THE ISSUE</span>
<span style="font-family: Arial, sans-serif; color: #333;">During the past weeks, our group was tasked with the issues of the jump platform. The player was able to go through jump platforms, we wanted to prevent that and have the player climb up the jump platform when it touches the sides.</span>


# <span style="font-family: Arial, sans-serif; color: #333;">WHAT WE LEARNED</span>
<span style="font-family: Arial, sans-serif; color: #333;">We learned that finite state machines read what is going on in the code and react to it (if x happens, then y). For example, when we were working on the jump platform, we had to communicate in the code that if the player touches the left or right side of the platform, it could only go in certain directions and it has to climb up. The computer then reads the code, and if the requirements are met (if the player touches the left or right side), it carries out the ‘then’ functions. To carry out these functions, the computer has to recognize when the player has touched the jump platform. If it has, then the computer knows to enter the jump platform state to carry out the functions.</span>


# <span style="font-family: Arial, sans-serif; color: #333;">APPLICATION</span>
<span style="font-family: Arial, sans-serif; color: #333;">We decided to add more code in the JumpPlatform case, so there would be more clarity on what to do when the player is in a collision state and when it is accessing the jump platform.</span>

```html
<div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">

```javascript
case "jumpPlatform":
    // Player is on top of the jump platform
    if (this.collisionData.touchPoints.this.onTopofPlatform) {
        this.state.movement = { up: false, down: false, left: true, right: true, falling: false};
        this.gravityEnabled = false;
    } 
    // Player is touching the wall with right side
    else if (this.collisionData.touchPoints.this.right) {
        this.state.movement = { up: false, down: false, left: true, right: false, falling: false};
        this.y -= 4;
    } 
    // Player is touching the wall with left side
    else if (this.collisionData.touchPoints.this.left) {
        this.state.movement = { up: false, down: false, left: false, right: true, falling: false};
        this.y -= 4;
    }
    break;
</div>
```

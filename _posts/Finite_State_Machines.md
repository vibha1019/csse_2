<div style="background-color: #e6e6fa; padding: 20px; border-radius: 10px;">

<h2 style="font-family: Arial, sans-serif; color: #333; text-align: center;">Finite State Machines</h2>

<div style="background-color: #c8e6c9; padding: 15px; border-radius: 8px; margin-top: 20px;">

<h3 style="font-family: Arial, sans-serif; color: #333; margin-bottom: 10px;">The Issue</h3>

<p style="font-family: Arial, sans-serif; color: #333;">During the past weeks, our group was tasked with the issues of the jump platform. The player was able to go through jump platforms, we wanted to prevent that and have the player climb up the jump platform when it touches the sides.</p>

</div>

<div style="background-color: #c8e6c9; padding: 15px; border-radius: 8px; margin-top: 20px;">

<h3 style="font-family: Arial, sans-serif; color: #333; margin-bottom: 10px;">What We Learned</h3>

<p style="font-family: Arial, sans-serif; color: #333;">We learned that finite state machines read what is going on in the code and react to it (if x happens, then y). For example, when we were working on the jump platform, we had to communicate in the code that if the player touches the left or right side of the platform, it could only go in certain directions and it has to climb up. The computer then reads the code, and if the requirements are met (if the player touches the left or right side), it carries out the ‘then’ functions. To carry out these functions, the computer has to recognize when the player has touched the jump platform. If it has, then the computer knows to enter the jump platform state to carry out the functions.</p>

</div>

<div style="background-color: #c8e6c9; padding: 15px; border-radius: 8px; margin-top: 20px;">

<h3 style="font-family: Arial, sans-serif; color: #333; margin-bottom: 10px;">Application</h3>

<p style="font-family: Arial, sans-serif; color: #333;">We decided to add more code in the JumpPlatform case, so there would be more clarity on what to do when the player is in a collision state and when it is accessing the jump platform.</p>

<pre>
<code>
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
</code>
</pre>

</div>

</div>

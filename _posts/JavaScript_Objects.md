<div style="background-color: #e6e6fa; padding: 20px; border-radius: 10px;">

<h2 style="font-family: Arial, sans-serif; color: #333; text-align: center;">Java Script Objects</h2>

<div style="background-color: #c8e6c9; padding: 15px; border-radius: 8px; margin-top: 20px;">

<h3 style="font-family: Arial, sans-serif; color: #333; margin-bottom: 10px;">Creating a Property</h3>

<p style="font-family: Arial, sans-serif; color: #333;">We created a property called onTopofPlatform, so we could correctly assign if it can go left and right. </p>

</div>
<div style="background-color: #c8e6c9; padding: 15px; border-radius: 8px; margin-top: 20px;">
<h3 style="font-family: Arial, sans-serif; color: #333; margin-bottom: 10px;">Application</h3>


<pre>
<code>
const tolerance = 10; // Adjust as needed
// Determine if this object's bottom exactly aligns with the other object's top
const onTopofPlatform = Math.abs(thisBottom - otherRect.top) <= tolerance;
</code>
</pre>

</div>

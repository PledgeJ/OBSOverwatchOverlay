# OBS Game Overlay

## In OBS:
- Add browser source and use the url: <code>http://localhost:4589/overlay.html</code>
- Set width and height to 1920 x 1080 respectively
- Size to scene
<br>
- When opening back up OBS, start up the control panel, and then refresh the browser source

## Summary
I've recently taken part in some University Overwatch tournaments, and on occasion the games get streamed. During those streams, there is an overlay on the stream showing the score (as it is usually a bo3/5/7 depending on the round).

I thought "why not try and make this myself?", here's what I produced:
<br>
##### A list of features include:
- Changing the team names
- Adding a team picture
- Showing the score for the series
- Picking a colour for the team banner, and picking between black or white text
- Picking a hero ban for each team
- Adjusting the vertical position of the overlay on the screen
- Showing the score a team needs to reach to win
<br>
<img src="Screenshots\InGameTest.png" width="700">
A screenshot of OBS preview with the overlay showing
In this example, I used a batch file given to me by <a href="https://github.com/Madsies">Madsies</a> which lowers the in game spectator UI to allow space for the overlay
<br>
<img src="Screenshots\TeamPictureExample.png" width="700">
An example of adding team pictures to the banners (using the hero portraits as an example)
<br><br>
<img src="Screenshots\ControlPanel.png" width="700">
The control panel used to customise the overlay

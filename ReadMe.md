**Face Tracking Flappy Bird**

Joey Lukner and Sarah Conley


**Principles**

When thinking about final projects to do, were drawn to the idea of AR. Keith talked a lot in class from the beginning how there exist many AR libraries that work in sync with p5.js, the main library we used for development throughout the course. One memorable game that tragically is not available anymore is Flappy Bird, the popular mobile game of the mid-2010s. To play, the player would tap to make a bird fly through pipes of increasing difficulty to navigate. In the context of AR, we thought it would be a cool idea to implement face tracking into this game and instead of having to tap to play, allow the user to take a more active role in the game. Specifically, we wanted the bird to be controlled by having the bird follow the user's nose.

The idea of using face tracking to play a game is already a common feature of massive social media apps Snapchat and TikTok. One popular example of this is a TikTok filter that uses face tracking to navigate through a maze. We both had implemented moving sprites in our Dynamic Pictures lab from Week 0, so we knew the basic mechanics of Flappy Bird like collision detection and moving pipes would be straightforward to implement. 

**Design**

The key design elements had essentially already been done a decade ago. We wanted the same gameplay and aesthetic as the original version of Flappy Bird: The moving pipes, original bird sprite, iconic font, and appearing-all-too-often Game Over screen. The feature that would take this beyond a simple recreation of the game and make the project fit into our course material was the face tracking element in order to control the bird. Though traditionally Augmented Reality superimposes a computer-generated image into a user's view of the real world, we still consider this an AR project as the game receives constant feedback from the real world; it is simply not displayed. 

![Screenshot 2024-05-06 at 21-09-55 Sketch](https://github.swarthmore.edu/storage/user/6471/files/650d41e0-2804-4ead-bd15-6e5625aee6ca)

Figure 1: Screen during gameplay


**Implementation** 

Our development process was divided into three main sections: 

1) Loading in the background and PNGs of the pipes found online. We wanted three pipes on the screen throughout the game, so we created a 2D array where each row stored the x and y coordinates of the pipe and a randomly generated number that would determine how far down the screen the pipe would extend. We draw the pipes using these coordinates during each iteration of our draw() function in sketch.js. We moved these pipes at a constant rate and whenever the x coordinate of any given pipe hit the left edge of the screen, we redrew the pipe at the right of the screen, sending it back to the start.

2) Implementing the face tracking so the bird is placed where your nose is and it is controlled by moving your head, adding in collision detection. We thought the nose was a good midpoint of the face to use as a controller, so using the facemesh machine-learning model that allows for facial landmark detection, we isolated the key point on the tip of the nose and instead of drawing an ellipse there as the facemesh model does, we drew our Flappy Bird. We decided to only allow the user to control the y position of the bird instead of both the x and y since that most closely resembles the original gameplay. To add in collision detection, we created a separate helper function that is called during each iteration of the draw() function whenever a pipe is close to reaching the fixed x position of the bird. The helper function detects a collision whenever the bird is in the same y range as the top or bottom half of the "active" pipe. A pipe only becomes active once it is at the right edge of the bird and becomes inactive when it passes the left edge of the bird, so the y range that causes collisions is only applicable for the correct pipe. 

3) Adding in a start and Game Over screen. We added in global variables to keep track of the score of the current run and the highest score achieved. Throughout gameplay, we display the current score at the top of the screen in accordance with the original game. Whenever a collision is detected, the view is changed to a separate Game Over screen that loads in the score achieved on this run and the high score overall. To restart, the user can press the spacebar. Whenever the sketch is first launched, the user is also prompted to press space in order to start the game. We downloaded a publicly available font that recreated the style of the original game in order to display our scores and print text on the screen.

![Screenshot 2024-05-06 at 21-10-21 Sketch](https://github.swarthmore.edu/storage/user/6471/files/30a68245-b488-491a-b4a4-72643fe9d823)

Figure 2: Start screen

![Screenshot 2024-05-06 at 21-07-32 Sketch](https://github.swarthmore.edu/storage/user/6471/files/ee8d80b8-0af8-4619-a69a-cc4386f5c119)

Figure 3: Game Over screen

**Evaluation** 

We spotted two bugs when testing our final implementation:
1) In order to allow the space bar to restart the game but become inactive after it is pressed, we chose to use the ```keyPressed()``` function of p5.js and checked ```if(key == ' ')``` inside of the function. This works as intended in the start up and game over screen, but the global nature of the ```keyPressed()``` function means that the user can also restart the game any time they want during play by pressing the spacebar. 
2) The facemesh filter obviously can only detect faces that are in the webcam. Whenever the user's face leaves the webcam or the model cannot detect the face for whatever reason, the bird is not displayed and no collisions are detected so the game goes on forever and increases the score the entire time. One straightforward change we could implement would be to cause the game to automatically stop when the face leaves the screen, but we did not want to penalize the user for technological difficulties as the algorithm is somewhat computationally intensive and the  webcam can sometimes be buggy and drop face detection unexpectedly. 

During the original design and brainstorming process, there were a few ideas thrown out that we did not have time to implement, but could make for a more intricate game:
1) We load the pipe PNGs into the game and there is a slight decrease in width from the end of the pipe to the main body of the pipe. We could adjust the collision ranges so that this is take into account and the exact edge of the pipe aligns with the exact edge of the bird when we detect collisions. 
2) The speed, orientation, and margin between the top and bottom of the pipes remains constant throughout the game, keeping the game at the same difficulty at all times. Two different approaches to change difficulty would be to create statically defined levels that have similar hardcoded parameters that the user can choose to employ with an Easy, Medium, or Hard selection or to gradually change these parameters over time, increasing the speed, decreasing the margin, and adding in more complex pipe arrangements like moving pipes or angled pipes. 

Overall, we enjoyed this project and felt it was a good learning experience. We were able to capture the original essence of the game while adding in a new component that made this project uniquely situated in the course content. The game has a satisfying start to finish pipeline, remembers previous iterations of gameplay, and randomly generates situations to keep gameplay interesting. The instances when the user collides with the pipes are bug-free as far as we can tell, which makes for a fair and challenging game. 



MARS ROVER APPLICATION [SIMPLE Nodejs program]
--
Description:
-
A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the rovers 
so that their on-board cameras can get a complete view of the surrounding 
terrain to send back to Earth.
A rover's position is represented by a combination of an x and y co-ordinates 
and a letter representing one of the four cardinal compass points. 
The plateau is divided up into a grid to simplify navigation. 
An example position might be [0, 0, N], which means the rover is in 
the bottom left corner and facing North.
In order to control a rover, NASA sends a simple string of letters. 
The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover 
spin 90 degrees left or right respectively, without moving from its current spot.
'M' means move forward one grid point, and maintain the same heading.
Assume that the square directly North from (x, y) is (x, y+1), and t
hat the square directly East from (x, y) is (x+1, y).

Environment Variables:
-
ROVER_COUNT [This variable the number of mars rovers the application can handle. 
The value can only non-zero possitive integers]

Node packages and IDE:
-
* Node: [version: v12.10.0]
* Testing: [Mocha, Chai]
* dotenv [version: 10.0.0]
* Joi [version: 17.5.0]
* Visual Studio Code:[version: 1.63.2]

Notes
-
1.  If the rover instruction results in mars rover moving out of the designated plateau, 
    the application will throw an error message and displays the last known position of the rover. 
    
    * For Example: 
    
            Plateau size: 5 5
            Rover coordinates: 3 3 E
            Rover instruction: MMRMMMM
            Following result will be displayed:
            [ERROR] Instruction for rover[1] cannot be completed. Rover[1] cannot cross the plateau, last known position of rover[1]
            ROVER[1]: 5 0 S

2.  One of the edge case which is not coverd in this application is when two rovers ends in the 
    same location no error is invoked

3.  All possible commands and directions are hardcoded into application as an ENUM
    
    * Commands/Directions supported by the system: 
            
           Commands: ENUM({ M: 1, L: 2, R: 3 })
           Directions: ENUM({ N: 1, E: 2, S: 3, W: 4 })
           [Directions should be in clockwise order and numerically increasing]

4.  This application was run on a linux system (Ubuntu 20.04.3 LTS), have not 
    tested on a MAC or Windows. IDE used is visual studio workbench. 
    
    * To start the application go to the root directory of the application and proceed with the following steps
    
            a.  npm install.
            b.  To run the application [node index.js]
            c.  To run the test script [npm run test]
            d.  To exit the application [Ctrl + c]
    
****************************************************************************************************

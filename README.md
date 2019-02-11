# Connect Four

Connect Four is a world known game for people of all ages. This is my recreation of connect four as a webpage application. I've programmed this game using HTML, CSS, and predominantly Javascript. This was my first attempt at a Javascript driven project. 

## What I've learned...

1. Create elements using Javacript and implement them into the webpage.
    * The creation of the circle grid (6 x 7) was created using Javascript.
    
```javascript
for(let i = 0; i < rows; i++){
    row[i] = document.createElement("div");
    row[i].classList.add("row");
    board_div.appendChild(row[i]);
    for(let j = 0; j < columns; j++){
        circle[j] = document.createElement("div");
        circle[j].classList.add("circle");
        circle[j].setAttribute("id", "circle" + (i*columns + j));
        row[i].appendChild(circle[j]);
    }
}
```
   
2. Implement event listeners using the addEventListener() function in Javascript.
    * Events: 'click', 'mouseover', 'mouseout' were all used for the drop circles.
    * Events: 'click' was used for the restart button div
3. Learned how to create objects of a class in Javascript.
    * Each circle in the 6x7 matrix is an object of the class 'Circle'.
    
```javascript
class Circle {
    constructor(element, circleColor, circleState){
        this.elem = element;
        this.color = white;
        this.state = circleState || false;
    }
}
```
    
4. Calculating algorithms which scan the board for sets of four of the same color.
    * These algorithms are called within the checkForWin() function.
    * Individually scans the matrix for vertical, horizontal, positive diagonal, and negative diagonal sets of four.
5. Change the text of elements using the innerHTML() method.
    
## What I would change...

1. Instead of manipulating div elements, I would instead implement a canvas which the game would be situated.
2. Improve the efficiency and readbility of CSS. I'm not proficient in CSS and I often find myself searching up attributes and other techniques.
3. Improve the efficiency of my Javascript code. I'm also new to Javascript as this is my first project, so I have to learn the more advanced syntax and techniques.

### Future Projects

I plan to code fewer projects which manipulate div elements. However, I intend to program some interactive games using the Javascript canvas. I'll continue to code games which differ from eachother so that I can further imrpove my programming capabilities.

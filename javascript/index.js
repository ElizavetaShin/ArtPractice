let activeFigure = document.getElementById ("active-figure");
let cursorCircle = document.getElementById ("cursor-circle");
let activeFigureX = 0;
let activeFigureY = 0;
let cursorCircleX = 0;
let cursorCircleY = 0;
let clientX = 0;
let clientY = 0;
window.addEventListener('mousemove',(event)=>{
    clientX = event.clientX;
    clientY = event.clientY;
    
})
function updateActiveFigure (){
    activeFigureX += (clientX - activeFigureX)/30;
    activeFigureY += (clientY - activeFigureY)/30;
    activeFigure.style.transform = `translate(${Math.round(activeFigureX)}px,${Math.round(activeFigureY)}px)`;
    requestAnimationFrame (()=>{
         updateActiveFigure ()
    })
}
function updateCursorCircle (){
    cursorCircleX  += (clientX - cursorCircleX )/6;
    cursorCircleY  += (clientY - cursorCircleY)/6;
    cursorCircle.style.transform = `translate(-50%, -50%) translate(${Math.round(cursorCircleX)}px,${Math.round(cursorCircleY)}px)`;
    requestAnimationFrame (()=>{
         updateCursorCircle ()
    })
}
updateActiveFigure ();
updateCursorCircle ();







function animateSignRotating (signElement, x0, y0, r, speed, isForward){
    let prevTime = performance.now();
    signElement.style.left = x0;
    signElement.style.top = y0;


    requestAnimationFrame ((time)=>{
       let timeSincePrev = time-prevTime;
       let deg = timeSincePrev*speed*Math.PI/180;
       let xValue = +signElement.style.translate.split('px')[0].trim();
       let yValue = +signElement.style.translate.split('px')[1].trim();   
       let x = x0 + r*Math.cos(deg);
       let y = y0 + r*Math.sin(deg);
       signElement.style.translate = `${x-x0}px ${y-y0}px`
       prevTime = time;
    })
}

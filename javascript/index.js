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



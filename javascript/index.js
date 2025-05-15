let activeFigure = document.getElementById ("active-figure");
let activeFigureX = 0;
let activeFigureY = 0;
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

updateActiveFigure ();
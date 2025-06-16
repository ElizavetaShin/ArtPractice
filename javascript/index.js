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







function animateSignRotating (signElement, x0, y0, r, speed, startDeg, isForward){
    let prevTime = performance.now();
    let deg = startDeg;
    let coef = isForward ? 1 : -1;
    signElement.style.left = x0+'px';
    signElement.style.top = y0+'px';
    speed = speed/1000;

    requestAnimationFrame (function rotating(time){
        
       let timeSincePrev = time-prevTime;
       deg = (coef*timeSincePrev*speed + deg) % 360;
       let radians = deg*Math.PI/180;
       let x = x0 + r*Math.cos(radians);
       let y = y0 + r*Math.sin(radians);
       signElement.style.translate = `${x-x0}px ${y-y0}px`
       prevTime = time;
       requestAnimationFrame (rotating);
    })
}


let signsZone = document.getElementById('signs-zone');
let signsArr = [];
let reverseSignsArr = [];
let signsAmount = 17;
let reverseSignsAmount = 14;

for(let i = 0; i<signsAmount; i++){
    let sign = document.createElement('div');
    sign.classList.add('sign');
    sign.style.backgroundImage = `url('../img/sign${i+1}.png')`;
    signsArr.push(sign);
    signsZone.append(sign);
}


for(let i = 0; i<reverseSignsAmount; i++){
      let sign = document.createElement('div');
    sign.classList.add('sign');
    sign.style.backgroundImage = `url('../img/sign${reverseSignsAmount - i}.png')`;
    reverseSignsArr.push(sign);
    signsZone.append(sign);
}


signsArr.forEach((element, index)=>{
    animateSignRotating(element, window.innerWidth*1.12, window.innerWidth*0.34, window.innerWidth*0.4, 10, index*360/signsAmount, true);
})

reverseSignsArr.forEach((element, index)=>{
    animateSignRotating(element, window.innerWidth*1.12, window.innerWidth*0.34, window.innerWidth*0.32, 8, index*360/reverseSignsAmount, false);
})

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





let signsZone = document.getElementById('signs-zone');
function animateSignRotating (signElement, x0, y0, r, speed, startDeg, isForward){
    let prevTime = performance.now();
    let deg = startDeg;
    let coef = isForward ? 1 : -1;
    signElement.style.left = x0 - signElement.clientWidth/2 +'px';
    signElement.style.top = y0 - signElement.clientHeight/2 +'px';
    speed = speed/1000;

    requestAnimationFrame (function rotating(time){
        
       let timeSincePrev = time-prevTime;
       deg = (coef*timeSincePrev*speed + deg) % 360;
       let radians = deg*Math.PI/180;
       let x = r*Math.cos(radians);
       let y = r*Math.sin(radians);
       signElement.style.translate = `${x}px ${y}px`
       
       prevTime = time;
       requestAnimationFrame (rotating);
    })
}

function animateSignsCircle(x0, y0, r, speed, isForward){
    let prevTime = performance.now();
    let deg = 0;
    let coef = isForward ? 1 : -1;
    speed = speed/1000;
    let circle = document.createElement('div');
    circle.classList.add('signs-circle');
    circle.style.height = r*2 + "px";
    circle.style.width = r*2 + "px";
    circle.style.left = x0 - r + 'px';
    circle.style.top = y0 - r + 'px';
    signsZone.append(circle);
    requestAnimationFrame(function circleRotating(time){
        let timeSincePrev = time-prevTime;
        deg = (coef*timeSincePrev*speed + deg) % 360;   
        circle.style.rotate = `${deg}deg`;
        prevTime = time; 
        requestAnimationFrame(circleRotating);
    })
}
let signsArr = [];
let reverseSignsArr = [];
let signsAmount = 17;
let reverseSignsAmount = 14;
let circleCenterX = window.innerWidth*1.12;
let circleCenterY = window.innerWidth*0.34;
let bigCircleRadius = window.innerWidth*0.4;
let smallCircleRadius = window.innerWidth*0.32;
let bigCircleSpeed = 10;  //градусы в сек
let smallCircleSpeed = 8;
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

animateSignsCircle(circleCenterX, circleCenterY, bigCircleRadius, bigCircleSpeed, true);
signsArr.forEach((element, index)=>{
    animateSignRotating(element, circleCenterX, circleCenterY, bigCircleRadius, bigCircleSpeed, index*360/signsAmount, true);
})


animateSignsCircle(circleCenterX, circleCenterY, smallCircleRadius, smallCircleSpeed, false);
reverseSignsArr.forEach((element, index)=>{
    animateSignRotating(element, circleCenterX, circleCenterY, smallCircleRadius, smallCircleSpeed, index*360/reverseSignsAmount, false);
})




let researchCardsContainer = document.getElementById('research-cards-container');
let researchCardsArr = researchCardsContainer.querySelectorAll('.research-card');

window.addEventListener('scroll', (event)=>{
    let element = researchCardsArr[0];
    let elementRect = researchCardsArr[0].getBoundingClientRect()
console.log (elementRect.top + elementRect.height/2, window.innerHeight);
if(elementRect.top + elementRect.height/2 <= window.innerHeight){
    element.style.scale = 0.5;
}
})
let initialScaleAdd = 0.8;
researchCardsArr.forEach((element)=>{
 let elementRect = element.getBoundingClientRect()
 element.style.scale = 1 + initialScaleAdd;
 window.addEventListener('scroll', ()=>{
    let currentCenter = elementRect.top + elementRect.height/2;
    if (currentCenter<=window.innerHeight && currentCenter >= window.innerHeight/2){
        element.style.scale = 1 + (currentCenter - window.innerHeight/2)/window.innerHeight/2*initialScaleAdd
    }
 })
})
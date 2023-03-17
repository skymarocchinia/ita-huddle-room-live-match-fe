import anime from "animejs";
import {convertAnimationInTrailNumber, generateUniqueId, getRealCoordinates} from "../utils";
import {field_height, field_width} from "../../../config/config";



function fadeOutTrailCircle(trailCircle) {
    const svg = document.getElementById('soccer-svg');
    anime({
        targets: trailCircle,
        easing: 'linear',
        duration: 900,
        opacity: 0,
        complete: function(anim) {
            svg.removeChild(trailCircle);
        }
    });
}

function fadeOutTrailPoint(trailPoint) {
    const svg = document.getElementById('soccer-svg');
    anime({
        targets: trailPoint,
        duration: 900,
        easing: 'linear',
        opacity: 0,
        complete: function(anim) {
            svg.removeChild(trailPoint);
        }
    });
}


function createTrailCircle(uniqueId, anim) {
    const svg = document.getElementById('soccer-svg');
    let trailCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    trailCircle.setAttribute('id', uniqueId);
    //console.log("anim.animations[0].currentValue) :: ", anim.animations[0].currentValue);
    trailCircle.setAttribute('cx', convertAnimationInTrailNumber(anim.animations[0].currentValue, -1));
    //console.log("anim.animations[1].currentValue) :: ", anim.animations[1].currentValue);
    trailCircle.setAttribute('cy', convertAnimationInTrailNumber(anim.animations[1].currentValue, -5));
    trailCircle.setAttribute('r', '2');
    trailCircle.setAttribute('fill', '#afc52a');
    trailCircle.setAttribute('fill-opacity', '0.5');
    svg.appendChild(trailCircle);

    return trailCircle;
}

function createTrailLine(uniqueId, newCoord, anim) {
    const trailLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    trailLine.setAttribute('id', uniqueId);
    trailLine.setAttribute('x2', newCoord.x);
    trailLine.setAttribute('y2', newCoord.y);
    trailLine.setAttribute('x1', anim.animations[0].currentValue);
    trailLine.setAttribute('y1', anim.animations[1].currentValue);
    trailLine.setAttribute('stroke', '#afc52a');
    trailLine.setAttribute('stroke-width', '2');
    // imposta l'attributo "stroke-dasharray" iniziale per nascondere la linea all'inizio
    const lunghezzaLinea = Math.sqrt(Math.pow(trailLine.getAttribute('x2') - trailLine.getAttribute('x1'), 2) + Math.pow(trailLine.getAttribute('y2') - trailLine.getAttribute('y1'), 2));
    trailLine.setAttribute('stroke-dasharray', `${lunghezzaLinea} ${lunghezzaLinea + 10}`);
    const svg = document.getElementById('soccer-svg');
    svg.appendChild(trailLine);
    // anima la lunghezza della linea per farla apparire progressivamente
    anime({
        targets: trailLine,
        easing: 'linear',
        opacity: 0,
        complete: () => {
            svg.removeChild(trailLine);
        }
    });
    return trailLine;
}

function createTrailPoint(anim, coord) {
    const svg = document.getElementById('soccer-svg');
    const uniqueIdPoint = generateUniqueId();
    // Create a new circle to represent the start of the trail
    const pointCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pointCircle.setAttribute('id', uniqueIdPoint);
    pointCircle.setAttribute('cx', coord.x);
    pointCircle.setAttribute('cy', coord.y);
    pointCircle.setAttribute('r', '4');
    pointCircle.setAttribute('fill', 'red');
    pointCircle.setAttribute('stroke', 'white');
    pointCircle.setAttribute('stroke-width', '2');
    pointCircle.setAttribute('class', 'trailpoint');
    pointCircle.setAttribute('style', 'z-index: 9999; position: absolute;');
    svg.appendChild(pointCircle);

    return pointCircle;

    // Animate the start circle's opacity to fade out
    /*anime({
        targets: pointCircle,
        opacity: 0,
        duration: 1000,
        delay: 1000,
        easing: 'linear'
    });*/
}


function createAndDrawAndAnimationBall(prevCoord, newCoord, duration = 1000 ) {

    const realPrevCoordinates = getRealCoordinates(field_width, field_height, newCoord.x, newCoord.y);
    console.log("realPrevCoordinates :: ",realPrevCoordinates); // { x: 50, y: 12.5 }
    const realNewCoordinates = getRealCoordinates(field_width, field_height, prevCoord.x, prevCoord.y);
    console.log("realNewCoordinates :: ",realNewCoordinates); // { x: 50, y: 12.5 }

    let trail;
    return{
        targets: '.ballref',
        easing: 'linear',
        translateX: realNewCoordinates.x,
        translateY: realNewCoordinates.y,
        duration: duration,
        begin: (anim) => {
            const pointStart = createTrailPoint(anim, realPrevCoordinates);
            fadeOutTrailPoint(pointStart);
        },
        update: (anim) => {
            const svg = document.getElementById('soccer-svg');
            const uniqueId = generateUniqueId();
            // Create a new circle to represent the trail
            trail = createTrailCircle(uniqueId, anim);
            fadeOutTrailCircle(trail);
            //trail = createTrailLine(uniqueId, newCoord, anim);
        },
        complete: (anim) => {
            const pointEnd = createTrailPoint(anim, newCoord);
            fadeOutTrailPoint(pointEnd);
        }
    };
}


export { createAndDrawAndAnimationBall, createTrailCircle };
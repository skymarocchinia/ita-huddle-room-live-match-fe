import anime from "animejs";
import {convertAnimationInTrailNumber, generateUniqueId, getRealCoordinates, timeline} from "../utils";
import {field_height, field_width} from "../../../config/config";
import ReactDOM from "react-dom";
import React from "react";


function pulseElement(element) {
    anime({
        targets: element,
        scale: [1, 1.2],
        duration: 1000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
    });
}

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

function fadeOutPlayer(player) {
    const svg = document.getElementById('soccer-svg');
    anime({
        targets: player,
        duration: 1000,
        delay: 2000,
        easing: 'linear',
        opacity: 0,
        complete: function(anim) {
            svg.removeChild(player);
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

function createPlayer(anim, event, coord) {
    const svgParent = document.getElementById('soccer-svg');

    const colorJersey = event?.color ?? '#' + Math.floor(Math.random() * 16777215).toString(16);
    const numberJersey = event?.jerseyNum ?? '10';
    const nameJersey = event?.playerName ?? 'CALHANOGLU';
    const svgDimensionJersey = '25';

    const svgDimensions = svgDimensionJersey;
    const svgDimensionsY = (parseInt(svgDimensions) + 10).toString();;
    const circleDimensions = (parseInt(svgDimensions)/2).toString();
    const circleRadius = (parseInt(circleDimensions) - 2).toString();
    const textY = (parseInt(circleDimensions) + 4).toString();
    const textNameY = (parseInt(circleDimensions) + 14).toString();

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', svgDimensions);
    svg.setAttribute('height', svgDimensionsY);
    svg.setAttribute('x', coord.x);
    svg.setAttribute('y', coord.y);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', circleDimensions);
    circle.setAttribute('cy', circleDimensions);
    circle.setAttribute('r', circleRadius);
    circle.setAttribute('fill', colorJersey);

    const textNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textNumber.setAttribute('x', circleDimensions);
    textNumber.setAttribute('y', textY);
    textNumber.setAttribute('text-anchor', 'middle');
    textNumber.setAttribute('font-size', '10');
    textNumber.setAttribute('font-weight', 'bold');
    textNumber.setAttribute('fill', 'white');
    textNumber.textContent = numberJersey;

    const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textName.setAttribute('x', circleDimensions);
    textName.setAttribute('y', textNameY);
    textName.setAttribute('text-anchor', 'middle');
    textName.setAttribute('font-size', '8');
    textName.setAttribute('font-weight', 'bold');
    textName.setAttribute('fill', 'white');
    textName.textContent = nameJersey;

    svg.appendChild(circle);
    svg.appendChild(textNumber);
    svg.appendChild(textName);

    svgParent.appendChild(svg);

    return svg;
}


function createAndDrawAndAnimationPassage(prevCoord, newCoord, event, duration = 1000 ) {
    let trail;
    return{
        targets: '.ballref',
        easing: 'linear',
        translateX: newCoord.x,
        translateY: newCoord.y,
        duration: duration,
        begin: (anim) => {
            const pointStart = createTrailPoint(anim, prevCoord);
            fadeOutTrailPoint(pointStart);
            //const player = createPlayer(anim, event, prevCoord);
            //fadeOutPlayer(player)
        },
        update: (anim) => {
            const svg = document.getElementById('soccer-svg');
            const uniqueId = generateUniqueId();
            // Create a new circle to represent the trail
            trail = createTrailCircle(uniqueId, anim);
            fadeOutTrailCircle(trail);
            //trail = createTrailLine(uniqueId, newCoord, anim);
            //createAndDrawAndAnimationPlayer(anim.animations[0].currentValue, anim.animations[1].currentValue, event?.playerName);
        },
        complete: (anim) => {
            const pointEnd = createTrailPoint(anim, newCoord);
            fadeOutTrailPoint(pointEnd);
            const player = createPlayer(anim, event, newCoord);
            fadeOutPlayer(player);
        }
    };
}

function createAndDrawAndAnimationPlayer(coordx, coordy, event, duration = 1000 ) {
    const colorJersey = event?.color ?? '#' + Math.floor(Math.random() * 16777215).toString(16);
    const numberJersey = event?.jerseyNum ?? '10';
    const nameJersey = event?.playerName ?? 'CALHANOGLU';
    const svgDimensionJersey = '25';

    const svgDimensions = svgDimensionJersey;
    const svgDimensionsY = (parseInt(svgDimensions) + 10).toString();;
    const circleDimensions = (parseInt(svgDimensions)/2).toString();
    const circleRadius = (parseInt(circleDimensions) - 2).toString();
    const textY = (parseInt(circleDimensions) + 4).toString();
    const textNameY = (parseInt(circleDimensions) + 14).toString();

    // Creazione della timeline
    const timeline = anime.timeline({
        duration: 1000,
        easing: 'easeOutExpo'
    });


    // Creazione dell'elemento SVG
    const svgElement = (
        <div style={{ width: `${svgDimensions}px`, height: `${svgDimensionsY}px`, display: 'block' }} className={nameJersey}>
            <svg width={svgDimensions} height={svgDimensionsY} >
                <circle cx={circleDimensions} cy={circleDimensions} r={circleRadius} fill={colorJersey} />
                <text x={circleDimensions} y={textY} textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
                    {numberJersey}
                </text>
                <text x={circleDimensions} y={textNameY} textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">
                    {nameJersey}
                </text>
            </svg>
        </div>
    );

    // Renderizza il componente SVG in un nodo del DOM
    const svgNode = document.createElement('div');
    ReactDOM.render(svgElement, svgNode);

    // Aggiunta dell'elemento SVG al contenitore field-container
    const fieldContainer = document.querySelector('.field-container');
    fieldContainer.appendChild(svgNode.firstChild);

    // Creazione dell'animazione di fade in per l'SVG
    timeline.add({
        targets: '.' + nameJersey,
        opacity: 1,
        translateX: coordx,
        translateY: coordy
    });

    // Creazione dell'animazione di fade out per l'SVG
    timeline.add({
        targets: '.' + nameJersey,
        opacity: 1,
        delay: 2000,
        complete: () => {
            // Eliminazione dell'elemento SVG dal DOM
            //playerRef.current.remove();
            //document.querySelector("." + nameJersey).remove();
        }
    });

    timeline.play();
}

export { createAndDrawAndAnimationPassage, createTrailCircle };
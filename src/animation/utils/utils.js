import anime from "animejs";
import {createAndDrawAndAnimationBall} from "./animations/animationBall";

function randomCoordinatesMax500() {
    return {
        x: Math.floor(Math.random() * 700),
        y: Math.floor(Math.random() * 400)
    };
}

function randomCoordinatesArray() {
    const coordinates = randomCoordinatesMax500();
    return [coordinates.x, coordinates.y];
}

function delayer(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

async function createBallMovementTimeline(events) {
    const timeline = anime.timeline({
        autoplay: true, // imposto autoplay a false per eseguire manualmente la timeline
    });

    timeline
        .set('.ballref', {
            // opzioni di set() per posizione iniziale
            translateX: events[0].x,
            translateY: events[0].y,
        })

    for (const event of events) {
        const prevCoord = {x: event.x, y: event.y};
        const newCoord = {x: event.payload.pass.x, y: event.payload.pass.y};
        const animation = createAndDrawAndAnimationBall(prevCoord, newCoord);
        timeline.add(animation);
        await animation.finished;
    }

}

/*function addRandomAnimationsWithPrevCoord(ballRef, ball, prevCoord) {
    const newCoord = generateRandomCoordinates(prevCoord);
    drawAndAnimationBall(ballRef, ball, prevCoord, newCoord);
    return newCoord;
}*/

function generateRandomCoordinates(prevCoord) {
    const maxX = 400;
    const maxY = 300;

    const xRange = Math.min(maxX, prevCoord.x + 101) - Math.max(0, prevCoord.x - 100);
    const yRange = Math.min(maxY, prevCoord.y + 101) - Math.max(0, prevCoord.y - 100);

    const x = Math.floor(Math.random() * xRange) + Math.max(0, prevCoord.x - 100);
    const y = Math.floor(Math.random() * yRange) + Math.max(0, prevCoord.y - 100);

    return {
        x: x,
        y: y
    };
}

function convertAnimationInTrailNumber(animationNumber, offset) {
    const animationSPlit = animationNumber.split('px');
    const animationNumberInTrail = parseFloat(animationSPlit[0] + offset);
    //console.log("animationNumberInTrail :: ", animationNumberInTrail);
    //console.log("===========================");
    return animationNumberInTrail.toString() + "px";
}

function startMatch(ball) {
    const containerWidth = 700;
    const containerHeight = 450;
    const ballWidth = 11;
    const ballHeight = 11;

    const midFieldX = containerWidth / 2 - ballWidth / 2; // calcola la coordinata x del centro del pallone
    const midFieldY = containerHeight / 2 - ballHeight / 2; // calcola la coordinata y del centro del pallone

    let prevCoord = {
        x: midFieldX,
        y: midFieldY,
    };

    const timeline = anime.timeline({
        autoplay: true, // imposto autoplay a false per eseguire manualmente la timeline
    });

    timeline
        .set(ball, {
            opacity: 0
        })

    timeline.add({
        targets: ball,
        easing: 'linear',
        translateX: midFieldX,
        translateY: midFieldY,
        opacity: 0,
        complete: () => {
            anime({
                targets: ball,
                opacity: 1,
            })
        }
    });

    return prevCoord;
}


function generatePassEvents(numEvents) {
    const events = [];
    let x = 200;
    let y = 200;
    for (let i = 0; i < numEvents; i++) {
        const event = {
            "type": "pass",
            "timestamp_utc": new Date().toISOString(),
            "playerName": `player_${i}`,
            "jerseyNum": `${i + 1}`,
            "teamId": "123456",
            "x": `${x}`,
            "y": `${y}`,
            "outcome": Math.random() < 0.5 ? true : false,
            "payload": {
                "pass": {
                    "passType": "head",
                    "x": Math.floor(Math.random() * 650),
                    "y": Math.floor(Math.random() * 350)
                }
            }
        };
        if (Math.random() < 0.5) {
            event["payload"]["goal"] = {
                "GKX": `${Math.floor(Math.random() * 650)}`,
                "GKY": `${Math.floor(Math.random() * 350)}`,
                "ShootY": `${Math.floor(Math.random() * 101)}`,
                "ShootZ": `${Math.floor(Math.random() * 101)}`,
                "playerImage": "",
                "goalText": ""
            };
        }
        events.push(event);
        x = parseInt(event.payload.pass.x);
        y = parseInt(event.payload.pass.y);
    }
    return events;
}



export { randomCoordinatesMax500, randomCoordinatesArray, generateRandomCoordinates,
    convertAnimationInTrailNumber, delayer, generateUniqueId, createBallMovementTimeline,
    startMatch, generatePassEvents };
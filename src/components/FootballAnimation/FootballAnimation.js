import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import Field from "../Field/field";

import './FootballAnimation.css';
import {convertAnimationInTrailNumber, generateRandomCoordinates} from "../../utils/utils";

function randomAnimationsWithPrevCoord(tlPlayer, tlBall, tlPlayerCircle, player, ball, circlePlayer) {
    let prevCoord = {
        x: 50,
        y: 50,
    };

    const svg = document.getElementById('my-svg');
    const trailCircle = document.createElementNS(svg.namespaceURI, 'circle');
    trailCircle.setAttribute('fill', 'none');
    trailCircle.setAttribute('stroke', 'white');
    trailCircle.setAttribute('stroke-opacity', '0.7');
    trailCircle.setAttribute('stroke-width', '2');
    svg.appendChild(trailCircle);

    tlPlayerCircle.add({
        targets: circlePlayer,
        translateX: prevCoord.x,
        translateY: prevCoord.y
    });

    const randomAnimations = new Array(2).fill().map(() => {
        const newCoord = generateRandomCoordinates(prevCoord);
        const duration = Math.floor(Math.random() * (2001 - 500) + 500);
        tlPlayer.add({
            targets: player,
            translateX: newCoord.x,
            translateY: newCoord.y,
            duration: duration
        });
        /*
        tlPlayerCircle.add({
            targets: circlePlayer,
            translateX: newCoord.x,
            translateY: newCoord.y,
            duration: duration,
        });*/
        tlBall.add({
            targets: ball,
            translateX: newCoord.x,
            translateY: newCoord.y,
            duration: duration,
            update: (anim) => {
                // Create a new circle to represent the trail
                let trailCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                //console.log("anim.animations[0].currentValue) :: ", anim.animations[0].currentValue);
                trailCircle.setAttribute('cx', convertAnimationInTrailNumber(anim.animations[0].currentValue));
                //console.log("anim.animations[1].currentValue) :: ", anim.animations[1].currentValue);
                trailCircle.setAttribute('cy', convertAnimationInTrailNumber(anim.animations[1].currentValue));
                trailCircle.setAttribute('r', '3');
                trailCircle.setAttribute('fill', 'white');
                trailCircle.setAttribute('fill-opacity', '0.5');
                svg.appendChild(trailCircle);

                // Fade out the trail circle over 1 second
                anime({
                    targets: trailCircle,
                    duration: 1000,
                    easing: 'linear',
                    opacity: 0,
                    complete: function(anim) {
                        svg.removeChild(trailCircle);
                    }
                });
            },
        });

        const circles = svg.querySelectorAll('circle');
        circles.forEach(circle => {
            if (circle) {
                circle.remove();
            }
        });

        prevCoord = newCoord;
    });
}


function FootballAnimation() {
    const playerRef = useRef(null);
    const ballRef = useRef(null);
    const circlePlayerRef = useRef(null);

    useEffect(() => {
        const player = playerRef.current;
        const ball = ballRef.current;
        const circlePlayer = circlePlayerRef.current;


        let tlPlayer = anime.timeline({
            duration: 2000,
            easing: 'easeInOutQuad'
        });
        let tlBall = anime.timeline({
            duration: 2000,
            easing: 'easeInOutQuad'
        });
        let tlPlayerCircle = anime.timeline({
            duration: 2000,
            easing: 'easeInOutQuad'
        });

        randomAnimationsWithPrevCoord(tlPlayer, tlBall, tlPlayerCircle, player, ball, circlePlayer);


    }, []);

    return (
        <Field>
            <div
                ref={playerRef}
                className={'player'}
            />
            <div
                ref={ballRef}
                className="football-ball"
                style={{ background: `url(/soccer-ball.png) no-repeat center center / cover`, position: 'relative' }}
            />
            <div
                ref={circlePlayerRef}
                className="player-circle"
                style={{ background: `url(/player/barella-circle.png) no-repeat center center / cover`, position: 'relative' }}
            />
            <svg id="my-svg" width="700" height="450">
            </svg>

        </Field>
    );
}

export default FootballAnimation;

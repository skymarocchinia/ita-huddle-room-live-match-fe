import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import Field from "../Field/field";

import './FootballAnimation.css';
import {
    addRandomAnimationsWithPrevCoord,
    convertAnimationInTrailNumber, delayer,
    generateRandomCoordinates
} from "../../utils/utils";


function FootballAnimation() {
    const playerRef = useRef(null);
    const ballRef = useRef(null);


    useEffect( () => {
        const player = playerRef.current;
        const ball = ballRef.current;

        let prevCoord = {
            x: 250,
            y: 150,
        };

        let tlPlayer = anime.timeline({
            easing: 'easeInOutQuad'
        }).add({
            duration: 0,
            targets: player,
            translateX: prevCoord.x,
            translateY: prevCoord.y,
        });

        function makeBallMovement() {
            console.log("handleScreenClick");
            console.log("handleScreenClick prevCoord :: ",prevCoord);
            let tlBall = anime.timeline({
                duration: 0,
                easing: 'easeInOutQuad',
            });
            prevCoord = addRandomAnimationsWithPrevCoord(ballRef, tlBall, ball, prevCoord);
        }
        window.addEventListener('click', makeBallMovement);
        return () => {
            window.removeEventListener('click', makeBallMovement);
        };
    }, []);

    return (
        <Field>
            <div
                ref={ballRef}
                className="football-ball"
                style={{ background: `url(/soccer-ball.png) no-repeat center center / cover`, position: 'relative' }}
            />
            <div
                ref={playerRef}
                className="player"
                style={{ background: `url(/player/barella-circle.png) no-repeat center center / cover`, position: 'relative' }}
            />
            <svg id="my-svg" width="700" height="450">
            </svg>

        </Field>
    );
}

export default FootballAnimation;

import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import Field from "../../components/Field/field";
import ballImg from '../../assets/soccer-ball.png';
import events from '../../assets/fakeEvents.json'


import './FootballAnimation.css';
import {
    addRandomAnimationsWithPrevCoord,
    convertAnimationInTrailNumber, createBallMovementTimeline, delayer,
    generateRandomCoordinates, generateUniqueId, startMatch
} from "../../utils/utils";
import Ball from "../../components/ball/ball";


function FootballAnimation() {
    const playerRef = useRef(null);
    const ballRef = useRef(null);


    useEffect( () => {
        const player = playerRef.current;
        const ball = ballRef.current;

        let prevCoord = startMatch(ball);

        async function makeBallMovement() {
            prevCoord = await createBallMovementTimeline(events, true, ballRef, ball, prevCoord);
        }

        window.addEventListener('click', makeBallMovement);
    return () => {
        window.removeEventListener('click', makeBallMovement);
    };
}, []);

    return (
        <Field>
            <Ball ref={ballRef}></Ball>
            <svg id="soccer-svg" width="700" height="450">
            </svg>

        </Field>
    );
}

export default FootballAnimation;

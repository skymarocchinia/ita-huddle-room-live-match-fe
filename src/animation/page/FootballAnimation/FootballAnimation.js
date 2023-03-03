import React, { useRef, useEffect } from 'react';
import Field from "../../components/Field/field";
import events from '../../assets/fakeEvents.json'


import './FootballAnimation.css';
import {
    createBallMovementTimeline, generatePassEvents
} from "../../utils/utils";
import Ball from "../../components/ball/ball";


function FootballAnimation() {
    const playerRef = useRef(null);
    const ballRef = useRef(null);


    useEffect( () => {
        async function makeBallMovement() {
            let _fevents = generatePassEvents(Math.floor(Math.random() * 6) + 2);
            await createBallMovementTimeline(_fevents);
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

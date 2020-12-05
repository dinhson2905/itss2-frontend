import React from 'react';
import '../../App.css';
import {Button} from "../Button/Button";
import './HeroSection.css';
import { useHistory } from "react-router-dom";

function HeroSection() {
    const history = useHistory();

    const routeChange = () =>{
        let path = '/ice-creams';
        history.push(path);
    }
    return (
        <div className='hero-container'>
            {/*<video src='/videos/video-1.mp4' autoPlay loop muted />*/}
            <h1>ICE CREAM WITH PENCIL</h1>
            <p>What are you waiting for?</p>
            <div className='hero-btns'>
                <Button
                    className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'
                    onClick={routeChange}
                >
                    Let's get Start!
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;

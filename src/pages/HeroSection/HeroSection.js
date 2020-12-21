import React from 'react';
import '../../App.css';
import {Button} from "../Button/Button";
import './HeroSection.css';
import {useHistory} from "react-router-dom";
import {Carousel} from "antd";

function HeroSection() {
    const history = useHistory();

    const routeChange = () => {
        let path = '/ice-creams';
        history.push(path);
    }
    // const contentStyle = {
    //     height: '600px',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    // };
    return (
        // <Carousel autoplay>
        //     <div>
        //         <img style={{width: '100%',maxHeight:'640px'}}
        //              src="https://sonnd-bucket.s3.us-east-2.amazonaws.com/itss2-images/pen/background.jpg?fbclid=IwAR0Wx_el5m56QKlzP07Hh9lAiAOLiHmTiEoUfeFLlsG8NNTyWzNJ61G1kOE"
        //              alt="productImage"/>
        //     </div>
        //     <div>
        //         <img style={{width: '100%',maxHeight:'640px'}}
        //              src="https://www.marketingtochina.com/wp-content/uploads/2019/03/04-zs-ice-cream_66-ab-1280x640.jpg"
        //              alt="productImage"/>
        //     </div>
        // </Carousel>
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

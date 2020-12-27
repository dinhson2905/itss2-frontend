import React from 'react';
import '../../App.css';
import {Button} from "../Button/Button";
import {useHistory} from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import './HeroSections.scss'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from '@material-ui/core';

function HeroSection() {
    const history = useHistory();
    const routeChange = (value) => {
        history.push(value);
    }

    function Banner(props) {

        if (props.newProp) console.log(props.newProp)
        const contentPosition = props.contentPosition ? props.contentPosition : "left"
        const totalItems = props.length ? props.length : 3;
        const mediaLength = totalItems - 1;

        let items = [];
        const content = (
            <Grid item xs={12 / totalItems} key="content">
                <CardContent className="Content">
                    <Typography className="Title">
                        {props.item.Name}
                    </Typography>

                    <Typography className="Caption">
                        {props.item.Caption}
                    </Typography>
                    <Button
                        variant="outlined" className="ViewButton"
                        onClick={routeChange}
                        path={props.item.src}
                    >
                        View More
                    </Button>
                    {/*<Button variant="outlined" className="ViewButton">*/}
                    {/*    View Now*/}
                    {/*</Button>*/}
                </CardContent>
            </Grid>
        )


        for (let i = 0; i < mediaLength; i++) {
            const item = props.item.Items[i];

            const media = (
                <Grid item xs={12 / totalItems} key={item.Name}>
                    <CardMedia
                        className="Media"
                        image={item.Image}
                        title={item.Name}
                    >
                        <Typography className="MediaCaption">
                            {item.Name}
                        </Typography>
                    </CardMedia>

                </Grid>
            )

            items.push(media);
        }

        if (contentPosition === "left") {
            items.unshift(content);
        } else if (contentPosition === "right") {
            items.push(content);
        } else if (contentPosition === "middle") {
            items.splice(items.length / 2, 0, content);
        }

        return (
            <Card raised className="Banner">
                <Grid container spacing={0} className="BannerGrid">
                    {items}
                </Grid>
            </Card>
        )
    }

    const items = [
        {
            Name: "Ice Cream with Pencil",
            Caption: "Many type of Ice Cream and Pencil",
            contentPosition: "left",
            src: "/ice-creams",
            Items: [
                {
                    Name: "BLACKOUT CHOCOLATE",
                    Image: "https://sonnd-bucket.s3.us-east-2.amazonaws.com/itss2-images/icream-pen/socola%2Bpen1.jpg"
                },
                {
                    Name: "BRAMBLEBERRY CRISP",
                    Image: "https://sonnd-bucket.s3.us-east-2.amazonaws.com/itss2-images/icream-pen/butter%2Bpen.jpg"
                }
            ]
        },
        {
            Name: "Pencil",
            Caption: "Let's get your favourite Pencil",
            contentPosition: "middle",
            src: "/ice-creams",
            Items: [
                {
                    Name: "Pencil with horse",
                    Image: "https://sonnd-bucket.s3.us-east-2.amazonaws.com/itss2-images/pen/pen1.png"
                },
                {
                    Name: "Learus Vacuum Cleaner",
                    Image: "https://sonnd-bucket.s3.us-east-2.amazonaws.com/itss2-images/pen/pen4.png"
                }
            ]
        },
        {
            Name: "Shops",
            Caption: "You can buy our products everywhere",
            contentPosition: "right",
            src: "/shops",

            Items: [
                {
                    Name: "The Lawry Center",
                    Image: "https://dayphache.edu.vn/wp-content/uploads/2019/10/hinh-anh-thiet-ke-trang-tri-quan-kem-nho-doc-dao.jpg"
                },
                {
                    Name: "Mega Mall Long Bien",
                    Image: "https://sonnd-bucket.s3.us-east-2.amazonaws.com/itss2-images/iceshop/shop4.jpg"
                }
            ]
        }
    ]
    // var items = [
    //     {
    //         image: "https://sonnd-bucket.s3.us-east-2.amazonaws.com/itss2-images/pen/background.jpg?fbclid=IwAR0Wx_el5m56QKlzP07Hh9lAiAOLiHmTiEoUfeFLlsG8NNTyWzNJ61G1kOE"
    //     },
    //     {
    //         image: "https://www.marketingtochina.com/wp-content/uploads/2019/03/04-zs-ice-cream_66-ab-1280x640.jpg"
    //     }
    // ]

    return (
        <div style={{color: "#494949"}}>
            <Carousel className="Example" navButtonsAlwaysVisible>
                {
                    items.map((item, index) => {
                        return <Banner item={item} key={index} contentPosition={item.contentPosition}/>
                    })
                }
            </Carousel>
        </div>
        // <
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
        // <div className='hero-container'>
        //     {/*<video src='/videos/video-1.mp4' autoPlay loop muted />*/}
        //     <h1>ICE CREAM WITH PENCIL</h1>
        //     <p>What are you waiting for?</p>
        //     <div className='hero-btns'>
        //
        //     </div>
        // </div>
    );
}

export default HeroSection;

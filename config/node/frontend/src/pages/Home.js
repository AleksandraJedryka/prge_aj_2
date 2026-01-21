import React from 'react';
import {Typography, Button} from "@mui/material";
import {Link} from 'react-router-dom';
import polskaobrys from '../assets/polskaobrys.png';
import pinezka from '../assets/pinezka.png';
import ksiazka from '../assets/ksiazka.png';
import uczelnia from '../assets/uczelnia.png';

function Home(props) {
    return (
        <div className='home'>
            <div className='home__left'>
                <h1 className="home__title">GEO<span style={{color: '#e74c3c'}}>PORTAL</span></h1>
                <Typography className="home__subtitle" style={{  marginRight: '-24rem',fontWeight: 520, color: 'black'}}>
                    Geoportal tematyczny poświęcony uczelniom
                </Typography>
                
                <div className="home__map-container">
                    <img src={polskaobrys} alt="Mapa Polski" className="home__poland-map" />
                    <img src={uczelnia} alt="Uczelnia" className="home__university-icon" style={{top: '15%', left: '20%', width: '180px'}} />
                    <img src={uczelnia} alt="Uczelnia" className="home__university-icon" style={{top: '20%', left: '65%', width: '160px'}} />
                    <img src={uczelnia} alt="Uczelnia" className="home__university-icon" style={{top: '40%', left: '35%', width: '135px'}} />
                    <img src={uczelnia} alt="Uczelnia" className="home__university-icon" style={{top: '45%', left: '70%', width: '125px'}} />
                    <img src={uczelnia} alt="Uczelnia" className="home__university-icon" style={{top: '55%', left: '15%', width: '110px'}} />
                    <img src={uczelnia} alt="Uczelnia" className="home__university-icon" style={{top: '65%', left: '50%', width: '105px'}} />
                    <img src={uczelnia} alt="Uczelnia" className="home__university-icon" style={{top: '78%', left: '70%', width: '100px'}} />
                </div>
            </div>
            
            <div className='home__right'>
                <div className="home__pin-container">
                    <img src={pinezka} alt="Pinezka z czapką absolwenta" className="home__pin" />
                </div>
                
                <div className="home__triangle-container">
                    <Button className="home__triangle-button" variant="contained" component={Link} to={'services'}>
                        <svg className="home__triangle" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="30%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
                                    <stop offset="95%" style={{stopColor: '#474545', stopOpacity: 1}} />
                                </linearGradient>
                            </defs>
                            <polygon points="100,190 10,10 190,10" fill="url(#triangleGradient)" style={{pointerEvents: 'auto'}}/>
                        </svg>
                        <span className="home__button-text">START</span>
                    </Button>
                </div>
                
                <div className="home__book-container">
                    <img src={ksiazka} alt="Książka" className="home__book" />
                </div>
            </div>
        </div>
    );
}

export default Home;
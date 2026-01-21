import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import aulauczelnia from '../assets/aulauczelnia.jpg';
import mapa from '../assets/mapa.jpg';
import student from '../assets/student.png';
import pracownik from '../assets/pracownik.png';

function Services(props) {
    return (
        <div className='services'>
            <h1 className='services__title'>GEO<span style={{color: '#e74c3c'}}>SERVICES</span></h1>
            
            <div className='services__container'>
                <div className='services__card'>
                    <img src={aulauczelnia} alt="Aula uczelni" className='services__image' />
                    <p className='services__description'>
                        Przeglad listy studentów oraz jej pracowników
                    </p>
                    <Button
                        className='services__button'
                        variant='contained'
                        size='large'
                        component={Link}
                        to='/list'
                    >
                        PRZEJDŹ
                    </Button>
                </div>

                <div className='services__card'>
                    <img src={mapa} alt="Mapa" className='services__image' />
                    <p className='services__description'>
                        Mapa placówek uczelni jej studentów oraz pracowników
                    </p>
                    <Button
                        className='services__button'
                        variant='contained'
                        size='large'
                        component={Link}
                        to='/map'
                    >
                        PRZEJDŹ
                    </Button>
                </div>

                <div className='services__card'>
                    <div className='services__image-group'>
                        <img src={student} alt="Student" className='services__image-small' />
                        <img src={pracownik} alt="Pracownik" className='services__image-small' />
                    </div>
                    <p className='services__description'>
                        Dodawanie nowego użytkownika
                    </p>
                    <Button
                        className='services__button'
                        variant='contained'
                        size='large'
                        component={Link}
                        to='/newuser'
                    >
                        PRZEJDŹ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Services;
import React from 'react';
import {Typography,Button} from '@mui/material';
function Home(props) {
    return (
        <div className='none'>
        <h1 className="home_header">Geoportal</h1>
            <Typography className="home_subtitle">
                Geoportal tematyczny poświęcony danym przestrzennym
            </Typography>
            <Button className="home_button" variant="contained" size="large">START</Button>
    </div>
    );
}

export default Home;
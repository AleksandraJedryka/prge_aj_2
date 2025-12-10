import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

function Services(props) {
    return (<div>
            <div>Services</div>
            <Button
            className="home__button"
            variant="contained"
            size="large"
            component={Link}
            to= "/map"
            >
            Przejdz do mapy
            </Button>
            </div>
             );
    }

export default Services
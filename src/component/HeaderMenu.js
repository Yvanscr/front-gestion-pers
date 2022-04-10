import React from 'react';
import { makeStyles, Typography, Link, AppBar } from '@mui/core';
import Toolbar from '@mui/core/Toolbar';

import logo from './../logo.png';

const id = localStorage.getItem('key');

const useStyles = makeStyles((theme) => ({
  toolbar:{
    display:'flex',
    justifyContent:'space-between'
  },
  logoLg:{
    alignItems:'center',
    display:"none",
    [theme.breakpoints.up("sm")]:{
      display:"block"
    },
  },
  logoSm:{
    display:"block",
    [theme.breakpoints.up("sm")]:{
      display:"none"
    },
  },
  icon:{
    display:'flex',
    alignItems:'center',
  },
  icons:{
    marginRight: theme.spacing(2)
  }
}));

export default function HeaderMenu(props) {
    const classes = useStyles();
    const { sections } = props;

  return (
    <AppBar >
      <Toolbar className={classes.toolbar}>
        
        <img src={logo}  height="90px" width="100px" alt=""/>
        {sections.map((section) => (
            <div className={classes.icon}>
                <Link
                          color="inherit"
                          key="Profil"
                          href={section.url}
                          className={classes.icons}
                        >
                    <Typography variant="h6" className={classes.logoLg} >{section.title}</Typography>
                </Link>
            </div>  
        ))}
        
      </Toolbar>
    </AppBar>
    
  );
}


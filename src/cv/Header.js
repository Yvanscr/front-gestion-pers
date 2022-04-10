import React from 'react';
import { makeStyles, Typography, Link, AppBar,Toolbar } from '@material-ui/core';

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

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar >
      <Toolbar className={classes.toolbar}>
        
          <img src={logo}  height="90px" width="100px" alt=""/>
        
        <div className={classes.icon}>
          <Link
                    color="inherit"
                    key="Profil"
                    href={`/Acceuil/${id}`}
                    className={classes.icons}
                  >
              <Typography variant="h6" className={classes.logoLg} >Profil</Typography>
          </Link>
          <Link
                    color="inherit"
                    
                    key="Communiqué"
                    href={`/Menu/Communique/${id}`}
                    className={classes.icons}
                  >
          <Typography variant="h6" className={classes.logoLg} >Communiqué</Typography>
          </Link>
          <Link
                    color="inherit"
                    key="Tableau de bord"
                    href={`/dashboard/${id}`}
                    className={classes.icons}
                  ><Typography variant="h6" className={classes.logoLg} >Tableau de bord</Typography>
          </Link>
          <Link
                    color="inherit"
                    key="Ressource"
                    href={`/Resource/${id}`}
                    className={classes.icons}
                  >
          <Typography variant="h6" className={classes.logoLg} >Ressource</Typography>
          </Link>
          <Link
                    color="inherit"
                    key="Rapport"
                    href={`/Rapport/periodique/${id}`}
                    className={classes.icons}
                  >
          <Typography variant="h6" className={classes.logoLg} >Rapport</Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
    
  );
}


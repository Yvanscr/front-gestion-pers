import React from 'react'

import { makeStyles, Link, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    sideMenu: {
      display: 'flex',
      flexDirection: 'column',
      position:'fixed',
      paddingTop: theme.spacing(12),
      width: '250px',
      height: '100%',
      [theme.breakpoints.down("xs")]:{
        width: '50px',
      },
    },
    btnSide:{
      alignItems:'center',
      display:"none",
      [theme.breakpoints.up("sm")]:{
        display:"block"
      },
    },
    iconSide:{
      display:"block",
      [theme.breakpoints.up("sm")]:{
        display:"none"
      },
    },
    toolbarLink: {
      paddingBottom: theme.spacing(2),
    },
}));

export default function MenuProfil(props) {
  const classes = useStyles();
  const { sections } = props;

  return (
    <Box className={classes.sideMenu} bgcolor="success.main">
        {sections.map((section) => (
                <div>
                  <Link
                    color="inherit"
                    variant="h3"
                    href={section.url}
                    className={classes.toolbarLink}
                  >
                    <Button fullWidth ={classes.btnSide}>
                      {section.title}
                    </Button>
                    
                  </Link>
                  
                </div>    
        ))}
    </Box>
  );
}
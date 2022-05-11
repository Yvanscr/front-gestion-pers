import React from 'react'

import { makeStyles, Link, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  
    sideMenu: {
      display: 'flex',
      flexDirection: 'row',
      position:'relative',
      paddingTop: theme.spacing(14),
      width: '70%',
      height: '15px',
      justifyContent: 'space-around',
      alignItems:'center',
      [theme.breakpoints.down("xs")]:{
        width: '30px',
      },
      margin:'auto',
      borderRadius: 50,
    },
    btnSide:{
      alignItems:'center',
      display:"none",
      borderRadius: 50,
      // marginRight:theme.spacing(4),
      [theme.breakpoints.up("sm")]:{
        display:"block"
      },
       "&.active": {
        background:'black',
      }
    },
    iconSide:{
      display:"block",
      [theme.breakpoints.up("sm")]:{
        display:"none"
      },
    },
    toolbarLink: {
      marginRight: theme.spacing(4)
    },
}));

export default function MenuProfil(props) {
  const classes = useStyles();
  const { sections } = props;

  return (
    <Box className={classes.sideMenu} bgcolor="#E8F2EE"
    >
        {sections.map((section) => (
                <div>
                  <Link
                    color="inherit"
                    variant="h3"
                    href={section.url}
                    className={classes.toolbarLink}
                  >
                    <Button variant="outlined" size="small" className ={classes.btnSide} style={{ borderRadius: 30}} >
                      {section.title}
                    </Button>
                  </Link>
                </div>  
        ))}
    </Box>
  );
}
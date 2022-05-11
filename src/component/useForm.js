import React from "react";
import { 
  makeStyles,
  Divider,
  TextField,
  Button,
  Paper,
  Card,
  Typography,
  Snackbar,
  IconButton
 } from '@material-ui/core';

import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    
    pagheader: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },

    pagetitle:{
      paddingLeft:theme.spacing(4),
      '& .MuiTypography-subtitle2':{
        opacity:'0.6'
      }
    },

    appMain:{
      margin:'auto',
      paddingTop:theme.spacing(5),
      // paddingLeft:'250px',
      // height:'800px',
      width:'65%',
      [theme.breakpoints.down("xs")]:{
        paddingLeft: '50px',
      },
    },

    root:{
      backgroundColor:'#fdfdff'
    },

    textfield: {
        margin: theme.spacing(2),
    }, 
    
    select: {
      margin: theme.spacing(2),
      width: '150px',
    },

    divider:{
      margin: theme.spacing(2)
    },

    submit: {
      width: '150px',
      margin: theme.spacing(2),
    },
   
    snack: {
      backgroundColor: theme.palette.success.main,
    }
  }));



export function Input(props){

  const {name, label} = props;
  const classes = useStyles();

  return(
      <TextField
        variant="outlined"
        margin="dense"
        required
        label={label}
        name={name}
        className={classes.textfield}
      />
  )
}

export function BtnSubmit(props){

  const { text } = props;
  const classes = useStyles();

  return(
      <Button
          variant="outlined"
          className={classes.submit}  
          color="primary"
      >
        {text}
      </Button>
  )
}

export function PageHeader(props){

  const{titre, soustitre } = props;
  const classes = useStyles();

  return(
    <Paper elevation={0}>
      <div className={classes.pageheader}>
        <Card>

        </Card>
        <div className={classes.pagetitle}>
          <Typography
           variant="h6"
           component="div"
          >
            {titre}
          </Typography>
          <Typography
           variant="subtitle2"
           component="div"
          >
            {soustitre}
          </Typography>
        </div>
      </div>
    </Paper>
  )
}
 
export function Layout(props){

  const classes = useStyles();
  return(
    <div className={classes.appMain}>
      {props.children}
    </div>
  )
}

export function Paragraphe(props){
  const {label, valeur} = props;
  const classes= useStyles();

  return(
    <div className={classes.textfield}>
      <Typography  variant="subtitle1">
        {label}
      </Typography>

      <Typography  variant="h6">
        {valeur}
      </Typography>
    </div>
  )
}

export function Separateur(){
  const classes = useStyles();
  return(
    <Divider className={classes.divider}>

    </Divider>
  )
}

export function Notification(props){
  const classes= useStyles();
  const {notif, setNotif} = props;
  const closeNotif = (event, reason) =>{
    setNotif({
      ...notif,
      isOpen:false
    })
  }

  return(
    <Snackbar
      open={notif.isOpen}
      transition="slide"
      direction="down"
      anchorOrigin={{ vertical:'top', horizontal:'right'}}
      message={notif.msg}
      onClose={closeNotif}
      ContentProps={classes.snack}
      action={[
        <IconButton color="inherit" onClick={closeNotif}>
          <Close />
        </IconButton>
        ]}
    >
    </Snackbar>


  )
}
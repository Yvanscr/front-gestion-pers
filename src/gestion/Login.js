import React, {useState}  from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Link, CssBaseline } from '@material-ui/core';
import back from './../3049950.jpg';
import logo from './../assets/logoad12.png';
import axios from 'axios';
import { ApiUrl } from '../cv/Constante';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    
    paper: {
      marginTop: theme.spacing(10),
      display: 'flex',
      direction:'column',
      border:'0.1px solid',
      borderRadius: '10px',
      alignItems:'center',
      backgroundColor:'#fff',
      height:'400px',
      width:'500px'
      
    },
    avatar:{
      border:'0.1px solid',
      borderRadius: '10px',
      width:"30%",
      height:"30%",
      margin:theme.spacing(0,3,0)
    },
    fond:{
      backgroundImage: `url(${back})`,
      width:'100%',
      height:'100%',
      position:'absolute'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(0, 3, 3),
      borderRadius: '10px',
    },
    grid: {
        margin: theme.spacing(0,3,1),
    },
    text:{
      margin: theme.spacing(0, 2, 3)
    }
  }));

export default function Connect() {
  
  const classes = useStyles();
  const history = useHistory();
  
  const [log, setData] = useState([]);
  
  const handleChange = e => {

    const {name, value} = e.target
    setData(
      {
        ...log,
        [name] : value
      }
    )
  }

  const loginProfil = async (e) => {
    
    e.preventDefault();
  
    await axios.post(ApiUrl+'login',log).then(res => {
      localStorage.setItem("key",res.data.id);
      sessionStorage.setItem("key",res.data.id)
      history.push(`/Acceuil/admin/${res.data.id}`)
    }).catch(err => console.log(err));

  };

    
    return (
      <div className={classes.fond}>
            <Container maxWidth="sm">
              <CssBaseline/>
              <div className={classes.paper} >

                      <img src={logo}  alt="" className={classes.avatar}/> 

                    <form className={classes.form} noValidate onSubmit={loginProfil}>
                    <TextField className={classes.text}
                      variant="outlined"
                      required
                      margin="dense"
                      label="Nom d'utilisateur"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={handleChange}
                      
                    />
                    <TextField className={classes.text}
                      variant="outlined"
                      required
                      margin="dense"
                      name="mdp"
                      label="Mot de passe"
                      type="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                    />
                    <Grid container>
                      <Link  variant="body2">
                          <Button
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          type="submit"
                          fullWidth
                          >
                          Se connecter
                          </Button>
                          </Link>
                      <Grid item xs={12} className={classes.grid}>
                        <Link href="#" variant="body2">
                          Mot de passe oublié?
                        </Link>
                      </Grid>
                                
                        
                    </Grid>
                  </form>
                
                </div>
            </Container>
          
      </div>     
      
    );
  }


import React, {useState} from 'react';

import {  
  makeStyles,
  Container,
  Link,
  CssBaseline,
  TextField,
  Button,
  Box,Stepper,Step,StepContent,
  StepLabel,
 } from '@material-ui/core';

import back from './../3049950.jpg';
import logo from './../assets/logoad8.png';

import axios from 'axios';
import { ApiUrl } from './Constante';
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
      height:'100%',
      width:'100%'
      
    },
    avatar:{
      width:"30%",
      height:"30%",
      border:'0.1px solid',
      borderRadius: '10px',
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
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5)

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

  const steps = [
    {
      label: "Vérification d'informations",
    },
    {
      label: 'Création du compte',
    },
  ];

export default function Registre() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  
  const handleChange = e => {

    const {name, value} = e.target
    setData(
      {
        ...data,
        [name] : value
      }
    )
  }

  const handleSubmit = e => {
    
    e.preventDefault();

    axios.post(ApiUrl+'profil/register',data)
      .then(response => {
          window.alert("Enregistrement du profil éfféctue");
          history.push('/Login')
      })
      .catch(err => console.log(err));

  }
  
    return (
      <div className={classes.fond}>
            <Container maxWidth="sm">
              <CssBaseline/>
              <div className={classes.paper} >

                  <img src={logo}  alt="" className={classes.avatar}/> 
                  
                <form className={classes.form} noValidate  onSubmit={handleSubmit}>
                  <Box >
                    <h1>Création de compte</h1>
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={step.label}>
                          <StepLabel>
                            {step.label}
                          </StepLabel>
                          <StepContent>
                            {index === steps.length - 2 ? (
                                <div>
                                  <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="num_matricule"
                                    label="Numéro matricule"
                                    type="text"
                                    autoFocus
                                    className={classes.text}
                                    onChange={handleChange}
                                  />
                                  <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="nom"
                                    label="Nom de famille"
                                    type="text"
                                    autoFocus
                                    className={classes.text}
                                    onChange={handleChange}
                                  />
                                  <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="prenom"
                                    label="Prénom"
                                    type="text"
                                    className={classes.text}
                                    onChange={handleChange}
                                  />
                                  <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="cin"
                                    label="CIN"
                                    type="text"
                                    className={classes.text}
                                    onChange={handleChange}
                                  />
                                </div>
                              ) : 
                              (
                                <div>
                                  <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="email"
                                    label="Adresse éléctronique"
                                    type="text"
                                    className={classes.text}
                                    onChange={handleChange}
                                  />
                                  <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="mdp"
                                    label="Mot de passe"
                                    type='password'
                                    className={classes.text}
                                    onChange={handleChange}
                                  />
                                  <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="cmdp"
                                    label="Confirmer mot de passe"
                                    type="password"
                                    className={classes.text}
                                  />
                                
                                </div>
                              )

                              }
                            
                            <Box sx={{ mb: 2 }}>
                              <div>
                                {index === steps.length - 1 ? (
                                  <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Enregistrer
                                  </Button>
                                  )
                                  :
                                  (
                                    <Button
                                      variant="contained"
                                      onClick={handleNext}
                                      sx={{ mt: 1, mr: 1 }}
                                    >
                                      Continuer
                                    </Button>
                                    )
                                }
                                {index === 0 ? (
                                  <Link href="/">
                                    <Button
                                      sx={{ mt: 1, mr: 1 }}
                                    >
                                      Retour
                                    </Button>
                                  </Link>
                                  )
                                  :
                                  (
                                    <Button
                                      onClick={handleBack}
                                      sx={{ mt: 1, mr: 1 }}
                                    >
                                      Retour
                                    </Button>
                                    )
                                }
                                
                              </div>
                            </Box>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
            
                </form>
  
                
                </div>
            </Container>
          
      </div>     
      
    );
  }

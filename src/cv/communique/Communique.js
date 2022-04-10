import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Button,
  Fab
} from '@material-ui/core';

import { 
  Add
} from '@material-ui/icons';

import axios from 'axios';
import MenuCommunique from './MenuCommunique';
import { ApiUrl } from '../Constante';

const useStyles = makeStyles((theme) => ({
    
  card: {
    margin: theme.spacing(2)
  },
  select: {
    margin: theme.spacing(2),
    width: '150px',
  },
  fab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 40,
    right: 20,
    position: 'fixed'
  }
}));

export default function ReunionBriefing() {

  const classes = useStyles();

  const handleSubmit = () =>{
    window.alert("hitany")
  }

  const [values, setValues] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(ApiUrl+`communique/${id}`).then(res => {
      console.log(res.data);
  });
  });

  const handleChange = e => {

    const {name, value} = e.target
    setValues(
      {
        ...values,
        [name] : value
      }
    )
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  const onDialogOpen = () => {
  setDialogOpen(true);
  };

  const onDialogClose = () => {
  setDialogOpen(false);
  };

  return (
    <MenuCommunique>
      <div  >
        <Grid container>
          <Grid item xs={5} >
            <Card className={classes.card}>
              <CardHeader title="Réunion">

              </CardHeader>
              <CardContent>
                  <Typography variant="caption">08:30, 15 Septembre 2021</Typography>
                  <Typography>A la salle de réunion de l'INSTAT</Typography>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={5}>

            <Card className={classes.card}>
              <CardHeader title="Communiqué">

              </CardHeader>
              <CardContent>
                  <Typography variant="caption">Voici les nouvelles instructtions</Typography>
                  <Typography>On prend la taille de ménage inférieur à 5</Typography>
              </CardContent>
            </Card>
          </Grid> 
        </Grid>
        <div  >
        <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Nouveau </DialogTitle>
        <DialogContent>
        <form >
          <Grid container>
            <Grid xs={6}>
              <FormControl variant="outlined" className={classes.select} >
                <InputLabel>Types</InputLabel>
                <MuiSelect
                    label="Types"
                    name="type"
                    onChange={handleChange}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem key='1' value='1'>Réunion</MenuItem>
                    <MenuItem key='2' value='2'>Communiqué</MenuItem>
                    <MenuItem key='3' value='3'>Réclamation</MenuItem>
                    <MenuItem key='4' value='4'>Congé</MenuItem>
                </MuiSelect>
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <TextField
                name="Nouveau"
                label="Nouveau"
                visible={false}
                onChange={handleChange} 
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                name="date"
                label="Date"
                type="date"
                onChange={handleChange} 
                InputLabelProps={{
                  shrink: true
                  }}
              />
              </Grid>
              <Grid xs={6}>
              <TextField
                name="heure"
                label="Heure"
                type="time"
                onChange={handleChange} 
                InputLabelProps={{
                  shrink: true
                  }}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                name="destinataire"
                label="Destinataire"
                onChange={handleChange} 
              />
            </Grid>
          </Grid>
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            Annuler
          </Button>
          <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>         
      <Fab
       className={classes.fab}
       color="primary"
       onClick={onDialogOpen}
       size="large"
      >
        <Add />
      </Fab>
        </div>
      </div>

    </MenuCommunique>
      
    );
  }

 
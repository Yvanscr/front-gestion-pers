import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Fab
} from '@material-ui/core';

import Menu from'./Menu';

import { 
  Add,
  SaveAltTwoTone,
  CancelPresentationTwoTone
} from '@material-ui/icons';
import axios from 'axios';
import { ApiUrl } from '../Constante';



const useStyles = makeStyles((theme) => ({
  tbl: {
    margin: theme.spacing(2)
  },
  crd:{
    maxWidth: '90%',
    margin: theme.spacing(4)
  },
  textfield: {
    margin: theme.spacing(2),
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


export default function Periodique() {
  
  const classes = useStyles();
  const { id } = useParams();
  const data = new FormData();

  const onUpload = ({ target: { files } }) => {
    data.append( 'id_pers_envoyeur_rapport', id);
    data.append('fiche_rapport',files[0]);
  }

  const handleChange = e => {

    const {name, value} = e.target;
    data.append( [name], value);
  }

  const getRapport = async() =>{
    await axios.get(ApiUrl+'rapport')
            .then(response => {
              
            }).catch(err => console.log(err));
  }

  const addRapport = () => {
    axios.post(ApiUrl+'rapport/create',data)
    .then(response => {
      onDialogClose();
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getRapport();
  },[]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  return (
      <Menu>
        <Grid container>
          <Grid item xs={8} >
            <Card className={classes.card}>
              <CardHeader title="> Rapport">

              </CardHeader>
              <CardActions>
              </CardActions>
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
        <div  >
        <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle> Rédaction de rapport</DialogTitle>
        <DialogContent>
        <form>
          <Grid container>
            
            <Grid item xs={6}>
              <TextField
                name="contenu_rapport"
                label="Contenu"
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                className={classes.textfield}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="date_rapport"
                label="Date"
                type="date"
                variant="outlined"
                margin="dense"
                onChange={handleChange} 
                InputLabelProps={{
                  shrink: true
                  }}
                className={classes.textfield}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="id_tache_rapport"
                label="Numéro de tache"
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                className={classes.textfield}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="id_pers_destinataire_rapport"
                label="Destinataire"
                variant="outlined"
                margin="dense"
                className={classes.textfield}
                onChange={handleChange} 
              />
            </Grid>
            <Grid >
              <TextField 
                label="Fiche de rapport"
                type="file"
                InputLabelProps={{shrink: true}}
                variant="outlined"
                margin="dense"
                name='fiche_rapport'
                className={classes.textfield}
                onChange={onUpload}
              />
            </Grid>
          </Grid>
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button
           onClick={onDialogClose}
           color="secondary"
          >
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
            variant="contained"
            onClick={addRapport}
            color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>

        <div  >
          <Fab
            className={classes.fab}
            color="primary"
            size="large"
            onClick={onDialogOpen}
          >
            <Add />
          </Fab>
          
        </div>
          
        </div>

      </Menu>
    );
  }

 
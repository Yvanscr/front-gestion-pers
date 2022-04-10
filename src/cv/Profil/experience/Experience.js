import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles,Card,CardContent, CardHeader, Dialog, DialogContent, DialogActions, DialogTitle, Button} from '@material-ui/core';
import { Paragraphe } from '../../../component/useForm';

import { 
  AddCircle,
  EditTwoTone,
  DeleteOutlineTwoTone,
  SaveAltTwoTone,
  CancelPresentationTwoTone
} from '@material-ui/icons';

import MenuProfil from './../MenuProfil';
import axios from 'axios';
import { ApiUrl } from '../../Constante';

const useStyles = makeStyles((theme) => ({
    
    textfield: {
        margin: theme.spacing(2),
    },    
    submit: {
      margin: theme.spacing(2, 0, 2),
    },
    add: {
      margin: theme.spacing(1, 4, 0)
    },
    btn:{
      margin:theme.spacing(3, 0.5, 0)
    },
   
  }));

export default function Experiance() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState({id_pers_experience : id});
  const [dataUp, setDataUp] = useState([]);
  
  const getExperience = () =>{
    axios.get(ApiUrl+`experience/${id}`).then(res => {
      console.log(res.data);
      setItems(res.data);
      
    });
  }

  const handleChange = e => {

    const {name, value} = e.target
    setData(
      {
        ...data,
        [name] : value
      }
    )
  }

  const addExperience = e => {
    axios.post(ApiUrl+'experience/create',data)
    .then(response => {
      console.log(response)
      getExperience();
    }).catch(err => console.log(err));
  }

  const changeUp = e => {

    const {name, value} = e.target
    setDataUp(
      {
        ...dataUp,
        [name] : value
      }
    )
  }

  const [itemUps, setItemUp] = useState([]);
  const onDialogOpen = (item) => {
    setItemUp(item)
    setDialogOpen(true); 
  };

  const updateExperience = async(id_experience) => {
    await axios.post(ApiUrl+`experience/update/${id_experience}`,dataUp)
    .then(response => {
      getExperience();
    }).catch(err => console.log(err));
  }

  const deleteExperience = async(id_experience) => {
    await axios.post(ApiUrl+`experience/delete/${id_experience}`)
    .then(response => {
      getExperience();
    }).catch(err => console.log(err));

  }
    
  useEffect(() => {
    getExperience();    
  });
  
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const onDialogClose = () => {
    setDialogOpen(false);
    };
  
    const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
  
    const onDialogOpenAdd = () => {
    setDialogOpenAdd(true);
    };
  
    const onDialogCloseAdd = () => {
    setDialogOpenAdd(false);
    };
  
    return (
      <MenuProfil>
         <Card>
        <CardHeader title="> Expérience professionnels">

        </CardHeader>
        <Button 
          color="primary" 
          onClick={onDialogOpenAdd}
          variant="outlined"
          className={classes.add}
          startIcon={<AddCircle/>}
        >
          Nouveau
        </Button>
        <CardContent disableActionSpacing>
          {items.map(item => {
            return(
              <Grid container>
                <Grid item xs={4}>
                  <Paragraphe
                  label="Poste"
                  valeur={item.poste_experience}
                  />
                  <Grid container>
                    <Grid item xs={6}>
                      <Paragraphe
                      label="Date de début"
                      valeur={item.debut_experience}
                      />
                      <Paragraphe
                      label="Date de fin"
                      valeur={item.fin_experience}
                      />
                    </Grid>
                  </Grid>
                  
                  
                </Grid>
                <Grid item xs={4}>
                  <Paragraphe
                    label="structure"
                    valeur={item.structure_experience}
                    />
                    <Grid container>
                      <Grid item xs={6}>
                        <Paragraphe
                        label="Porte"
                        valeur={item.porte_experience}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Paragraphe
                        label="Immeuble"
                        valeur={item.immeuble_experience}
                        />
                      </Grid>
                      <Paragraphe
                        label="Région"
                        valeur={item.region_experience}
                        />
                  </Grid>
                    
                  </Grid>
                <Grid item xs={4}>
                  <Button 
                    color="primary"
                    onClick={() => {onDialogOpen(item)}}
                    className={classes.btn}
                    variant="outlined">
                    <EditTwoTone/>
                  </Button> 
                  <Button 
                    color="secondary"
                    variant="outlined"
                    className={classes.btn}
                    onClick={() => {deleteExperience(item.id_experience)}}>
                    <DeleteOutlineTwoTone/>
                  </Button>
                </Grid>
            </Grid>
            )
          })}
          
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Modification d'expérience</DialogTitle>
        <DialogContent>
        <div className={classes.paper} >
          
          <form  noValidate xs>
            <Grid xs={10}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                id="posteexp"
                label="Poste"
                name="poste_experience"
                autoFocus
                className={classes.textfield}
                defaultValue={itemUps.poste_experience}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="debut_experience"
                label="Date de début"
                type="text"
                className={classes.textfield}
                defaultValue={itemUps.debut_experience}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="fin_experience"
                label="Date de fin"
                type="text"
                className={classes.textfield}
                defaultValue={itemUps.fin_experience}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="structure_experience"
                label="Structure"
                type="text"
                id="struct"
                className={classes.textfield}
                defaultValue={itemUps.structure_experience}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="porte_experience"
                label="Porte"
                type="text"
                id="porte"
                className={classes.textfield}
                defaultValue={itemUps.porte_experience}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="immeuble_experience"
                label="Immeuble"
                type="text"
                id="immeuble"
                className={classes.textfield}
                defaultValue={itemUps.immeuble_experience}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="region_experience"
                label="Région"
                type="text"
                className={classes.textfield}
                defaultValue={itemUps.region_experience}
                onChange={changeUp}
              />
            </Grid>
            
          </form>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
          variant="contained"
          onClick={() => {updateExperience(itemUps.id_experience)}}
          color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpenAdd} onClose={onDialogCloseAdd}>
        <DialogTitle>Ajout d'éxpérience</DialogTitle>
        <DialogContent>
        <div className={classes.paper} >
          
          <form  noValidate xs>
            <Grid xs={10}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                id="posteexp"
                label="Poste"
                name="poste_experience"
                autoFocus
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="debut_experience"
                label="Date début"
                type="month"
                id="moisdebut"
                className={classes.textfield}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="fin_experience"
                label="Fin experience"
                type="month"
                InputLabelProps={{
                  shrink: true
                  }}
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="structure_experience"
                label="Structure"
                type="text"
                id="struct"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="porte_experience"
                label="Porte"
                type="text"
                id="porte"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="immeuble_experience"
                label="Immeuble"
                type="text"
                id="immeuble"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="region_experience"
                label="Région"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
            </Grid>
          </form>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogCloseAdd} color="primary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
            variant="contained"
            onClick={addExperience}
            color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>

      

      </MenuProfil>
      
    );
  }


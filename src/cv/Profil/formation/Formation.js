import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button} from '@material-ui/core';
import { Paragraphe, Notification } from '../../../component/useForm';
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

export default function Profil() {
  
    const classes = useStyles();
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [data, setData] = useState({id_pers_formation : id});
    const [dataUp, setDataUp] = useState([]);
    const [notif, setNotif] = useState({isOpen:false, msg:'', isClose:true});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [itemUps, setItemUp] = useState([]);
    

    const getFormation = () =>{
      axios.get(ApiUrl+`formation/${id}`).then(res => {
        console.log(res.data);
        setItems(res.data);
        
      });
    }

    useEffect(() => {
      getFormation();
    });

  const onDialogOpen = (item) => {
    setItemUp(item)
    setDialogOpen(true); 
  };
  
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
  
  const handleChange = e => {
    const {name, value} = e.target
    setData(
      {
        ...data,
        [name] : value
      }
    )
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

  const addFormation = e => {
    axios.post(ApiUrl+'formation/create',data)
    .then(response => {
      setNotif({
        isOpen: true,
        msg: 'Enregistrement réussi'
      })
      getFormation();
    }).catch(err => console.log(err));
  }

  const updateFormation = async(id_formation) => {
    await axios.post(ApiUrl+`formation/update/${id_formation}`,dataUp)
    .then(response => {
      setNotif({
        isOpen: true,
        msg: 'Modification réussi'
      })
      getFormation();
    }).catch(err => console.log(err));
  }

  const deleteFormation = async (id_formation) => {
    await axios.post(ApiUrl+`formation/delete/${id_formation}`)
    .then(response => {
      setNotif({
        isOpen: true,
        msg: 'Suppression réussi',
      })
      getFormation();
    }).catch(err => console.log(err));

  }
  
    return (
    <MenuProfil>
        <Card>
        <CardHeader title="> Formation">

        </CardHeader>
        <Button 
          color="primary"
          variant="outlined"
          onClick={onDialogOpenAdd}
          className={classes.add}
          startIcon={<AddCircle/>}
        >
          NOUVEAU
        </Button>
        <CardContent disableActionSpacing>
        {items.map(item => {
              return (
                <Grid container>
                  <Grid item xs={5}>
                    <Paragraphe
                    label="Titre de la formation"
                    valeur={item.titre_formation}
                    />
                    <Grid container>
                      <Grid item xs={6}>
                        <Paragraphe
                        label="début de la formation"
                        valeur={item.debut_formation}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Paragraphe
                        label="Fin de la formation"
                        valeur={item.fin_formation}
                        />
                      </Grid>
                    </Grid>
                    
                    
                  </Grid>
                  <Grid item xs={4}>
                    <Paragraphe
                      label="Etablisement"
                      valeur={item.etablissement_formation}
                      />
                      <Paragraphe
                      label="Ville"
                      valeur={item.ville_formation}
                      />
                      <Paragraphe
                      label="Description des acquis"
                      valeur={item.description_formation}
                      />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                     color="primary"
                     variant="outlined"
                     onClick={onDialogOpen}
                     className={classes.btn}
                    >
                      <EditTwoTone/>
                    </Button>
                    <Button
                     color="secondary"
                     variant="outlined"
                     className={classes.btn}
                     onClick={() => {deleteFormation(item.id_formation)}} >
                      <DeleteOutlineTwoTone/>
                    </Button>
                  </Grid>
                </Grid>
              )}
        )}
          
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Modification de la formation</DialogTitle>
        <DialogContent>
        <div className={classes.paper} >
          
          <form  noValidate xs>
            <Grid xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                id="titre"
                label="Titre de la formation"
                name="titre_formation"
                autoFocus
                onChange={changeUp}
                defaultValue={itemUps.titre_formation}
                className={classes.textfield}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                label="Début de la formation"
                type="month"
                name="debut_formation"
                className={classes.textfield}
                defaultValue={itemUps.debut_formation}
                onChange={changeUp}
              />
              
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="fin_formation"
                label="Fin de la formation"
                type="month"
                id="moisfin"
                className={classes.textfield}
                defaultValue={itemUps.fin_formation}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="etablissement_formation"
                label="Etablissement"
                type="text"
                className={classes.textfield}
                defaultValue={itemUps.etablissement_formation}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="ville_formation"
                label="Ville"
                type="text"
                className={classes.textfield}
                defaultValue={itemUps.ville_formation}
                onChange={changeUp}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="description_formation"
                label="Description des acquis"
                type="text"
                id="acquis"
                className={classes.textfield}
                defaultValue={itemUps.description_formation}
                onChange={changeUp}
              />
              
            </Grid>
            
          </form>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
            variant="contained"
            onClick={updateFormation}
            color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpenAdd} onClose={onDialogCloseAdd}>
        <DialogTitle>Ajouter une nouvelle formation</DialogTitle>
        <DialogContent>
        <div className={classes.paper} >
          
          <form  noValidate xs>
            <Grid xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                label="Titre de la formation"
                name="titre_formation"
                autoFocus
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="debut_formation"
                label="Mois de début"
                type="month"
                id="moisdebut"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="fin_formation"
                label="Mois fin"
                type="month"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="etablissement_formation"
                label="Etablissement"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="ville_formation"
                label="Ville"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="description_formation"
                label="Description des acquis"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              
            </Grid>
            
          </form>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogCloseAdd} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
          variant="contained"
          onClick={addFormation}
          color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        notif={notif}
        setNotif={setNotif}
      />
    </MenuProfil>
      
    );
  }


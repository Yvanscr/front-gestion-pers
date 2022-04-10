import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem
} from '@material-ui/core';

import { 
  AddCircle,
  EditTwoTone,
  DeleteOutlineTwoTone,
  SaveAltTwoTone,
  CancelPresentationTwoTone
} from '@material-ui/icons';

import { Paragraphe, Notification } from '../../../component/useForm';

import MenuProfil from './../MenuProfil';
import axios from 'axios';
import { ApiUrl } from '../../Constante';

const useStyles = makeStyles((theme) => ({

  add: {
    margin: theme.spacing(1, 4, 0)
  }
 
}));

export default function Langue() {
  
  const classes = useStyles();
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [data, setData] = useState({id_pers_langue : id});
  const [dataUp, setDataUp] = useState([]);
  const [notif, setNotif] = useState({isOpen:false, msg:'', isClose:true});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemUps, setItemUp] = useState([]);

  const getLangue = () =>{
    axios.get(ApiUrl+`langue/${id}`).then(res => {
      setItems(res.data);  
    });
  }

  useEffect(() => {
    getLangue();
    
  });
  
  const handleChange = e => {

    const {name, value} = e.target
    setData(
      {
        ...data,
        [name] : value
      }
    )
  }

  const addLangue = e => {
    
    axios.post(ApiUrl+'langue/create',data)
    .then(response => {
      setNotif({
        isOpen: true,
        msg: 'Enregistrement réussi'
      })
      getLangue();
    }).catch(err => console.log(err));

  }

  const updateLangue = async(id_langue) => {
    await axios.post(ApiUrl+`langue/update/${id_langue}`,dataUp)
    .then(response => {
      setNotif({
        isOpen: true,
        msg: 'Modification réussi'
      })
      getLangue();
    }).catch(err => console.log(err));
  }

  const deleteLangue = async (id_langue) => {
    await axios.post(ApiUrl+`langue/delete/${id_langue}`)
    .then(response => {
      setNotif({
        isOpen: true,
        msg: 'Suppression réussi',
      })
      getLangue();
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
  
    return (
      <MenuProfil>
        <Card>

        <CardHeader title="> Langue">

        </CardHeader>
        <Button
          color="primary"
          onClick={onDialogOpenAdd}
          variant="outlined"
          className={classes.add}
          startIcon={<AddCircle/>}
        >
          NOUVEAU
        </Button>
        <CardContent disableActionSpacing>
          {items.map(item => {
              return (
                <Grid container>
                  <Grid item xs={4}>
                    <Paragraphe
                    label="Langue"
                    valeur={item.libelle_langue}
                    />                    
                  </Grid>
                  <Grid item xs={4}>
                    <Paragraphe
                      label="Niveau"
                      valeur={item.niveau_langue}
                      />
                  </Grid>
                  <Grid item xs={4}>
                    <Button color="primary" onClick={onDialogOpen} variant="outlined">
                      <EditTwoTone/>
                    </Button>
                    <Button color="secondary" onClick={() => {deleteLangue(item.id_langue)}} variant="outlined">
                      <DeleteOutlineTwoTone/>
                    </Button>
                  </Grid>
                  
                </Grid>
              )}
        )}
          
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Modification de langue</DialogTitle>
        <DialogContent>
        <form >
          <Grid xs={10}>
            <TextField
                name="libelle_langue"
                label="langue" 
                variant="outlined"
                onChange={changeUp}
                defaultValue={itemUps.libelle_langue}
                className={classes.textfield}
              />
              <FormControl variant="outlined" className={classes.select} >
                <InputLabel>Niveau</InputLabel>
                <MuiSelect
                    label="Niveau"
                    name="niveau_langue"
                    onChange={changeUp}
                    defaultValue={itemUps.niveau_langue}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Langue materenel">Langue Maternel</MenuItem>
                    <MenuItem key='1' value='Débutant'>Débutant</MenuItem>
                    <MenuItem key='2' value='Intermédiaire'>Intermédiaire</MenuItem>
                    <MenuItem key='3' value='Niveau avancé'>Niveau avancé</MenuItem>
                    <MenuItem key='4' value='Expert'>Expert</MenuItem>
                </MuiSelect>
            </FormControl>
           </Grid>
            
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
          variant="contained"
          onClick={updateLangue}
          color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpenAdd} onClose={onDialogCloseAdd}>
        <DialogTitle>Ajout une langue</DialogTitle>
        <DialogContent>
        <form >
            <Grid xs={10}>
              <TextField
                name="libelle_langue"
                label="langue" 
                variant="outlined"
                onChange={handleChange}
                className={classes.textfield}
              />
              <FormControl variant="outlined" className={classes.select} >
                <InputLabel>Niveau</InputLabel>
                <MuiSelect
                    label="Niveau"
                    name="niveau_langue"
                    onChange={handleChange}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Langue materenel">Langue Maternel</MenuItem>
                    <MenuItem key='1' value='Débutant'>Débutant</MenuItem>
                    <MenuItem key='2' value='Intermédiaire'>Intermédiaire</MenuItem>
                    <MenuItem key='3' value='Niveau avancé'>Niveau avancé</MenuItem>
                    <MenuItem key='4' value='Expert'>Expert</MenuItem>
                </MuiSelect>
            </FormControl>
            </Grid>
            
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogCloseAdd} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
          variant="contained"
          onClick={addLangue}
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

 
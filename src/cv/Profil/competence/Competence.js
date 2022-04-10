import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
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
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem
} from '@material-ui/core';
import { Paragraphe, Notification } from '../../../component/useForm';

import MenuProfil from './../MenuProfil';

import axios from 'axios';
import { ApiUrl } from '../../Constante';
import { 
  AddCircle,
  EditTwoTone,
  DeleteOutlineTwoTone,
  SaveAltTwoTone,
  CancelPresentationTwoTone
} from '@material-ui/icons';

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
  select: {
    margin: theme.spacing(2),
    width: '150px',
  },
 
}));

export default function Competence() {

  const classes = useStyles();
  
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState({id_pers_competence : id});
  const [dataUp, setDataUp] = useState([]);
  const [notif, setNotif] = useState({isOpen:false, msg:'', isClose:true});

  const getCompetence = () => {
    axios.get(ApiUrl+`competence/${id}`).then(res => {
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

  const changeUp = e => {

    const {name, value} = e.target
    setDataUp(
      {
        ...dataUp,
        [name] : value
      }
    )
  }

  const addCompetence = () => {
    
    axios.post(ApiUrl+'competence/create',data)
    .then(response => {
      setNotif({
        isOpen: true,
        msg: 'Enregistrement réussi'
      })
      onDialogCloseAdd()
      getCompetence()
    }).catch(err => console.log(err));
  }
    
  useEffect(() => {
    getCompetence();
  });

  const updateCompetence = (id_competence) => {
    axios.post(ApiUrl+`competence/update/${id_competence}`,dataUp)
    .then(response => {
      setNotif({
        isOpen: true,
        msg: 'Modification réussi'
      })
      onDialogClose()
      getCompetence()
    }).catch(err => console.log(err));
  }

  const deleteCompetence = async(id_competence) => {
    if(window.confirm('Voulez vous vraiment supprimer?')){
      await axios.post(ApiUrl+`competence/delete/${id_competence}`)
      .then(response => {
        setNotif({
          isOpen: true,
          msg: 'Suppression réussi',
          type:'primary'
        })
        getCompetence()
      }).catch(err => console.log(err));
    }
    
  }


  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemUps, setItemUp] = useState([]);
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

        <CardHeader title="> Compétence">

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
                  label="Compétence"
                  valeur={item.compet}
                  />
                  
                  
                </Grid>
                <Grid item xs={4}>
                  <Paragraphe
                    label="Niveau"
                    valeur={item.niveau_competence}
                    />
                  
                </Grid>
                <Grid item xs={4}>
                  <Button 
                    color="primary"
                    variant="outlined"
                    className={classes.btn}
                    onClick={() => {onDialogOpen(item)}}
                  >
                    <EditTwoTone />
                  </Button>
                  <Button color="secondary" variant="outlined" onClick={() => {deleteCompetence(item.id_competence)}} className={classes.btn}>
                    <DeleteOutlineTwoTone/>
                  </Button>
                </Grid>
                
              </Grid>
            )
          })}
          
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Modification de compétence</DialogTitle>
        <DialogContent>
        <form >
            <Grid xs={10}>
            <TextField
                name="compet"
                label="Compétence" 
                margin="dense"
                variant="outlined"
                required
                className={classes.textfield}
                defaultValue={itemUps.compet}
                onChange={changeUp}
              />
              <FormControl variant="outlined" className={classes.textfield} >
                <InputLabel>Niveau</InputLabel>
                <MuiSelect
                    label="Niveau"
                    name="niveau_competence"
                    onChange={changeUp}
                    defaultValue={itemUps.niveau_competence}
                >
                    <MenuItem value="">None</MenuItem>
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
          onClick={() => {updateCompetence(itemUps.id_competence)}}
          color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpenAdd} onClose={onDialogCloseAdd}>
        <DialogTitle>Ajout de compétence</DialogTitle>
        <DialogContent>
        <form >
            <Grid xs={10}>
              <TextField 
                name="compet"
                label="Compétence" 
                variant="outlined"
                onChange={handleChange}
              />
              <FormControl variant="outlined" className={classes.select} >
                <InputLabel>Niveau</InputLabel>
                <MuiSelect
                    label="Niveau"
                    name="niveau_competence"
                    onChange={handleChange}
                >
                    <MenuItem value="">None</MenuItem>
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
          onClick={addCompetence}
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

 
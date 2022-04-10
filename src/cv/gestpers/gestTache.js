/*eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Grid,
  CardContent,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  makeStyles,
  Dialog,
  DialogContent,DialogActions, DialogTitle, Button, CardActions, TextField} from '@material-ui/core';

import MenuPers from './Menu';

import { 
  SaveAltTwoTone,
  DeleteOutlineTwoTone,
  CancelPresentationTwoTone,
  AddRounded,
  EditTwoTone
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
  btn:{
    margin:theme.spacing(0, 0.5, 0)
  },
  add:{
    justifyContent: 'flex-end',
    margin: theme.spacing(2)
  },
  textfield: {
    margin: theme.spacing(2),
  }, 
}));

export default function GestTache() {
  
  const classes = useStyles();
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [itemUps, setItemUp] = useState([]);
  const [employs, setEmploys] = useState([]);
  const [data, setData] = useState({id_pers_tache : id});
  const [dataUp, setDataUp] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenUp, setDialogOpenUp] = useState(false);
  const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
  
  const getTache = () =>{
    axios.get(ApiUrl+`taches/${id}`).then(res => {
      setItems(res.data);     
      console.log(items) 
    });
  }

  const addTache = () => {
    axios.post(ApiUrl+'taches/create',data)
    .then(response => {
      getTache();
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getTache();
  },[]);

  const updateTache = async(id_tache) => {
    await axios.post(ApiUrl+`taches/update/${id_tache}`,dataUp)
    .then(response => {
      getTache();
      onDialogCloseUp();
    }).catch(err => console.log(err));
  }

  const deleteTache = async(id_tache) => {
    await axios.post(ApiUrl+`taches/delete/${id_tache}`)
    .then(response => {
      getTache();
    }).catch(err => console.log(err));

  }

  const getEmploye = async() => {
    await axios.get(ApiUrl+`recrue/${id}`)
      .then(res => {
        console.log(res.data);
        setEmploys(res.data);
      })
      .catch(err => {
        console.log(err);
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

  const onDialogOpen = () => {
    setDialogOpen(true);
    getEmploye()
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onDialogOpenUp = (item) => {
    setItemUp(item)
    setDialogOpenUp(true);
  };

  const onDialogCloseUp = () => {
    setDialogOpenUp(false);
  };

  const onDialogOpenAdd = () => {
    setDialogOpenAdd(true);
  };
  
  const onDialogCloseAdd = () => {
    setDialogOpenAdd(false);
  };

  return (
      <MenuPers>
        <Card className={classes.crd}>
          <CardHeader title="> Liste des Taches">

          </CardHeader>
          <CardActions className={classes.add} >
          <Button variant="contained" color="primary" onClick={onDialogOpenAdd}>
            <AddRounded/>
          </Button>

          </CardActions>
          <CardContent>
              
              <Table className={classes.tbl}>
                  <TableHead bgcolor='grey'>
                      <TableRow>
                          <TableCell>Tache</TableCell>
                          <TableCell>Lieu</TableCell>
                          <TableCell>Option</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map(item => {
                    return (
                    <TableRow key={item.id_tache}>
                        <TableCell>{item.titre_tache}</TableCell>
                        <TableCell >{item.lieu_tache}</TableCell>
                        <TableCell >
                          <Button 
                            color="primary"
                            onClick={() => {onDialogOpenUp(item)}}
                            className={classes.btn}
                            variant="outlined">
                            <EditTwoTone/>
                          </Button> 
                          <Button 
                            color="secondary"
                            variant="outlined"
                            className={classes.btn}
                            onClick={() => {deleteTache(item.id_tache)}}>
                            <DeleteOutlineTwoTone/>
                          </Button>
                          <Button onClick={onDialogOpen}>

                          </Button>
                        </TableCell>
                    </TableRow>
                    );
                    })}
                  </TableBody>
              </Table>
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onClose={onDialogClose} minWidth="xs">
        <DialogTitle>Liste des employés</DialogTitle>
        <DialogContent>
        <Table className={classes.tbl}>
                  <TableHead>
                      <TableRow>
                        <TableCell>Option</TableCell>
                          <TableCell>Nom</TableCell>
                          <TableCell>Prénom</TableCell>
                          <TableCell>Fonction</TableCell>
                          <TableCell>Adresse</TableCell>
                          <TableCell>Lieu d'affectation</TableCell>
                          <TableCell>Téléphone</TableCell>
                          <TableCell>Adresse éléctronique</TableCell>
                          
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {employs.map(employ => {
                    return (
                      <TableRow key={employ.id}>
                        <TableCell>{employ.nom}</TableCell>
                        <TableCell>{employ.prenom}</TableCell>
                        <TableCell >{employ.fonction}</TableCell>
                        <TableCell >{employ.adresse}</TableCell>
                        <TableCell >{employ.lieu}</TableCell>
                        <TableCell >{employ.tel}</TableCell>
                        <TableCell >{employ.email}</TableCell>
                        
                      </TableRow>
                    );
                    })}
                  </TableBody>
              </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
            variant="contained"
            onClick={addTache}
            color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpenAdd} onClose={onDialogCloseAdd} minWidth="xs">
        <DialogTitle>Nouveau taches</DialogTitle>
        <DialogContent>
          <form >
            <Grid container>
              <Grid item xs={6}>
                <TextField 
                  name="titre_tache"
                  label="Titre de la tache" 
                  variant="outlined"
                  margin="dense"
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField 
                  name="lieu_tache"
                  label="Lieu de la tache" 
                  variant="outlined"
                  margin="dense"
                  className={classes.textfield}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogCloseAdd} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
          variant="contained"
          onClick={addTache}
          color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpenUp} onClose={onDialogCloseUp} minWidth="xs">
        <DialogTitle>Modifier taches</DialogTitle>
        <DialogContent>
          <form >
            <Grid container>
              <Grid item xs={6}>
                <TextField 
                  name="titre_tache"
                  label="Titre de la tache" 
                  variant="outlined"
                  margin="dense"
                  className={classes.textfield}
                  defaultValue={itemUps.titre_tache}
                  onChange={changeUp}
                />
                <TextField 
                  name="lieu_tache"
                  label="Lieu de la tache" 
                  variant="outlined"
                  margin="dense"
                  className={classes.textfield}
                  defaultValue={itemUps.lieu_tache}
                  onChange={changeUp}
                />
              </Grid>
            </Grid>
            
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogCloseUp} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
          variant="contained"
          onClick={updateTache}
          color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>
      

      </MenuPers>
  );
}

 
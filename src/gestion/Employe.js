/*eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  CardActions,
  CircularProgress, DialogActions,Grid, FormControl,InputLabel,MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';

import {PersonAdd, Search,EditTwoTone,DeleteOutlineTwoTone,SaveAltTwoTone,CancelPresentationTwoTone } from '@material-ui/icons'
import Menu from './Menu';

import axios from 'axios';
import { ApiUrl } from '../cv/Constante';

const useStyles = makeStyles((theme) => ({
    tbl: {
        margin: theme.spacing(2)
    },
    crd:{
        maxWidth: '90%',
        margin: theme.spacing(4)
    },
    add:{
        justifyContent: 'flex-end',
        margin: theme.spacing(2)
    },
    btn:{
        margin:theme.spacing(0, 0.5, 0)
    },
    textfield: {
        margin: theme.spacing(2),
    },
    progress: { margin: theme.spacing(2) },
    search: { marginLeft: theme.spacing(2) }

}));


function MaybeLoading({ loading }) {
  const classes = useStyles();
  return loading ? (
  <CircularProgress className={classes.progress} />
  ) : null;
}

export default function Employe() {
  
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [fcts, setFct] = useState([]);
  const [data, setData] = useState([]);
  const [search1, setSearch1] = useState('');

  const handleChange = e => {

    const {name, value} = e.target
    setData(
      {
        ...data,
        [name] : value
      }
    )
  }

  const getFonction = async () =>{
    axios.get(ApiUrl+`fonction`)
    .then(res => {
      console.log(res.data);
      setFct(res.data);
      setLoading(false)
    })
    .catch(err => {
      console.log(err);
      setLoading(false)
    });
  }

  const getEmploye = async () =>{
    await axios.get(ApiUrl+`employe`)
    .then(res => {
      console.log(res.data);
      setItems(res.data);
      setLoading(false)
    })
    .catch(err => {
      console.log(err);
      setLoading(false)
    });
  }

  const addEmploye = () =>{
    axios.post(ApiUrl+'profil/register',data)
      .then(response => {
          
      })
      .catch(err => console.log(err));
  }

  const deleteEmploye = async(idPers) => {
    await axios.post(ApiUrl+`employe/delete/${idPers}`)
    .then(response => {
        getEmploye();
    }).catch(err => console.log(err));

  }

  useEffect(() => {
    getEmploye();   
  },[]);

  const onSearchChange1 = e => {
    setSearch1(e.target.value);
  };
    

  const [dialogOpen, setDialogOpen] = useState(false);

  const onDialogOpen = () => {
    getFonction()
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  return (
      <Menu>
        <Card className={classes.crd}>
          <CardHeader title="> Liste des Employés">

          </CardHeader>
          <CardActions className={classes.add} >
          <Button variant="contained" color="primary" onClick={onDialogOpen}>
            <PersonAdd/>
          </Button>

          </CardActions>
          <CardContent>
            <TextField
              value={search1}
              label="Recherche d'employe"
              variant="outlined"
              onChange={onSearchChange1}
              className={classes.search}
              id="input-search"
              InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
              }}
            />
              <Table className={classes.tbl}>
                  <TableHead bgcolor='grey'>
                      <TableRow>
                        <TableCell>N°matricule</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Fonction</TableCell>
                        <TableCell>Option</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    <MaybeLoading loading={loading} />
                    {items
                      .filter(item => !search1 || item.nom.toLowerCase().includes(search1) || item.prenom.toLowerCase().includes(search1) || item.adresse.toLowerCase().includes(search1))
                      .map(item => {
                        return (
                          <TableRow key={item.id}>
                            <TableCell >{item.matricule}</TableCell>
                            <TableCell>{item.nom}</TableCell>
                            <TableCell>{item.prenom}</TableCell>
                            <TableCell >{item.email}</TableCell>
                            <TableCell >{item.fonction}</TableCell>
                            <TableCell >
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
                                    onClick={() => {deleteEmploye(item.id_experience)}}>
                                    <DeleteOutlineTwoTone/>
                                </Button>
                            </TableCell>
                          </TableRow>
                        );
                        })
                    }
                  </TableBody>
              </Table>
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onClose={onDialogClose} maxWidth="lg">
        <DialogTitle>Ajout d'employés</DialogTitle>
        <DialogContent>
        <form  noValidate xs>
            <Grid xs={10}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                label="N°Matricule"
                name="matricule"
                autoFocus
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="nom"
                label="Nom"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="prenom"
                label="Prenom"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="email"
                label="Adresse éléctronique"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              <FormControl variant="outlined" className={classes.select} >
                <InputLabel>Fonction</InputLabel>
                <MuiSelect
                    label="Fonction"
                    name="fonction"
                    onChange={handleChange}
                >
                    {fcts.map(fct=> {
                        return (
                            <MenuItem key={fct.id_fonction} value={fct.id_fonction}>{fct.libelle_fonction}</MenuItem>
                        );
                        })
                    }
                </MuiSelect>
              </FormControl>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
            variant="contained"
            onClick={addEmploye}
            color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>

      </Menu>
  );
}

 
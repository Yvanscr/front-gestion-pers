/*eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
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
  CircularProgress, DialogActions,Grid
} from '@material-ui/core';

import { Search,EditTwoTone,DeleteOutlineTwoTone,SaveAltTwoTone,CancelPresentationTwoTone, AddCircle } from '@material-ui/icons'
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

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
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

  const getTransactions = async () =>{
    await axios.get(ApiUrl+`transactions/maneho/${id}`)
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

  const addTransactions = () =>{
    axios.post(ApiUrl+'transactions/manampy',data)
      .then(response => {
          
      })
      .catch(err => console.log(err));
  }

  const deleteEmploye = async(idPers) => {
    await axios.post(ApiUrl+`employe/delete/${idPers}`)
    .then(response => {
      getTransactions();
    }).catch(err => console.log(err));

  }

  useEffect(() => {
    getTransactions();   
  },[]);

  const onSearchChange1 = e => {
    setSearch1(e.target.value);
  };
    

  const [dialogOpen, setDialogOpen] = useState(false);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  return (
      <Menu>
        <Card className={classes.crd}>
          <CardHeader title="> Liste des Transactions">

          </CardHeader>
          <CardActions className={classes.add} >
          <Button variant="contained" color="primary" onClick={onDialogOpen}>
            <AddCircle/>
          </Button>

          </CardActions>
          <CardContent>
            <TextField
              value={search1}
              label="Recherche"
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
                        <TableCell>Receveur</TableCell>
                        <TableCell>Tache</TableCell>
                        <TableCell>Montant versé</TableCell>
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
        <DialogTitle>Ajout de transactions</DialogTitle>
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
                name="tache"
                label="Tache"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="m_verse"
                label="Montant à verser"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
            variant="contained"
            onClick={addTransactions}
            color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>

      </Menu>
  );
}

 
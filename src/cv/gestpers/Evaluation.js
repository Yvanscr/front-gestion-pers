import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  makeStyles,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  CircularProgress
} from '@material-ui/core';
import {Search} from '@material-ui/icons'

import Menu from './Menu';

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
  add:{
    justifyContent: 'flex-end',
    margin: theme.spacing(2)
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

export default function Evaluation() {
  
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [values, setValues] = useState([]);
  const { id } = useParams();

  const handleChange = e => {

    const {name, value} = e.target
    setValues(
      {
        ...values,
        [name] : value
      }
    )
  }

  useEffect(() => {
    axios.get(ApiUrl+`employe/evaluation/${id}`).then(res => {
      console.log(res.data);
      setItems(res.data);
      setLoading(false);
  })
  .catch(err => {
    console.log(err);
    setLoading(false)
  });
  });

  const handleSubmit = e => {
    e.preventDefault();
      window.alert("Séléction réussi")
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  const onDialogOpen = () => {
  setDialogOpen(true);
  };

  const onDialogClose = () => {
  setDialogOpen(false);
  };

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  return (
      <Menu>
        <Card className={classes.crd}>
          <CardHeader title="Evaluation">

          </CardHeader>
          <CardContent>
            <TextField
              value={search}
              label="Recherche d'employe"
              variant="outlined"
              onChange={onSearchChange}
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
                  <TableHead  bgcolor='grey'>
                      <TableRow>
                          <TableCell>Civilité</TableCell>
                          <TableCell>Nom</TableCell>
                          <TableCell>Prénom</TableCell>
                          <TableCell>Fonction</TableCell>
                          <TableCell>Lieu d'affectation</TableCell>
                          <TableCell>Evaluation</TableCell>
                          <TableCell>Option</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    <MaybeLoading loading={loading} />
                    {items
                      .filter(item => !search || item.nom.toLowerCase().includes(search) || item.prenom.toLowerCase().includes(search) || item.adresse.toLowerCase().includes(search))
                      .map(item => {
                        return (
                          <TableRow key={item.id} bgcolor={item.color}>
                              <TableCell component="th" scope="row">
                              {item.civilite}
                              </TableCell>
                              <TableCell>{item.nom}</TableCell>
                              <TableCell>{item.prenom}</TableCell>
                              <TableCell >{item.fonction}</TableCell>
                              <TableCell >{item.lieu_affectation}</TableCell>
                              <TableCell >{item.evaluation}</TableCell>
                              <TableCell>
                                <Button variant="inherit" onClick={onDialogOpen}>
                                Modifier
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

        <Dialog open={dialogOpen} onClose={onDialogClose} minWidth="xs">
        <DialogTitle>Modification d'évaluation</DialogTitle>
        <DialogContent>
          <TextField 
            label="Observation"
            name="observation"
            onChange={handleChange}
          />
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
      </Menu>
    );
  }

 
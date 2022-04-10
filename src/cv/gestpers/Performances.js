import React, { useState, useEffect, useRef } from 'react';

import {Card, CardHeader, CardContent,TextField, InputAdornment, Table, TableCell, TableHead, TableBody, TableRow, makeStyles, Dialog, DialogContent, DialogTitle, Button, CircularProgress} from '@material-ui/core';
import {Search} from '@material-ui/icons'

import Menu from './Menu';
import { Bar } from 'react-chartjs-2';

import axios from 'axios';
import { ApiUrl } from './../Constante';


const data = {
  labels: ['1ere tache', '2eme tache', '3eme tache', '4eme tache'],
  datasets: [
    {
      label: 'Taches',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [100, 100, 100, 50]
    }
  ]
};


const useStyles = makeStyles((theme) => ({
  crd:{
    maxWidth: '100%',
    margin: theme.spacing(4)
  },
  tbl: {
    margin: theme.spacing(2)
  },
  add:{
    justifyContent: 'flex-end',
    margin: theme.spacing(2)
  },
  search: { marginLeft: theme.spacing(2) }
}));

function MaybeLoading({ loading }) {
  const classes = useStyles();
  return loading ? (
  <CircularProgress className={classes.progress} />
  ) : null;
}

export default function Dashboard() {
  
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(ApiUrl+'employe',{
      headers:{
        'Content-Type':'application/json',
      }
    })
    .then(res => {
      console.log(res.data);
      setItems(res.data);
      setLoading(false)
    })
    .catch(err => {
      console.log(err);
      setLoading(false)
    });
  }, []);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const ref = useRef();

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
          <CardHeader title="Tableau de bord des Employe">

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
                  <TableHead bgcolor='grey'>
                      <TableRow>
                          <TableCell>Nom</TableCell>
                          <TableCell>Prénom</TableCell>
                          <TableCell>Fonction</TableCell>
                          <TableCell>Lieu d'affectation</TableCell>
                          <TableCell>Nombre de tâches affecté</TableCell>
                          <TableCell>Nombre de tâches restante</TableCell>
                          <TableCell>Progression</TableCell>
                          <TableCell>Date de fin prevue</TableCell>
                          <TableCell>Observation</TableCell>
                          <TableCell>Option</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    <MaybeLoading loading={loading} />
                    {items
                      .filter(item => !search || item.nom.toLowerCase().includes(search) || item.prenom.toLowerCase().includes(search) || item.fonction.toLowerCase().includes(search))
                      .map(item => {
                        return (
                          <TableRow key={item.id}>
                              <TableCell>{item.nom}</TableCell>
                              <TableCell>{item.prenom}</TableCell>
                              <TableCell >{item.fonction}</TableCell>
                              <TableCell >{item.lieu}</TableCell>                     
                              <TableCell >{item.nbtache}</TableCell>                        
                              <TableCell >{item.nbrestante}</TableCell>                        
                              <TableCell >{item.progresion}</TableCell>                        
                              <TableCell >{item.datefin}</TableCell>                        
                              <TableCell bgcolor={item.color}>{item.observation}</TableCell>
                              <TableCell >
                                <Button color="primary" variant="inherit" onClick={onDialogOpen}>
                                Voir performance
                                </Button>
                              </TableCell>
                          </TableRow>
                        );
                    })}
                  </TableBody>
              </Table>
          </CardContent>
        </Card>
        <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Affichage des graphes de performance</DialogTitle>
        <DialogContent>
        <Bar
          ref={ref}
          data={data}
          width='500px'
          height='500px'
          options={{ maintainAspectRatio: false }}
        />
          
        </DialogContent>
      </Dialog>
      </Menu>
    );
  }

 
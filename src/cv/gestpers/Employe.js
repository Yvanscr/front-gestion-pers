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
  CircularProgress
} from '@material-ui/core';

import {PersonAdd, PersonAddDisabled, Search, PermDataSettingOutlined} from '@material-ui/icons'
import MenuPers from './Menu';

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
  btn:{
    margin:theme.spacing(0, 0.5, 0)
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
  const [addRecrue, setAddRecrue] = useState({id_pers_recruteur:id});
  const [recrues, setRecrues] = useState([]);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');

  const getEmployeRecruter = async () =>{
    axios.get(ApiUrl+`recrue/${id}`)
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

  const getEmploye = async () =>{
    await axios.get(ApiUrl+`employe/${id}`)
    .then(res => {
      console.log(res.data);
      setRecrues(res.data);
      setLoading(false)
    })
    .catch(err => {
      console.log(err);
      setLoading(false)
    });
  }

  const addEmployeRecrue = (id_recrue) =>{
    setAddRecrue(
      {
        ...addRecrue,
        id_pers_recruter : id_recrue
      }
    );
    axios.post(ApiUrl+`recrute`,addRecrue)
      .then(res => {
        onDialogClose();
        getEmployeRecruter();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const removeEmployeRecrue = (id) =>{
    axios.post(ApiUrl+`recrue/delete/${id}`)
    .then(response => {
      getEmployeRecruter();
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getEmployeRecruter();   
  },[]);

  const onSearchChange1 = e => {
    setSearch1(e.target.value);
  };

  const onSearchChange2 = e => {
    setSearch2(e.target.value);
  };
    

  const [dialogOpen, setDialogOpen] = useState(false);

  const onDialogOpen = () => {
    setDialogOpen(true);
    getEmploye()
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  return (
      <MenuPers>
        <Card className={classes.crd}>
          <CardHeader title="> Liste de vos Employés">

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
                          <TableCell>Nom</TableCell>
                          <TableCell>Prénom</TableCell>
                          <TableCell>Fonction</TableCell>
                          <TableCell>Adresse</TableCell>
                          <TableCell>Lieu d'affectation</TableCell>
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
                            <TableCell>{item.nom}</TableCell>
                            <TableCell>{item.prenom}</TableCell>
                            <TableCell >{item.fonction}</TableCell>
                            <TableCell >{item.adresse}</TableCell>
                            <TableCell >{item.lieu_affectation}</TableCell>
                            <TableCell >
                              <Button color="primary" variant="outlined" onClick={() => {removeEmployeRecrue(item.idPers)}} className={classes.btn} size="small">
                                <PermDataSettingOutlined/>
                              </Button>
                              <Button color="secondary" variant="outlined" onClick={() => {removeEmployeRecrue(item.id_assign)}} className={classes.btn} size="small">
                                <PersonAddDisabled/>
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
        <DialogTitle>Liste des employés</DialogTitle>
        <DialogContent>
        <TextField
              value={search2}
              label="Recherche d'employe"
              variant="outlined"
              onChange={onSearchChange2}
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
                  <TableHead>
                      <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Fonction</TableCell>
                        <TableCell>Adresse</TableCell>
                        <TableCell>Lieu d'affectation</TableCell>
                        <TableCell >option</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {recrues.map(recrue => {
                    return (
                      <TableRow key={recrue.idPers}>
                        <TableCell>{recrue.nom}</TableCell>
                        <TableCell>{recrue.prenom}</TableCell>
                        <TableCell >{recrue.fonction}</TableCell>
                        <TableCell >{recrue.adresse}</TableCell>
                        <TableCell >{recrue.lieu_affectation}</TableCell>
                        <TableCell >
                          <Button
                            onClick={() =>{addEmployeRecrue(recrue.idPers)}}
                          >
                            <PersonAdd/>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                    })}
                  </TableBody>
              </Table>
        </DialogContent>
      </Dialog>

      </MenuPers>
  );
}

 
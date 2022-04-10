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
  CircularProgress, DialogActions,Grid
} from '@material-ui/core';

import {AddCircle, Search,EditTwoTone,DeleteOutlineTwoTone,SaveAltTwoTone,CancelPresentationTwoTone } from '@material-ui/icons'
import MenuSetting from './MenuSetting';

import axios from 'axios';
import { ApiUrl } from '../../cv/Constante';

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

export default function Setting() {
  
  const classes = useStyles();

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


  const getFonction = async () =>{
    await axios.get(ApiUrl+`fonction/maneho`)
    .then(res => {
      console.log(res.data);
      setLoading(false)
      setItems(res.data)
    })
    .catch(err => {
      console.log(err);
      setLoading(false)
    });
  }

  const addFonction = () =>{
    axios.post(ApiUrl+'fonction/manampy',data)
      .then(response => {
          onDialogClose();
      })
      .catch(err => console.log(err));
  }

  const deleteFonction = async(idPers) => {
    await axios.post(ApiUrl+`fonction/delete/${idPers}`)
    .then(response => {
        getFonction();
    }).catch(err => console.log(err));

  }

  useEffect(() => {
    getFonction();   
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
      <MenuSetting>
        <Card className={classes.crd}>
          <CardHeader title="> Liste des Fonction">

          </CardHeader>
          <CardActions className={classes.add} >
          <Button variant="contained" color="primary" onClick={onDialogOpen}>
            <AddCircle/>
          </Button>

          </CardActions>
          <CardContent>
            <TextField
              value={search1}
              label="Recherche de fonction"
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
                        <TableCell>Niveau</TableCell>
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
                            <TableCell >{item.libelle_fonction}</TableCell>
                            <TableCell >{item.niveau_fonction}</TableCell>
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
                                    onClick={() => {deleteFonction(item.id_experience)}}>
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
        <DialogTitle>Ajout de fonction</DialogTitle>
        <DialogContent>
        <form>
            <Grid xs={10}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                label="Niveau"
                name="niveau_fonction"
                autoFocus
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                name="libelle_fonction"
                label="Fonction"
                type="text"
                className={classes.textfield}
                onChange={handleChange}
              />
              
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
            onClick={addFonction}
            variant="contained"
            color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>

      </MenuSetting>
  );
}

 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  makeStyles
} from '@material-ui/core';

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
  }
}));

export default function Taches() {

    const classes = useStyles();

    const [items, setItems] = useState([]);
    const id = useParams();
    
    useEffect(() => {
      axios.get(ApiUrl+`ressource/${id}`).then(res => {
        console.log(res.data);
        setItems(res.data);
    });
    });
  
  return (
      <Menu>
        <Card className={classes.crd}>
          <CardHeader title="Ressources par taches">

          </CardHeader>
          <CardContent>
              <Table className={classes.tbl}>
                  <TableHead bgcolor='grey' >
                      <TableRow>
                          <TableCell>Numéro de tache</TableCell>
                          <TableCell>Fond</TableCell>
                          <TableCell>Dépense</TableCell>
                          <TableCell>Solde Intermédiaire</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map(item => {
                    return (
                    <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                    {item.tache}
                    </TableCell>
                    <TableCell>{item.fond}</TableCell>
                    <TableCell >{item.depense}</TableCell>
                    <TableCell >{item.solde}</TableCell>
                    </TableRow>
                    );
                    })}
                  </TableBody>
              </Table>
          </CardContent>
        </Card>

      </Menu>
    );
  }
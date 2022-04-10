import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  makeStyles
} from '@material-ui/core';

import Menu from'./Menu';
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


export default function Journal() {
  
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(ApiUrl+`journal/${id}`).then(res => {
      console.log(res.data);
      setItems(res.data);
  });
  });

  return (
      <Menu>
        <Card className={classes.crd}>
          <CardHeader title="Journal de caisse">

          </CardHeader>
          <CardContent>
              <Table className={classes.tbl}>
                  <TableHead bgcolor='grey'>
                      <TableRow>
                          <TableCell>Dates</TableCell>
                          <TableCell>Libellés</TableCell>
                          <TableCell>Entrées</TableCell>
                          <TableCell>Sorti</TableCell>
                          <TableCell>Solde intermédiaire</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map(item => {
                    return (
                    <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                    {item.dates}
                    </TableCell>
                    <TableCell>{item.libelles}</TableCell>
                    <TableCell>{item.entree}</TableCell>
                    <TableCell >{item.sorti}</TableCell>
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

 
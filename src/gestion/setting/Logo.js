/*eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  CardActions, DialogActions
} from '@material-ui/core';

import {EditTwoTone,SaveAltTwoTone,CancelPresentationTwoTone } from '@material-ui/icons'
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

export default function Setting() {
  
  const classes = useStyles();
  const [items, setItems] = useState([]);

  const photo = new FormData();

  const onUpload = ({ target: { files } }) => {
    photo.append('photo',files[0])
    
  }

  const uploadLogo = () => {
    console.log(photo)
    axios.post(ApiUrl+`logo`,photo).then(response => {
      onDialogClose()
    }).catch(err => console.log(err));
  }

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
          <CardHeader title="> Logo">

          </CardHeader>
          <CardActions className={classes.add} >
          <Button variant="contained" color="primary" onClick={onDialogOpen}>
            <EditTwoTone/>
          </Button>

          </CardActions>
          <CardContent>
            <img src={ApiUrl+'assets/logo/'+items.logo} className={classes.image} alt="" />
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Modification de logo</DialogTitle>
            <DialogContent>
            <TextField 
                label="Logo du projet"
                type="file"
                InputLabelProps={{shrink: true}}
                variant="outlined"
                margin="dense"
                name='photo'
                required
                className={classes.textfield}
                onChange={onUpload}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={onDialogClose} color="secondary">
                <CancelPresentationTwoTone fontSize="large"/>
            </Button>
            <Button
            variant="contained"
            onClick={uploadLogo}
            color="primary"
            >
                <SaveAltTwoTone/>
            </Button>
            </DialogActions>
        </Dialog>
      </MenuSetting>
  );
}

 
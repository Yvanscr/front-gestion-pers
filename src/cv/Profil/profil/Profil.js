/*eslint-disable react-hooks/exhaustive-deps */
import { 
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Fab,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';

import MenuProfil from './../MenuProfil';
import axios from 'axios';
import { ApiUrl } from '../../Constante';

import { Paragraphe } from '../../../component/useForm'
import { 
  CameraEnhance,
  CancelPresentationTwoTone,
  SaveAltTwoTone
} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({

  textfield: {
      margin: theme.spacing(2),
  }, 
  image: {
    height: '200px',
    width: '200px',
    borderRadius:'30px',
  },
  fab: {
    top: 'auto',
    left: 'auto',
    bottom: 56,
    right: '20',
  }
 
}));


export default function Profil(){
  
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const history = useHistory();
  const photo = new FormData();
  const { id } = useParams();

  const getProfil = async () => {
    await axios.get(ApiUrl+`profil/${id}`)
    .then(res => {
      setItems(res.data);
    });
  }
  
  useEffect(() => {
    getProfil();
  }, []);

  const [data, setData] = useState([]);
  const handleChange = e => {

    const {name, value} = e.target
    setData(
      {
        ...data,
        [name] : value
      }
    )
  }

  const updateProfil = async (e) => {  
    e.preventDefault();
    await axios.patch(ApiUrl+`profil/update/${id}`,data).then(response => {
          window.alert("Profil modifié avec succés");
          history.push(`/Acceuil/${id}`)
        }).catch(err => console.log(err));

  }

  const onUpload = ({ target: { files } }) => {
    photo.append('photo',files[0])
    
  }

  const uploadPdp = () => {
    console.log(photo)
    axios.post(ApiUrl+`profil/pdp/${id}`,photo).then(response => {
      history.push(`/Acceuil/${id}`)
      onCamClose()
    }).catch(err => console.log(err));
  }
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [camOpen, setCamOpen] = useState(false);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onCamOpen = () => {
    setCamOpen(true);
  };

  const onCamClose = () => {
    setCamOpen(false);
  };

  return(
    <MenuProfil>
      <Card>
        <CardHeader title="> Profil"></CardHeader>
        <CardContent>
          <div>
            <Grid container>
                        <Grid item xs={6} sm={3} md={2}>
                          <img src={ApiUrl+'assets/uploads/'+items.photo} className={classes.image} alt="" />
                          <Fab className={classes.fab} onClick={onCamOpen}>
                            <CameraEnhance />
                          </Fab>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
                          <Paragraphe
                            label="Nom"
                            valeur={items.nom}
                          />
                          <Paragraphe
                            label="Prénom"
                            valeur={items.prenom}
                          />
                          <Paragraphe
                            label="Date de naissance"
                            valeur={items.datenaiss}
                          />
                          <Paragraphe
                            label="Statut martial"
                            valeur={items.statm}
                          />
                      </Grid>
                      <Grid item xs={6} sm={2} md={2}>
                        <Paragraphe
                          label="Nombre d'enfant"
                          valeur={items.nbrenfants}
                        />
                        <Paragraphe
                          label="Adresse"
                          valeur={items.adresse}
                        />
                        <Paragraphe
                          label="Code postale"
                          valeur={items.codep}
                        />
                        <Paragraphe
                          label="Nationnalité"
                          valeur={items.nation}
                        />              
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <Paragraphe
                          label="Permis de conduire"
                          valeur={items.pconduit}
                        />
                        <Paragraphe
                          label="Téléphone"
                          valeur={items.tel}
                        />
                        <Paragraphe
                          label="Adresse éléctronique"
                          valeur={items.email}
                        />
                        <Paragraphe
                          label="Statut"
                          valeur={items.etat}
                        />
                      </Grid>
                      <Grid item xs={6} sm={2} md={3}>
                        <Paragraphe
                          label="Catégorie"
                          valeur={items.categ}
                        />
                        <Paragraphe
                          label="Corps"
                          valeur={items.corps}
                        />
                        <Paragraphe
                          label="Grade"
                          valeur={items.grade}
                        /> 
                        <Paragraphe
                          label="Indice"
                          valeur={items.indice}
                        />                       
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={2} >
                        
                      </Grid>  
                      <Grid item xs={10}>  
                        <Paragraphe
                          label="Description"
                          valeur={items.description}
                        />
                      </Grid>
                    </Grid>
              </div>
            
            <Button color="primary" variant="contained" onClick={onDialogOpen}>
                          Modifier
                        </Button>
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Modification du profil</DialogTitle>
        <DialogContent>
        <form >
              <Grid item xs={12}>
                
                <TextField
                  label="Nom"
                  name="nom"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  label="Prénom"
                  name="prenom"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  label="Date de naissance"
                  variant="outlined"
                  margin="dense"
                  name="datenaiss"
                  type="date"
                  required
                  InputLabelProps={{
                    shrink: true
                    }}
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="statm"
                  label="Statut martial"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="nbrenfant"
                  label="Nombre d'enfant"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="adresse"
                  label="Adresse"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="codep"
                  label="Code postal"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="Nation"
                  label="Nationnalité"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="pcoduit"
                  label="Permis de conduite"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="username"
                  label="Pseudo"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="tel"
                  label="Téléphone"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="email"
                  label="Adresse éléctronique"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="etat"
                  label="Etat de service"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="categ"
                  label="Catégorie"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="corps"
                  label="Corps"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="indice"
                  label="Indice"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="grade"
                  label="Grade"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />
                <TextField
                  name="dateserv"
                  label="Date de price de service"
                  variant="outlined"
                  margin="dense"
                  required
                  className={classes.textfield}
                  onChange={handleChange}
                />          
              </Grid>  
              <TextField
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  required
                  name="description"
                  label="Description"
                  className={classes.textfield}
                  onChange={handleChange}
                  />           
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
          variant="contained"
          onClick={updateProfil}
          color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={camOpen} onClose={onCamClose}>
      <DialogTitle>Modification du photo de profil</DialogTitle>
        <DialogContent>
          <TextField 
            label="Photo de profil"
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
          <Button onClick={onCamClose} color="secondary">
            <CancelPresentationTwoTone fontSize="large"/>
          </Button>
          <Button
          variant="contained"
          onClick={uploadPdp}
          color="primary"
          >
            <SaveAltTwoTone/>
          </Button>
        </DialogActions>
      </Dialog>

    </MenuProfil>
  )

}
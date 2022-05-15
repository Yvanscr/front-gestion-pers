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
  Fab,styled,Paper,Box,Avatar,Typography
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
  },
  profilLayout:{
    marginLeft: theme.spacing(10),
    justifyContent:'left',
    alignItems:'left'
  },
  bottomLayout:{
    marginTop: theme.spacing(5),
    flexDirection: 'row',
    marginBottom: theme.spacing(5)
  }
 
}));


export default function Profil(){
  
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const history = useHistory();
  const photo = new FormData();
  const { id } = useParams();

  const getProfil = async () => {
    await axios.get(ApiUrl+`profil/378064DA`)
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    borderRadius: 10
  }));

  return(
    <MenuProfil>
      <div>
          <div>
         
            <Grid container>
                        <Grid item xs={6} sm={3} md={2}>
                          <img src={ApiUrl+'assets/uploads/'+items.photo} className={classes.image} alt="" />
                          <Fab className={classes.fab} onClick={onCamOpen}>
                            <CameraEnhance />
                          </Fab>
                        </Grid>
                        <Grid item xs={4}  className={classes.profilLayout}>
                          <Item>
                           <Typography variant="h4" align= "center" gutterBottom component="div">
                              Information personnel
                            </Typography>
                            <Paragraphe variant='inherit' valeur={items.nom+' '+items.prenom} />
                            <Paragraphe variant='inherit' valeur={"Spécialité: "+items.datenaiss} />
                            <Paragraphe variant='inherit' valeur={"Date de naissance: "+items.datenaiss} />
                            <Paragraphe variant='inherit' valeur={"Situation martial: "+items.statm} />
                            <Paragraphe variant='inherit' valeur={"Nationnalité: "+items.nation} />
                          </Item>
                        </Grid>

                        <Grid item xs={4}  className={classes.profilLayout}>
                          <Item>
                            <Typography variant="h4" align= "center" gutterBottom component="div">
                              Adresse
                            </Typography>
                            <Paragraphe variant='inherit' valeur={"Adresse: "+items.adresse} />
                            <Paragraphe variant='inherit' valeur={"Code postal: "+items.code} />
                            <Paragraphe variant='inherit' valeur={"Telephone: "+items.tel} />
                            <Paragraphe variant='inherit' valeur={"Etat: "+items.etat} />
                            <Paragraphe variant='inherit' valeur={"Email: "+items.etat} />
                          </Item>
                        </Grid>
                    </Grid>
                    <Grid>
                      <Grid item xs={30}  className={classes.bottomLayout} direction = "row">
                          <Item>
                           <Typography variant="h4" align= "center" gutterBottom component="div">
                              Informations professionnels
                            </Typography>
                            <Paragraphe variant='inherit' valeur={"Corps: "+items.corps} />
                            <Paragraphe variant='inherit' valeur={"Grade: "+items.grade} />
                            <Paragraphe variant='inherit' valeur={"Categorie: "+items.categ} />
                            <Paragraphe variant='inherit' valeur={"Indice: "+items.indice} />
                          </Item>
                        </Grid>
                    </Grid>
              </div>

            <Button color="primary" variant="contained" onClick={onDialogOpen}>
                  Modifier
            </Button>
       </div>
      
      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Modification du profil</DialogTitle>
        <DialogContent>
        <form >
              <Grid item xs={30}>
                
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
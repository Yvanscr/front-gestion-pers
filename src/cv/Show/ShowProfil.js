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
    Button
  } from '@material-ui/core'
  import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  
  import MenuProfil from '../Profil/MenuProfil';
  import axios from 'axios';
  import { ApiUrl } from '../Constante';
  
  import { Paragraphe } from '../../component/useForm'
  import { 
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
    
    const [dialogOpen, setDialogOpen] = useState(false);
    
  
    const onDialogOpen = () => {
      setDialogOpen(true);
    };
  
    const onDialogClose = () => {
      setDialogOpen(false);
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
          </CardContent>
        </Card>
        <Dialog open={dialogOpen} onClose={onDialogClose}>
          <DialogTitle>Modification du profil</DialogTitle>
          <DialogContent>
          
          </DialogContent>
          <DialogActions>
            <Button onClick={onDialogClose} color="secondary">
              <CancelPresentationTwoTone fontSize="large"/>
            </Button>
            <Button
            variant="contained"
            color="primary"
            >
              <SaveAltTwoTone/>
            </Button>
          </DialogActions>
        </Dialog>
        
  
      </MenuProfil>
    )
  
  }
/*eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
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
  DialogTitle,
  Button,
  CircularProgress,
  Fab,
} from '@material-ui/core';
import { 
  Search,
  DateRange,
  NoteAdd,
  InsertChartOutlined
} from '@material-ui/icons'

import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

import MenuDash from './Menu';
import { Line } from 'react-chartjs-2';

import axios from 'axios';
import { ApiUrl } from '../Constante';

const localizer = momentLocalizer(moment);

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
  search: { marginLeft: theme.spacing(2) },
  perf1: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 70,
    right: 40,
    position: 'fixed'
  },
  perf2: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 25,
    right: 40,
    position: 'fixed'
  },
  btn:{
    margin:theme.spacing(3, 0.5, 0)
  },
}));

function MaybeLoading({ loading }) {
  const classes = useStyles();
  return loading ? (
  <CircularProgress className={classes.progress} />
  ) : null;
}

export default function Dashboard() {
  
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [statOpen, setStatOpen] = useState(false);
  const [evenement, setEvents] = useState({});
  const [dataStat, setDataStat] = useState({});

  const getStat = async () => {
    await axios.get(ApiUrl+`taches/${id}`)
            .then(res => {
              setDataStat({
                labels: [res.data.titre_tache],
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
                    data: [res.data.progression]
                  }
                ]
              });
            })
            .catch(err => {
              console.log(err)
            });
  }

  const getEventAgenda = () =>{
    axios.get(ApiUrl+`mestaches/${id}`).then(res => {
      (res.data)?
        setEvents(
          {
            title: res.data.titre_tache,
            allDay: false,
            start: new Date(res.data.date_debut),
            end: new Date(res.data.date_fin)
          }
        )
        :
        setEvents()
    });
  };

  const getTache = async () => {
    await axios.get(ApiUrl+`taches/${id}`)
            .then(res => {
              setItems(res.data);
              setLoading(false)
            })
            .catch(err => {
              setLoading(false)
            });
  }

  useEffect(() => {
    getTache();    
  }, []);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const ref = useRef();

  const onAgendaOpen = () => {
    setAgendaOpen(true);
    getEventAgenda();
  };

  const onAgendaClose = () => {
    setAgendaOpen(false);
  };

  const onStatOpen = () => {
    setStatOpen(true);
    getStat();
    };
  
  const onStatClose = () => {
    setStatOpen(false);
  };

  const onRedacOpen = () => {

  };

  return (
      <MenuDash>
        <Card className={classes.crd}>
          <CardHeader title="> Tableau de bord">

          </CardHeader>
          <CardContent>
            <TextField
              value={search}
              label="Recherche de tâche"
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
                          <TableCell>Numero</TableCell>
                          <TableCell>Tâche</TableCell>
                          <TableCell>Date de début</TableCell>
                          <TableCell>Date de fin</TableCell>
                          <TableCell>Progression</TableCell>
                          <TableCell>Options</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    <MaybeLoading loading={loading} />
                    {items
                      .filter(item => !search || item.nom.toLowerCase().includes(search))
                      .map(item => {
                        return (
                          <TableRow key={item.id}>
                              <TableCell>{item.titre_tache}</TableCell>
                              <TableCell >{item.lieu_tache}</TableCell>
                              <TableCell>{item.date_debut_tache}</TableCell>
                              <TableCell >{item.date_fin_tache}</TableCell> 
                              <TableCell >{item.achevement}</TableCell>                   
                              <TableCell >
                                <Button 
                                  color="inherit"
                                  variant="outlined"
                                  className={classes.btn}
                                  onClick={() => {onRedacOpen(item)}}
                                >
                                  <NoteAdd />
                                </Button>
                              </TableCell>
                          </TableRow>
                        );
                    })}
                  </TableBody>
              </Table>
              <Fab color="primary" onClick={onAgendaOpen} className={classes.perf1} size="large">
                <DateRange/>
              </Fab>
              <Fab color="inherit" onClick={onStatOpen} className={classes.perf2}>
                <InsertChartOutlined />
              </Fab>
              
          </CardContent>
        </Card>
        <Dialog open={statOpen} onClose={onStatClose} maxWidth="lg">
          <DialogTitle>Affichage des graphes de performance</DialogTitle>
          <DialogContent>
            <Line
              ref={ref}
              data={dataStat}
              width='500px'
              height='500px'
              options={{ maintainAspectRatio: false }}
            />
           </DialogContent>
        </Dialog>
        <Dialog open={agendaOpen} onClose={onAgendaClose} maxWidth="lg">
          <DialogTitle>Agenda</DialogTitle>
          <DialogContent>
            <Calendar localizer={localizer} events={evenement}
              startAccessor="start" endAccessor="end"
              style={{height: 400, margin: "50px"}}
            />
            
          
           </DialogContent>
        </Dialog>
      </MenuDash>
    );
  }

 
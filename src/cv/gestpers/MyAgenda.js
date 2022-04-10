/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import axios from 'axios';
import { ApiUrl } from '../Constante';

const localizer = momentLocalizer(moment);




export default function MesTaches() {
  
  const { id } = useParams();
  
  const getEventAgenda = async() =>{
    await axios.get(ApiUrl+`mestaches/${id}`).then(res => {
      console.log(res.data);
    });
  };

  const events = [
    {
      title:'tache 1',
      allDay: false,
      start: new Date(2021,9,1),
      end: new Date(2021,9,4)
    },
    {
      title:'tache 2',
      start: new Date(2021,10,3),
      end: new Date(2021,10,4)
    },
  ]

  useEffect(() => {
    getEventAgenda();
  },[]);


  return (
      <Calendar localizer={localizer} events={events}
            startAccessor="start" endAccessor="end"
            style={{height: 400, margin: "50px"}}
      />
  );
}

 
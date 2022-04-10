import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { ApiUrl } from '../Constante';
import Menu from './../Menu'
import { Layout } from '../../component/useForm';
import SideMenu from '../../component/SideMenu';

const id = localStorage.getItem('key');

const sections3 = [
  { title: 'Employe', url: `/Menu/Personnel/${id}` },
  { title: 'Gestion de tâches', url: `/gestion/tache/${id}` },
  { title: 'Tableau de bord', url: `/dashboard/${id}` },
  { title: 'Evaluation', url: `/evaluation/${id}` },
];

const sections2 = [
  { title: 'Employe', url: `/Menu/Personnel/${id}` },
  { title: 'Gestion de tâches', url: `/gestion/tache/${id}` },
  { title: 'Tableau de bord', url: `/dashboard/${id}` },
  { title: 'Evaluation', url: `/evaluation/${id}` },
];

const sections1 = [
  { title: 'Tableau de bord', url: `/dashboard/${id}` },
  { title: 'Evaluation', url: `/evaluation/${id}` },
];

export default function MenuPers(props) {
 
  const [sections, setSection] = useState([]);
  
  useEffect(() => {
    verifProfil();
  });

  const verifProfil =  () => {
    axios.get(ApiUrl+`profil/${id}`)
    .then(res => {
      switch(res.data.grade){
        case "3" : setSection(sections3);
        break
        case "2" : setSection(sections2);
        break
        case "1" : setSection(sections1);
        break
        default: setSection(sections1);
        break;
      }
    });
  }

  return (
    <div>

      <Menu/>
      <SideMenu sections={sections} />
      <Layout>
        {props.children}
      </Layout>
      

      
        
    </div>
  );
}
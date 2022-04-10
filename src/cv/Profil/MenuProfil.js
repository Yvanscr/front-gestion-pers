import React from 'react'

import Menu from './../Menu'
import { Layout } from '../../component/useForm';
import SideMenu from '../../component/SideMenu';

const id = localStorage.getItem('key');

const sections = [
  { title: 'Profil', url: `/Acceuil/${id}` },
  { title: 'Compétences', url: `/competence/${id}` },
  { title: 'Expériences', url: `/experience/${id}` },
  { title: 'Formation', url: `/formation/${id}` },
  { title: 'Langue', url: `/langue/${id}` },
];

export default function MenuProfil(props) {
 

  return (
    <div>

      <Menu/>
      <SideMenu sections={sections}/>
      <Layout>
        {props.children}
      </Layout>
      

      
        
    </div>
  );
}
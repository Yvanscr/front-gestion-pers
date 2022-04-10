import React from 'react'

import Header from './../Header'
import { Layout } from '../../component/useForm';
import SideMenu from '../../component/SideMenu';

const id = localStorage.getItem('key');

const sections = [
  { title: 'Fonctions', url: `/Fonctions/${id}` },
  { title: 'Logo', url: `/Logo` },
];

export default function MenuProfil(props) {
 

  return (
    <div>

      <Header/>
      <SideMenu sections={sections}/>
      <Layout>
        {props.children}
      </Layout>
        
    </div>
  );
}
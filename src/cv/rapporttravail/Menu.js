import React from 'react'

import Menu from '../Menu'
import { Layout} from '../../component/useForm';

import SideMenu from '../../component/SideMenu';

const id = localStorage.getItem('key');

const sections = [
  { title: 'Rapport périodique', url: `/Rapport/periodique/${id}` },
  { title: 'Rapport Journalier', url: `/Rapport/journal/${id}` },
];

export default function MenuResource(props){
    return(
        <div>
            <Menu />
            <SideMenu sections={sections}/>
            <Layout>
                {props.children}

            </Layout>


        </div>
    )
}
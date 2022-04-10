import React from 'react'

import Menu from './../Menu'
import { Layout} from '../../component/useForm';

import SideMenu from '../../component/SideMenu';

const id = localStorage.getItem('key');

const sections = [
  { title: 'Ressource par tâche', url: `/Resource/${id}` },
  { title: 'Journal de caisse', url: `/Resource/journal/${id}`},
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
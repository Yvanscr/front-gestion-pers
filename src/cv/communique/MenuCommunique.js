import React from 'react'

import Menu from './../Menu'

import { Layout } from '../../component/useForm';
import SideMenu from '../../component/SideMenu';

const id = localStorage.getItem('key');

const sections = [
    { title: 'Réunion', url: `/reunion/${id}` },
    { title: 'Communiqué', url: `/communique/${id}` },
    { title: 'Autres', url: `/autre/${id}` },
];

export default function MenuCommunique(props){
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
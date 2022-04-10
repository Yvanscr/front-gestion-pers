import React from 'react';
import { Layout } from '../component/useForm';
import Header from './Header';


export default function Menu(props){

    return (
        <div>

                <Header />
                <div style={{ background: '#bdbdbd'}}>
                
                </div>
                <Layout>
                    {props.children}
                </Layout>
        </div>
    );
}

import React from "react";
import { Route } from "react-router-dom";

import Login from './cv/Login';
import Registre from './cv/Registre';

import Connect from './gestion/Login';
import Setting from './gestion/setting/Setting';
import Logo from './gestion/setting/Logo';
import Finances from './gestion/Finances';
import EmployeAdmin from './gestion/Employe';

import Profil from './cv/Profil/profil/Profil';
import Competence from './cv/Profil/competence/Competence'
import Experience from './cv/Profil/experience/Experience'
import Formation from './cv/Profil/formation/Formation'
import Langue from './cv/Profil/langue/Langue'

import ShowProfil from './cv/Show/ShowProfil';

import Taches from './cv/gestressource/Taches';
import Journal from './cv/gestressource/Journal';

import Employe from './cv/gestpers/Employe';
import Dashboard from './cv/gestpers/Dashboard';
import Evaluation from './cv/gestpers/Evaluation';
import gestTache from './cv/gestpers/gestTache';

import Periodique from './cv/rapporttravail/Periodique';
import Journalier from './cv/rapporttravail/Journalier';

import MenuCommunique from './cv/communique/MenuCommunique';
import Communique from './cv/communique/Communique';

const BaseRouter = () => (
    <div> 

        <Route exact path='/' component={Login} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Registre' component={Registre} />

        <Route exact path='/Connect' component={Connect} />
        <Route exact path='/Acceuil/admin/:id' component={Setting} />
        <Route exact path='/Logo' component={Logo} />
        <Route exact path='/Finances/:id' component={Finances} />
        <Route exact path='/Employe/admin/:id' component={EmployeAdmin} />

        <Route exact path='/Acceuil/:id' component={Profil} />
        <Route exact path='/competence/:id' component={Competence} />
        <Route exact path='/experience/:id' component={Experience} />
        <Route exact path='/formation/:id' component={Formation} />
        <Route exact path='/langue/:id' component={Langue} />

        <Route exact path='/Profil/:id' component={ShowProfil} />

        <Route exact path='/Resource/:id' component={Taches} />
        <Route exact path='/Resource/journal/:id' component={Journal} />

        <Route exact path='/Menu/Personnel/:id' component={Employe} />
        <Route exact path='/dashboard/:id' component={Dashboard} />
        <Route exact path='/evaluation/:id' component={Evaluation} />
        <Route exact path='/gestion/tache/:id' component={gestTache} />

        <Route exact path='/Rapport/periodique/:id' component={Periodique} />
        <Route exact path='/Rapport/journal/:id' component={Journalier} />

        <Route exact path='/Menu/Communique/:id' component={MenuCommunique} />
        <Route exact path='/Communique/:id' component={Communique} />

    </div>
);

export default BaseRouter;


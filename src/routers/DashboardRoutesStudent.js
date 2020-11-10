import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
//import { JournalScreen } from '../components/journal/JournalScreen';
//import { TeacherScreen } from '../components/teacher/TeacherGroupsScreen';
import { StudentHomeScreen } from '../components/student/StudentHomeScreen';
import { StudentGroupsScreen } from '../components/student/StudentGroupsScreen';

export const DashboardRoutesStudent = () => {
    return (
        <Switch>
            <Route exact path="/student/home" component={ StudentHomeScreen } />
            <Route exact path="/student/groups" component={ StudentGroupsScreen } />

            <Redirect to="/student/home" />
        </Switch>
    );
}

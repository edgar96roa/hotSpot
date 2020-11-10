import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//import { JournalScreen } from '../components/journal/JournalScreen';
import { TeacherHomeScreen } from '../components/teacher/TeacherHomeScreen';
import { TeacherGroupsScreen } from '../components/teacher/groups/TeacherGroupsScreen';
import { TeacherQuestionsScreen } from '../components/teacher/questions/TeacherQuestionsScreen';

export const DashboardRoutesTeacher = () => {
    return (
        <Switch>
            <Route exact path="/teacher/home" component={ TeacherHomeScreen } />
            <Route exact path="/teacher/groups" component={ TeacherGroupsScreen } />
            <Route exact path="/teacher/questions" component={ TeacherQuestionsScreen } />

            <Redirect to="/teacher/home" />
        </Switch>
    );
}

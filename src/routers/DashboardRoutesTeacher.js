import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//import { JournalScreen } from '../components/journal/JournalScreen';
import { TeacherHomeScreen } from '../components/teacher/TeacherHomeScreen';
import { TeacherGroupsScreen } from '../components/teacher/groups/TeacherGroupsScreen';
import { TeacherQuestionsHotSpotScreen } from '../components/teacher/questions//hotSpot/TeacherQuestionsHotSpotScreen';
import { TeacherQuestionsHotObjectScreen } from '../components/teacher/questions//hotObject/TeacherQuestionsHotObjectScreen';

export const DashboardRoutesTeacher = () => {
    return (
        <Switch>
            <Route exact path="/teacher/home" component={ TeacherHomeScreen } />
            <Route exact path="/teacher/groups" component={ TeacherGroupsScreen } />
            <Route exact path="/teacher/questions/hotSpot" component={ TeacherQuestionsHotSpotScreen } />
            <Route exact path="/teacher/questions/hotObject" component={ TeacherQuestionsHotObjectScreen } />

            <Redirect to="/teacher/home" />
        </Switch>
    );
}

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

import MainSection from '../sections/MainSection';
import ScudSection from '../sections/ScudSection';
import CabinetSection from '../sections/CabinetSection';
import SettingsSection from '../sections/SettingsSection';
import LoginSection from '../sections/LoginSection';
import VocabularySection from '../sections/VocabularySection';

import RequireAuth from '../components/Auth/RequireAuth';
import NotFoundSection from '../sections/NotFoundSection';

export default function useRoutes() {
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<MainSection />}/>
                <Route path='login' element={<LoginSection />} />
                <Route path='scud'
                    element={<RequireAuth><ScudSection /></RequireAuth>} />
                <Route path='cabinet'
                    element={<RequireAuth><CabinetSection /></RequireAuth>} />
                <Route path='vocabulary'
                    element={<RequireAuth><VocabularySection /></RequireAuth>} />
                <Route path='settings' 
                    element={<RequireAuth><SettingsSection /></RequireAuth>} />

                <Route path='*' element={<NotFoundSection />} />
            </Route>
        </Routes>
    )   
}
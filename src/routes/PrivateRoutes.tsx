import { Routes, Route, Navigate } from 'react-router-dom';
import {ProtectdRoutes} from './ProtectdRoutes'

import { Dasboard } from "../pages/dashboad/Dasboard";
import { Categories } from "..pages/categories/Categories";
import { Files } from "../pages/files.Files";
export function  Private(){
    return(

        <Routes>
            <Route 
                path ="/dasboard"
                element ={
                     <ProtectedRoute allowedRoles ={["adim","user"]}>
                        <Dasboard/>
                     </ProtectedRoute>
                }
                
                />
                <Route 
                path ="/files"
                element ={
                     <ProtectedRoute allowedRoles ={["adim","user"]}>
                        <FilesPage/>
                     </ProtectedRoute>
                }
                />
                <Route 
                path ="/categories"
                element ={
                     <ProtectedRoute allowedRoles ={["adim","user"]}>
                        <Categories/>
                     </ProtectedRoute>
                }
                />
                <Route path="*"element ={<Navigate to="/app/dashboad" replace/> } />
        </Routes>    

    );
    
}
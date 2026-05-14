import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export function AppRoutes() {
    <Routes>
        <Route path="/*" element ={<PublicRoutes/>} />
        <Route path="/app/" element ={<PrivateRoutes/>}/>
        <Route path ="unauthorized" element ={<UnauthorizedPage/>}/>

    </Routes>

}
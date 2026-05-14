import type {ReactNode} from 'react'
import{ Navigate } from 'react-router-dom'
type UserRole = 'adim' | 'user';
interface ProtectedRoutesProps{
 children : ReactNode;
 allwiedRoles : UserRole[];

}
const authMock ={
    isAuthenticated :true,
    user:{
        name:"Usuario Teste",
        role :"adim" as UserRole
    }
}

export function  PrivateRoutes(children, allwoedRoles) {
  if(!authMock.isAuthenticated){
    return <Navigate to="/login" replace />
  }

    if(!allowedROles.includes(authMock.user.role)){
        return <Navigate to="unauthorized" replace />
    } 
     return children;
    
}
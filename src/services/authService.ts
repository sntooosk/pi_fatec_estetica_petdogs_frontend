import api from "./api";


export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user:{
        id: string;
        name: string;
        senha: string;
        email: string;
        role : "admin" | "user"
        token: string;
    }
}

export async function LoginRequest(data: LoginData): Promise<LoginResponse> {
    console.log(" login: LoginRequest");
    const reponse = await api.post<LoginResponse>('/auth/login', data);
    console.log("Resposta do login: LoginRequest", reponse.data);
    return reponse.data;

}
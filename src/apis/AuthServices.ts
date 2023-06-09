import http, { protectedAxios } from './axios';

export interface IRegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

const signUp = (payload: IRegisterRequest) => {
    return http.post<Tokens>('/auth/signup', payload);
};

const signIn = (payload: any) => {
    return http.post<Tokens>('/auth/signin', payload);
};

const logout = () => {
    return protectedAxios.get('/auth/logout');
};

const AuthService = {
    signUp,
    signIn,
    logout
}

export default AuthService;
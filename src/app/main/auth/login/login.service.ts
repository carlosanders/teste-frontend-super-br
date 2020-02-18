import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from 'environments/environment';
import {Usuario} from "@cdk/models/usuario.model";

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {
    }

    getUserProfile(): Usuario {
        return JSON.parse(localStorage.getItem('userProfile'));
    }

    setUserProfile(userProfile: any): void {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }

    setToken(action): void {
        localStorage.setItem('token', action.payload.token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
    }

    login(username: string, password: string): Observable<any> {
        const url = `${environment.base_url}auth/getToken` + environment.xdebug;
        return this.http.post(url, {username, password});
    }

    getProfile(): Observable<any> {
        const url = `${environment.base_url}profile` + environment.xdebug;
        //return this.http.get(url);
        const profile = {
            "entities": [
                {
                    "username": "00000******",
                    "nome": "JOÃO EXTERNO",
                    "assinaturaHTML": "João Externo",
                    "email": "joao.externo@teste.com",
                    "enabled": true,
                    "nivelAcesso": 0,
                    "roles": [
                        "ROLE_ADMIN_1",
                        "ROLE_COLABORADOR",
                        "ROLE_USER",
                        "ROLE_LOGGED"
                    ],
                    "vinculacoesRoles": [
                        {
                            "role": {
                                "name": "ROLE_USER",
                                "description": "Description - ROLE_USER",
                                "id": 2,
                                "uuid": "59d11c02-8a75-49fd-8d51-b4631f517b98",
                                "ativo": true,
                                "criadoEm": "2020-02-03 20:50:21"
                            },
                            "id": 1,
                            "uuid": "15617711-1415-1214-1515-1513677278af",
                            "criadoEm": "2020-02-04 14:13:33"
                        }
                    ],
                    "id": 1,
                    "uuid": "47289232-1616-1663-2367-ffff16671a12",
                    "criadoEm": "2020-02-04 14:12:56",
                    "colaborador": {
                        "id": 2
                    }
                }
            ],
            "total": 1
        };
        return of<any>(profile);
    }

    isGranted(role: string): boolean {
        const profile = this.getUserProfile();
        let hasAccess = false;

        if (profile && profile.roles && profile.roles.length > 0) {
            hasAccess = profile.roles.findIndex((papel: string) => {
                return papel.includes(role);
            }) !== -1;
        }
        return hasAccess;
    }
}


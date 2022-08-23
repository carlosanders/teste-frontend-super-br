import {Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';

export class Widget {
    nome: string;
    moduleName: string
    hidden: boolean;
    ordem: number;
    module: any;
    role: string;
    colspan = 1;
    rowspan = 1;
    isVisible: (usuario: Usuario, loginService: LoginService) => boolean;

    constructor() {
        this.ordem = null;
        this.module = null;
        this.role = null;
        this.nome = null;
        this.moduleName = null;
        this.hidden = false;
        this.isVisible = (usuario, loginService) => !this.role || this.role && loginService.isGranted(this.role);
    }
}

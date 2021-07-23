import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ComponenteDigital} from "@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";

@Component({
    selector: 'chat-imagem',
    templateUrl: './chat-imagem.component.html',
    styleUrls: ['./chat-imagem.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatImagemComponent
{
    @Input()
    mensagensNaoLidas: number = 0;
    @Input()
    imagem: ComponenteDigital = null;

    /**
     * @param _loginService
     */
    constructor(private _loginService: LoginService)
    {
    }

}

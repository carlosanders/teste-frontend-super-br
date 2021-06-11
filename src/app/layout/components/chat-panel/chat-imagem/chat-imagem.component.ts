import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Chat} from "@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";
import {ChatUtils} from "../utils/chat.utils";

@Component({
    selector: 'chat-imagem',
    templateUrl: './chat-imagem.component.html',
    styleUrls: ['./chat-imagem.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatImagemComponent
{
    @Input()
    chat: Chat = null;
    @Input()
    mensagensNaoLidas: number = 0;

    /**
     * @param _loginService
     * @param chatUtils
     */
    constructor(private _loginService: LoginService,
                public chatUtils: ChatUtils)
    {
    }
}

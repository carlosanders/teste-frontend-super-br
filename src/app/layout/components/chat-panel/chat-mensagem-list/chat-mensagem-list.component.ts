import {
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';

import {Chat, ChatMensagem, Usuario} from "@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";

@Component({
    selector: 'chat-mensagem-list',
    templateUrl: './chat-mensagem-list.component.html',
    styleUrls: ['./chat-mensagem-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatMensagemListComponent
{
    @Input()
    chat: Chat = null;

    @Input()
    chatMensagens: ChatMensagem[] = [];

    @Input()
    loading: boolean = false;

    usuarioLogado: Usuario;
    scroll: boolean = true;

    /**
     *
     * @param _loginService
     */
    constructor(
        private _loginService: LoginService,
    )
    {
        this.usuarioLogado = this._loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * Decide whether to show or not the contact's avatar in the message row
     * @param chatMensagem
     * @param i
     */
    shouldShowContactAvatar(chatMensagem: ChatMensagem, i): boolean
    {
        return (
            chatMensagem.usuario.id !== this.usuarioLogado.id
            && (
                (
                    this.chatMensagens[i -1]
                    && this.chatMensagens[i - 1].usuario.id !== chatMensagem.usuario.id
                )
                || !this.chatMensagens[i - 1]
            )
        );
    }

    /**
     * Check if the given message is the first message of a group
     * @param chatMensagem
     * @param i
     */
    isFirstMessageOfGroup(chatMensagem: ChatMensagem, i): boolean
    {
        return (i === 0 || this.chatMensagens[i - 1] && this.chatMensagens[i - 1].usuario.id !== chatMensagem.usuario.id);
    }


    /**
     * Check if the given message is the last message of a group
     * @param chatMensagem
     * @param i
     */
    isLastMessageOfGroup(chatMensagem: ChatMensagem, i): boolean
    {
        return (i === this.chatMensagens.length - 1 || this.chatMensagens[i + 1] && this.chatMensagens[i + 1].usuario.id !== chatMensagem.usuario.id);
    }
}

import {Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';

import {Chat, ChatMensagem, Usuario} from "@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";
import {ChatUtils} from "../utils/chat.utils";
import {select, Store} from "@ngrx/store";
import {getChatMensagemIsSaving} from "../store";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'chat-mensagem-list',
    templateUrl: './chat-mensagem-list.component.html',
    styleUrls: ['./chat-mensagem-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatMensagemListComponent implements OnDestroy
{
    @Input()
    chat: Chat = null;

    @Input()
    chatMensagens: ChatMensagem[] = [];

    @Input()
    loading: boolean = false;

    usuarioLogado: Usuario;
    scroll: boolean = true;
    saving: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _loginService
     * @param _store
     * @param chatUtils
     */
    constructor(
        private _loginService: LoginService,
        private _store: Store,
        public chatUtils: ChatUtils,
    )
    {
        this.usuarioLogado = this._loginService.getUserProfile();
        this._store.pipe(
            select(getChatMensagemIsSaving),
            takeUntil(this._unsubscribeAll)
        ).subscribe(saving => {
            this.saving = saving;
        });
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

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


}

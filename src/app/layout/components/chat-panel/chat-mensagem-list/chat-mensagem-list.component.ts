import {Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewEncapsulation} from '@angular/core';

import {Chat, ChatMensagem, Usuario} from "@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";
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
export class ChatMensagemListComponent implements OnDestroy, OnChanges
{
    @Input()
    chat: Chat = null;

    @Input()
    chatMensagens: ChatMensagem[] = [];

    @Input()
    loading: boolean = false;

    @Input()
    errors: any = null;

    usuarioLogado: Usuario;
    scroll: boolean = true;
    saving: boolean = false;
    errorMessage: string = null;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _loginService
     * @param _store
     */
    constructor(
        private _loginService: LoginService,
        private _store: Store,
    )
    {
        this.usuarioLogado = this._loginService.getUserProfile();
        this._store.pipe(
            select(getChatMensagemIsSaving),
            takeUntil(this._unsubscribeAll)
        ).subscribe((saving: any) => {
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        this.errorMessage = null;

        if (this.errors && this.errors.status && this.errors.status === 422) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                this.errorMessage = fields.join(', ');
            } catch (e) {
                this.errorMessage = this.errors.error.message;
            }
        }
    }

}

import {
    Component,
    Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {Chat, ChatMensagem, Usuario} from "@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";
import {CdkPerfectScrollbarDirective} from "../../../../../@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
    selector: 'chat-mensagem-list',
    templateUrl: './chat-mensagem-list.component.html',
    styleUrls: ['./chat-mensagem-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatMensagemListComponent implements OnChanges, OnInit
{
    @Input()
    chat: Chat = null;

    @Input()
    chatMensagens: ChatMensagem[] = [];

    @Input()
    loading: boolean = false;

    @Input()
    scrollBottom = new BehaviorSubject(false);

    usuarioLogado: Usuario;
    scroll: boolean = true;

    @ViewChild(CdkPerfectScrollbarDirective, {static: false})
    directiveScroll: CdkPerfectScrollbarDirective;

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


    ngOnInit(): void {
        this.scrollBottom.subscribe((next) => {
            if (next) {
                console.log('subject!!!')
                this.scroll = false;
                this.scrollToBottom();
                this.scroll = false;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['chatMensagens'] && this.chatMensagens.length) {
            console.log('change mensagens')
            if (this.scroll) {
                console.log('scroll bottom')
                this.scrollToBottom();
            }
            this.scroll = true;
        }
    }

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


    /**
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void
    {
        speed = speed || 400;
        if ( this.directiveScroll ) {
            this.directiveScroll.update();

            setTimeout(() => this.directiveScroll.scrollToBottom(0, speed));
        }
    }
}

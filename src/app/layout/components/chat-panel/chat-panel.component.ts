import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef, EventEmitter,
    OnDestroy,
    OnInit, Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import * as moment from 'moment';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Chat, ChatMensagem, Pagination, Usuario} from "@cdk/models";
import {select, Store} from '@ngrx/store';
import {Router} from "@angular/router";
import * as fromStore from './store';
import {EnviarMensagem, GetChat, GetMensagens, OpenChat} from "./store";
import {LoginService} from "../../../main/auth/login/login.service";
import {CdkSidebarService} from "../../../../@cdk/components/sidebar/sidebar.service";
import {cdkAnimations} from "@cdk/animations";
import {filter, takeUntil} from "rxjs/operators";
import {MercureService} from "../../../../@cdk/services/mercure.service";
import * as loginStoreSelectores from "../../../main/auth/login/store/selectors";

@Component({
    selector: 'chat-panel',
    templateUrl: './chat-panel.component.html',
    styleUrls: ['./chat-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class ChatPanelComponent implements OnInit, AfterViewInit, OnDestroy
{
    chatList$: Observable<Chat[]>;
    chatList: Chat[] = [];
    chatMensagens$: Observable<ChatMensagem[]>;
    chatMensagens: ChatMensagem[] = [];
    chatMensagemPaginator$: Observable<any>;
    chatMensagemPaginator: any;
    chatMensagemLoading$: Observable<boolean>;
    chatOpen: Chat = null;
    chatMensagemForm: FormGroup;
    formState = 'chat-list';
    scrollBottom = new BehaviorSubject(false);

    @Output()
    toogleChatHandler = new EventEmitter<boolean>();

    @ViewChild('mensagem')
    mensagemElementRef: ElementRef;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     * @param _cdkSidebarService
     * @param _formBuilder
     * @param _mercureService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ChatAppState>,
        private _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
        private _formBuilder: FormBuilder,
        private _mercureService: MercureService
    )
    {
        this.chatList$ = this._store.pipe(
            select(fromStore.getChatList),
            takeUntil(this._unsubscribeAll)
        );

        this.chatMensagemLoading$ = this._store.pipe(
            select(fromStore.getChatMensagemIsLoading),
            takeUntil(this._unsubscribeAll)
        );

        this.chatMensagens$ = this._store.pipe(
            select(fromStore.getChatMensagemList),
            takeUntil(this._unsubscribeAll)
        );

        this.chatMensagemPaginator$ = this._store.pipe(
            select(fromStore.getChatMensagemPagination),
            takeUntil(this._unsubscribeAll)
        );

        this._store.pipe(
            select(loginStoreSelectores.getProfile),
            takeUntil(this._unsubscribeAll),
            filter(profile => !!profile)
        ).subscribe(profile => this.getChatsUsuario(profile));

        this.chatMensagemForm = this._formBuilder.group({
            mensagem: [null]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.chatList$.subscribe(chatList => this.chatList = chatList);
        this.chatMensagemPaginator$.subscribe(paginator => this.chatMensagemPaginator = paginator);
        this.chatMensagens$.subscribe(chatMensagens => {
            this.chatMensagens = chatMensagens;
            this._changeDetectorRef.markForCheck();
        });

        this._cdkSidebarService.getSidebar('chatPanel').openedChanged.subscribe((isOpen) => {
            if (!isOpen) {
                this.fecharChat();
            }
        });

        if (this._loginService.getUserProfile()) {
            this.getChatsUsuario(this._loginService.getUserProfile());
        }
    }

    private getChatsUsuario(usuario: Usuario): void
    {
        this._store.dispatch(new GetChat({
            filter: {
                'participantes.usuario.id': 'eq:' + usuario.id
            },
            populate: ['participantes.usuario', 'ultimaMensagem.usuario', 'populateAll'],
            limit: 10,
            offset: 0,
            sort: {atualizadoEm: 'DESC'}
        }))
    }

    onScrollChatMensagemList() : void
    {
        if (this.chatMensagens.length >= this.chatMensagemPaginator.total) {
            console.log('no scroll')
            return;
        }

        const paginator = {
            ...this.chatMensagemPaginator,
            offset: this.chatMensagemPaginator.offset + this.chatMensagemPaginator.limit
        };

        console.log('scroll load messages', paginator)

        this.getChatMensagens(paginator);
    }

    openChat(chat: Chat) : void
    {
        if (!this.chatOpen || this.chatOpen.id !== chat.id) {

            if (this.chatOpen && this.chatOpen.id) {
                this._mercureService.unsubscribe('/v1/administrativo/chat/'+this.chatOpen.id);
            }

            this.chatMensagens = [];
            this.chatOpen = chat;
            this.formState = 'chat-list';
            this._store.dispatch(new OpenChat(chat));
            this.chatOpen = chat;

            this._mercureService.subscribe('/v1/administrativo/chat/'+this.chatOpen.id);

            this.getChatMensagens({
                ...this.chatMensagemPaginator,
                filter: {'chat.id': 'eq:'+chat.id},
                limit: 10,
                offset: 0,
                populate: [
                    'populateAll',
                    'chat.participantes',
                    'chat.participantes.usuario',
                    'chat.ultimaMensagem'
                ],
                sort: {'criadoEm':'DESC'}
            });
        }

        setTimeout(() => this.mensagemElementRef.nativeElement.focus());

        this.toogleChatHandler.emit(true);
    }

    getChatMensagens(paginator:any) : void
    {
        this._store.dispatch(new GetMensagens({
            ...paginator,
            filter: {'chat.id': 'eq:'+this.chatOpen.id},
            populate: [
                'populateAll',
                'chat.participantes',
                'chat.participantes.usuario',
                'chat.ultimaMensagem'
            ],
            sort: {'criadoEm':'DESC'}
        }));
    }

    fecharChat() : void
    {
        this.toogleChatHandler.emit(false);
        if (this.chatOpen && this.chatOpen.id) {
            this._mercureService.unsubscribe('/v1/administrativo/chat/'+this.chatOpen.id);
        }
        this.chatOpen = null;
        this.chatMensagens = [];
        this.formState = 'chat-list';
    }

    closeContext() : void
    {
        //@todo
        if (!this._cdkSidebarService.getSidebar('chatPanel').isLockedOpen) {
            this._cdkSidebarService.getSidebar('chatPanel').toggleOpen();
        } else {
            this._cdkSidebarService.getSidebar('chatPanel').toggleFold();
        }
    }

    closeSidebar() : void
    {
        if (!this._cdkSidebarService.getSidebar('chatPanel').isLockedOpen) {
            this._cdkSidebarService.getSidebar('chatPanel').toggleOpen();
        } else {
            this._cdkSidebarService.getSidebar('chatPanel').toggleFold();
        }
    }

    getChatInfo(chat: Chat) : any
    {
        if (chat.grupo || chat.nome) {
            return chat;
        }

        let chatParticipante = chat.participantes
            .filter(chatParticipante => chatParticipante.usuario.id != this._loginService.getUserProfile().id)[0]

        chat.nome = chatParticipante.usuario.nome;

        return chat;
    }

    enviarMensagem(chat: Chat): void
    {
        if (this.chatMensagemForm.valid) {
            const chatMensagem = new ChatMensagem();
            chatMensagem.chat = chat;
            chatMensagem.mensagem = this.chatMensagemForm.get('mensagem').value;
            chatMensagem.usuario = this._loginService.getUserProfile();

            this._store.dispatch(new EnviarMensagem(chatMensagem));
            // Inclusão falsa da mensagem no array para melhoria de experiência do usuário
            this.chatMensagens.push(chatMensagem);
            this._changeDetectorRef.markForCheck();
            this.scrollBottom.next(true);
            this.chatMensagemForm.reset();
        }
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}

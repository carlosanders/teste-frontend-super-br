import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef, EventEmitter,
    OnDestroy,
    OnInit, Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Chat, ChatMensagem, Pagination, Usuario} from "@cdk/models";
import {select, Store} from '@ngrx/store';
import {Router} from "@angular/router";
import * as fromStore from './store';
import {
    CloseChat,
    EnviarMensagem,
    GetChat,
    GetChatIncrement,
    GetMensagens,
    GetMensagensIncrement,
    OpenChat
} from "./store";
import {LoginService} from "../../../main/auth/login/login.service";
import {CdkSidebarService} from "../../../../@cdk/components/sidebar/sidebar.service";
import {cdkAnimations} from "@cdk/animations";
import {filter, takeUntil, tap} from "rxjs/operators";
import {MercureService} from "../../../../@cdk/services/mercure.service";
import * as loginStoreSelectores from "../../../main/auth/login/store/selectors";
import {IInfiniteScrollEvent} from "ngx-infinite-scroll/src/models";

@Component({
    selector: 'chat-panel',
    templateUrl: './chat-panel.component.html',
    styleUrls: ['./chat-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class ChatPanelComponent implements OnInit, OnDestroy
{
    @Output()
    toogleChatHandler = new EventEmitter<boolean>();

    /**
     * Chat Variables
     */
    chatList$: Observable<Chat[]>;
    chatList: Chat[] = [];
    chatPaginator$: Observable<any>;
    chatPaginator: any;
    chatLoading: boolean = true;
    chatOpen$: Observable<Chat>;
    chatOpen: Chat = null;

    /**
     * Chat Mensagens Variables
     */
    chatMensagens$: Observable<ChatMensagem[]>;
    chatMensagens: ChatMensagem[] = [];
    chatMensagemPaginator$: Observable<any>;
    chatMensagemPaginator: any;
    chatMensagemLoading$: Observable<boolean>;
    chatMensagemScrollBottom:boolean = true;

    /**
     * Global controls
     */
    chatMensagemForm: FormGroup;
    componentState = 'chat-list';
    usuarioAutenticado:boolean = false;
    usuarioLogado:Usuario;
    lastScrollMensagemHeight:number;

    @ViewChild('mensagem')
    mensagemElementRef: ElementRef;

    @ViewChild('chatMensagemScroll', {static: false})
    chatMensagemScrollElRef: ElementRef;

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

        this.chatOpen$ = this._store.pipe(
            select(fromStore.getChatOpen),
            takeUntil(this._unsubscribeAll)
        );

        this.chatMensagemPaginator$ = this._store.pipe(
            select(fromStore.getChatMensagemPagination),
            takeUntil(this._unsubscribeAll)
        );

        this._store.pipe(
            select(fromStore.getChatIsLoading),
            takeUntil(this._unsubscribeAll)
        ).subscribe(isLoading => this.chatLoading = isLoading);

        this.chatPaginator$ = this._store.pipe(
            select(fromStore.getChatPagination),
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
        this.chatOpen$.subscribe(chat => {
            if (!!this.chatOpen && this.chatOpen?.id != chat?.id) {
                this._mercureService.unsubscribe('/v1/administrativo/chat/'+this.chatOpen.id);
            }

            if (chat?.id && chat?.id != this.chatOpen?.id) {
                this.componentState = 'chat-list';
                this.lastScrollMensagemHeight = null;
                this.chatMensagemScrollBottom = true;
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

                setTimeout(() => this.mensagemElementRef.nativeElement.focus());

                this.toogleChatHandler.emit(true);
            }
        });
        this.chatMensagens$.subscribe(chatMensagens => {
            if (!this.chatMensagens || !this.chatMensagens.length) {
                this.chatMensagens = chatMensagens;
            } else {
                // Tratamento para melhorar a experiência do usuário junto ao scroll no
                // Envio de uma nova mensagem...
                let recarregaMensagens = true;
                if (chatMensagens.length) {
                    let mensagensSemId = this.chatMensagens.filter(chatMensagem => !chatMensagem.id);

                    mensagensSemId.forEach((chatMensagemSemId, index) => {
                        let matchMensagem = chatMensagens.filter(chatMensagemRecebida => {
                            return chatMensagemRecebida.mensagem === chatMensagemSemId.mensagem
                                && chatMensagemRecebida.usuario.id === chatMensagemSemId.usuario.id
                        })

                        if (!matchMensagem.length) {
                            // Espera a próxima atualização do subscribe para vir com a mensagem em questão
                            // e vir como enviado (data/hora)
                            recarregaMensagens = false;
                        }
                    });
                }

                if (recarregaMensagens) {
                    this.chatMensagens = chatMensagens;
                }
            }
            this.scrollChatMensagensToBottom();
        });

        this._cdkSidebarService.getSidebar('chatPanel').openedChanged.subscribe((isOpen) => {
            if (!isOpen) {
                this.fecharChat();
            }
        });

        this.chatList$.subscribe(chatList => {
            this.chatList = chatList
        });

        this.chatPaginator$.subscribe(paginator => this.chatPaginator = paginator);
        this.chatMensagemPaginator$.subscribe(paginator => this.chatMensagemPaginator = paginator);

        if (this._loginService.getUserProfile()) {
            this.getChatsUsuario(this._loginService.getUserProfile());
        }
    }

    private getChatsUsuario(usuario: Usuario, filter:any = {}): void
    {
        this.usuarioLogado = usuario;
        this.usuarioAutenticado = true;
        this._store.dispatch(new GetChat({
            filter: {
                'outrosParticipantes.usuario.id': 'eq:' + usuario.id
            },
            gridFilter: filter,
            populate: ['participantes.usuario', 'ultimaMensagem.usuario', 'populateAll'],
            limit: 10,
            offset: 0,
            sort: {atualizadoEm: 'DESC'}
        }));
    }

    onScrollChatMensagemList() : void
    {
        if (this.chatMensagens.length >= this.chatMensagemPaginator.total) {
            return;
        }

        const paginator = {
            ...this.chatMensagemPaginator,
            offset: this.chatMensagemPaginator.offset + this.chatMensagemPaginator.limit
        };

        this.getChatMensagens(paginator);
    }

    openChat(chat: Chat) : void
    {
        if (!this.chatOpen || this.chatOpen.id !== chat.id) {
            this._store.dispatch(new OpenChat(chat));
        }
    }

    getChatMensagens(paginator:any) : void
    {
        this.chatMensagens = [];
        this._changeDetectorRef.markForCheck();

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
        this._store.dispatch(new CloseChat(this.chatOpen));
        this.chatOpen = null;
    }

    closeSidebar() : void
    {
        if (!this._cdkSidebarService.getSidebar('chatPanel').isLockedOpen) {
            this._cdkSidebarService.getSidebar('chatPanel').toggleOpen();
        } else {
            this._cdkSidebarService.getSidebar('chatPanel').toggleFold();
        }
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
            this.chatMensagemForm.reset();
            this._changeDetectorRef.markForCheck();
            this.scrollChatMensagensToBottom(true);
        }
    }

    pesquisaChat(keyword: string = ''): void
    {
        const filter = {};
        if (keyword) {
            const criteria = [];
            keyword.split(' ')
                .filter(bit => !!bit && bit.length >= 2)
                .forEach(bit => {
                    criteria.push({'nome': `like:%${bit}%`});
                    criteria.push({'descricao': `like:%${bit}%`});
                    criteria.push({'participantes.usuario.nome': `like:%${bit}%`});
            });

            filter['orX'] = criteria;
        }
        this.getChatsUsuario(this.usuarioLogado, filter);
    }

    onScrollChatList(scrollEvent: IInfiniteScrollEvent): void
    {
        if (this.chatList?.length >= this.chatPaginator?.total) {
            return;
        }

        const nparams = {
            ...this.chatPaginator,
            filter: {
                'participantes.usuario.id': 'eq:' + this._loginService.getUserProfile().id
            },
            offset: this.chatList.length
        };
        this._store.dispatch(new GetChatIncrement(nparams));
    }

    onScrollUpChatMessageList(scrollEvent: IInfiniteScrollEvent): void
    {
        if (this.chatMensagens?.length >= this.chatMensagemPaginator?.total) {
            return;
        }

        const nparams = {
            ...this.chatMensagemPaginator,
            filter: {
                'chat.id': 'eq:' + this.chatOpen.id
            },
            offset: this.chatMensagens.length
        };

        this.lastScrollMensagemHeight = this.chatMensagemScrollElRef.nativeElement.scrollHeight;
        this._store.dispatch(new GetMensagensIncrement(nparams));
    }

    onScrollChatMessageList(scrollEvent: IInfiniteScrollEvent): void
    {
        const scrollContainer = this.chatMensagemScrollElRef.nativeElement;
        const threshold = 150;
        const position = scrollContainer.scrollTop + scrollContainer.offsetHeight;
        const height = scrollContainer.scrollHeight;
        this.chatMensagemScrollBottom = position > height - threshold;
    }

    /**
     * Scroll to the bottom
     *
     */
    scrollChatMensagensToBottom(ingoresScrollControl:boolean = false): void
    {
        if (this.chatMensagemScrollElRef) {
            if (this.chatMensagemScrollBottom || ingoresScrollControl) {
                this._changeDetectorRef.detectChanges();
                this.chatMensagemScrollElRef.nativeElement.scroll({
                    top: this.chatMensagemScrollElRef.nativeElement.scrollHeight,
                    behavior: 'smooth'
                });
                this.lastScrollMensagemHeight = this.chatMensagemScrollElRef.nativeElement.scrollHeight;
            } else if (this.chatMensagens?.length <= this.chatMensagemPaginator?.total) {
                // Controle de alinhamento do topo
                // para posicionamento da mensagem em que se estava antes do carregamento
                this._changeDetectorRef.detectChanges();
                this.chatMensagemScrollElRef.nativeElement.scroll({
                    top: (this.chatMensagemScrollElRef.nativeElement.scrollHeight-this.lastScrollMensagemHeight)
                });
            }
        }
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

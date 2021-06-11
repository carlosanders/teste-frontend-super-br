import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Observable, Subject} from 'rxjs';
import {Chat, ChatMensagem, Usuario} from "@cdk/models";
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
    LimparMensagensNaoLidas,
    OpenChat,
    UnloadChatMensagens
} from './store';
import {LoginService} from "../../../main/auth/login/login.service";
import {CdkSidebarService} from "@cdk/components/sidebar/sidebar.service";
import {cdkAnimations} from "@cdk/animations";
import {filter, takeUntil} from "rxjs/operators";
import {MercureService} from "@cdk/services/mercure.service";
import {IInfiniteScrollEvent} from "ngx-infinite-scroll/src/models";
import {ChatUtils} from "./utils/chat.utils";

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

    chatMensagensBuffer: ChatMensagem[] = [];
    recarregaMensagens: boolean = true;
    chatMensagensTimer:NodeJS.Timeout = null;

    /**
     * Global controls
     */
    chatMensagemForm: FormGroup;
    activeCard = 'chat-list';
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
     * @param chatUtils
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ChatAppState>,
        private _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
        private _formBuilder: FormBuilder,
        private _mercureService: MercureService,
        public chatUtils: ChatUtils
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

        this._loginService.getUserProfileChanges()
            .pipe(
                takeUntil(this._unsubscribeAll),
            ).subscribe(profile => {
                this.usuarioLogado = profile;
                this.usuarioAutenticado = !!profile;
                if (this.usuarioAutenticado === true) {
                    this.getChatsUsuario();
                }else {
                    this.chatList = [];
                    this.chatMensagens = [];
                }
        });

        this.chatMensagemForm = this._formBuilder.group({
            mensagem: [null, [Validators.required]]
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
                this.activeCard = 'chat-mensagem-list';
                this.lastScrollMensagemHeight = null;
                this.chatMensagemScrollBottom = true;
                this.chatOpen = chat;
                this._mercureService.subscribe('/v1/administrativo/chat/'+this.chatOpen.id);
                this._mercureService.unsubscribe(this.usuarioLogado.username+'/chat');

                this._store.dispatch(new LimparMensagensNaoLidas(this.chatUtils.getParticipante(chat.participantes)));
                this._store.dispatch(new UnloadChatMensagens());

                this.getChatMensagens({
                    ...this.chatMensagemPaginator,
                    filter: {'chat.id': 'eq:'+chat.id},
                    limit: 10,
                    offset: 0,
                    populate: [
                        'populateAll',
                        'chat.participantes',
                        'chat.participantes.usuario',
                        'chat.participantes.usuario.imgPerfil',
                        'chat.ultimaMensagem',
                        'chat.ultimaMensagem.usuario'
                    ],
                    sort: {'criadoEm':'DESC'}
                });

                setTimeout(() => this.mensagemElementRef.nativeElement.focus());

                // this.toogleChatHandler.emit(true);
            } else if (chat?.id === this.chatOpen?.id) {
                this.chatOpen = chat;
            }
        });
        this.chatMensagens$.subscribe(chatMensagens => {
            if (!this.chatMensagens || !this.chatMensagens.length) {
                this.chatMensagens = chatMensagens;
            } else {
                // Tratamento para melhorar a experiência do usuário junto ao scroll no
                // Envio de uma nova mensagem...
                this.chatMensagensBuffer = chatMensagens;
                this.recarregaMensagens = true;
                if (!!chatMensagens && chatMensagens.length) {
                    let mensagensSemId = this.chatMensagens.filter(chatMensagem => !chatMensagem.id);

                    mensagensSemId.forEach((chatMensagemSemId, index) => {
                        let matchMensagem = chatMensagens.filter(chatMensagemRecebida => {
                            return chatMensagemRecebida.mensagem === chatMensagemSemId.mensagem
                                && chatMensagemRecebida.usuario.id === chatMensagemSemId.usuario.id
                        })

                        if (!matchMensagem.length) {
                            // Espera a próxima atualização do subscribe para vir com a mensagem em questão
                            // e vir como enviado (data/hora)
                            this.recarregaMensagens = false;
                        }
                    });
                }

                if (this.recarregaMensagens) {
                    this.chatMensagens = chatMensagens;
                    this.chatMensagensBuffer = [];
                }else{
                    if (this.chatMensagensTimer) {
                        clearTimeout(this.chatMensagensTimer);
                        this.chatMensagensTimer = null;
                    }
                    this.chatMensagensTimer = setTimeout(() => {
                        if (!this.recarregaMensagens && this.chatMensagensBuffer.length) {
                            this.chatMensagens = this.chatMensagensBuffer;
                            this.chatMensagensTimer = null;
                        }
                    }, 3000);
                }
            }
            this.scrollChatMensagensToBottom();
        });

        // this._cdkSidebarService.getSidebar('chatPanel').openedChanged.subscribe((isOpen) => {
        //     if (!isOpen) {
        //         this.fecharChat();
        //     }
        // });

        this.chatList$.subscribe(chatList => this.chatList = chatList);

        this.chatPaginator$.subscribe(paginator => this.chatPaginator = paginator);
        this.chatMensagemPaginator$.subscribe(paginator => this.chatMensagemPaginator = paginator);

        if (!!this._loginService.getUserProfile()) {
            this.usuarioLogado = this._loginService.getUserProfile();
            this.usuarioAutenticado = true;
            this.getChatsUsuario();
        }
    }

    private getChatsUsuario(keyword:string = ''): void
    {
        this._mercureService.subscribe(this.usuarioLogado.username+'/chat');
        let gridFilter = {};

        if (keyword.length > 0) {
            gridFilter = {'keyword': keyword};
        }
        this._store.dispatch(new GetChat({
            gridFilter: gridFilter,
            populate: [
                'participantes.usuario',
                'participantes.usuario.imgPerfil',
                'ultimaMensagem',
                'ultimaMensagem.usuario',
                'populateAll'
            ],
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
                'chat.participantes.usuario.imgPerfil',
                'chat.ultimaMensagem',
                'chat.ultimaMensagem.usuario',
            ],
            sort: {'criadoEm':'DESC'}
        }));
    }

    fecharChat() : void
    {
        // this.toogleChatHandler.emit(false);
        if (this.chatOpen && this.chatOpen.id) {
            this._mercureService.unsubscribe('/v1/administrativo/chat/'+this.chatOpen.id);
            this.activeCard = 'chat-list';
            this.getChatsUsuario();
            this._store.dispatch(new LimparMensagensNaoLidas(
                this.chatUtils.getParticipante(this.chatOpen.participantes))
            );
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
            chatMensagem.usuario = this.usuarioLogado;

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
        this.getChatsUsuario(keyword);
    }

    onScrollChatList(scrollEvent: IInfiniteScrollEvent): void
    {
        if (this.chatList?.length >= this.chatPaginator?.total) {
            return;
        }

        const nparams = {
            ...this.chatPaginator,
            limit: 10,
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

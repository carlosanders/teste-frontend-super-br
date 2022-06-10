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
import {Chat, ChatMensagem, ChatParticipante, ComponenteDigital, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {cdkAnimations} from '@cdk/animations';
import {filter, takeUntil} from 'rxjs/operators';
import {MercureService} from '@cdk/services/mercure.service';
import {IInfiniteScrollEvent} from 'ngx-infinite-scroll';

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
    chatMensagemScrollBottom: boolean = true;

    chatMensagensBuffer: ChatMensagem[] = [];
    recarregaMensagens: boolean = true;
    chatMensagensTimer: NodeJS.Timeout = null;

    /**
     * Chat Participante Variables
     */
    chatParticipanteList: ChatParticipante[] = [];
    chatParticipantePaginator: any;
    chatParticipanteLoading: boolean = false;
    chatParticipanteSaving: boolean = false;
    chatParticipanteErrors: any = null;
    chatParticipanteDeletingIds: number[] = [];

    /**
     * Chat Group Variables
     */
    chatFormCapa: ComponenteDigital = new ComponenteDigital();
    chatFormSaving: boolean = false;
    chatFormErrors: any = null;

    /**
     * Global controls
     */
    chatMensagemForm: FormGroup;
    activeCard = 'chat-list';
    usuarioAutenticado: boolean = false;
    usuarioLogado: Usuario;
    lastScrollMensagemHeight: number;

    @ViewChild('mensagem')
    set _mensagemElementRef(el: ElementRef) {
        this.mensagemElementRef = el;
        if (el && this.chatOpen) {
            setTimeout(() => this.mensagemElementRef.nativeElement.focus(), 400);
        }
    };

    @ViewChild('chatMensagemScroll', {static: false})
    chatMensagemScrollElRef: ElementRef;

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
        this._loginService.getUserProfileChanges()
            .pipe(
                filter((profile) => !!profile),
                takeUntil(this._unsubscribeAll),
            ).subscribe((profile) => {
                this.usuarioLogado = profile;
                if (this.usuarioLogado) {
                    this.getChatsUsuario();
                }
            });
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

        this.chatMensagemForm = this._formBuilder.group({
            mensagem: [null, [Validators.required]]
        });

        if (!this.usuarioLogado) {
            this._loginService.checkUserProfileChanges();
        }

        this._store.pipe(
            select(fromStore.getChatFormCapa),
            takeUntil(this._unsubscribeAll)
        ).subscribe(capa => this.chatFormCapa = capa);

        this._store.pipe(
            select(fromStore.getChatFormSaving),
            takeUntil(this._unsubscribeAll)
        ).subscribe(saving => this.chatFormSaving = saving);

        this._store.pipe(
            select(fromStore.getChatActiveCard),
            takeUntil(this._unsubscribeAll)
        ).subscribe(activeCard => this.activeCard = activeCard);

        this._store.pipe(
            select(fromStore.getChatFormErrors),
            takeUntil(this._unsubscribeAll)
        ).subscribe(errors => this.chatFormErrors = errors);

        this._store.pipe(
            select(fromStore.getChatParticipanteList),
            takeUntil(this._unsubscribeAll)
        ).subscribe(chatParticipanteList => this.chatParticipanteList = chatParticipanteList);

        this._store.pipe(
            select(fromStore.getChatParticipantePagination),
            takeUntil(this._unsubscribeAll)
        ).subscribe(chatParticipantePaginator => this.chatParticipantePaginator = chatParticipantePaginator);

        this._store.pipe(
            select(fromStore.getChatParticipanteIsLoading),
            takeUntil(this._unsubscribeAll)
        ).subscribe(chatParticipanteLoading => this.chatParticipanteLoading = chatParticipanteLoading);

        this._store.pipe(
            select(fromStore.getChatParticipanteIsSaving),
            takeUntil(this._unsubscribeAll)
        ).subscribe(chatParticipanteSaving => this.chatParticipanteSaving = chatParticipanteSaving);

        this._store.pipe(
            select(fromStore.getChatParticipanteErrors),
            takeUntil(this._unsubscribeAll)
        ).subscribe(chatParticipanteErrors => this.chatParticipanteErrors = chatParticipanteErrors);

        this._store.pipe(
            select(fromStore.getChatParticipanteDeletingIds),
            takeUntil(this._unsubscribeAll)
        ).subscribe(chatParticipanteDeletingIds => this.chatParticipanteDeletingIds = chatParticipanteDeletingIds);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._cdkSidebarService.getSidebar('chatPanel').openedChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter((isOpen: boolean) => !!isOpen && !this.chatLoading)
            )
            .subscribe(() => {
                const lastUsuarioLogado = this.usuarioLogado;
                this.usuarioLogado = this._loginService.getUserProfile();
                if (!lastUsuarioLogado && this.usuarioLogado) {
                    this.getChatsUsuario();
                }
                this._changeDetectorRef.detectChanges();
            });

        this.chatOpen$.subscribe((chat) => {

            if (!!this.chatOpen && this.chatOpen?.id != chat?.id) {
                this._mercureService.unsubscribe('/v1/administrativo/chat/'+this.chatOpen.id);
            }

            if (chat?.id && chat?.id != this.chatOpen?.id) {
                this.lastScrollMensagemHeight = null;
                this.chatMensagemScrollBottom = true;
                this.chatOpen = chat;
                this._mercureService.subscribe('/v1/administrativo/chat/'+this.chatOpen.id);

                this._store.dispatch(new fromStore.UnloadChatMensagens());
                this._store.dispatch(new fromStore.UnloadChatParticipantes());

                this.getChatParticipantes({
                    ...this.chatParticipantePaginator,
                    limit: 10,
                    offset: 0,
                    sort: {'administrador': 'DESC', 'criadoEm': 'ASC'},
                    context: {
                        'chat_individual_usuario': this.usuarioLogado?.id
                    }
                });

                this.getChatMensagens({
                    ...this.chatMensagemPaginator,
                    filter: {'chat.id': 'eq:'+chat.id},
                    limit: 10,
                    offset: 0,
                    populate: [
                        'chat',
                        'usuario'
                    ],
                    context: {
                        'chat_individual_usuario': this.usuarioLogado?.id
                    },
                    sort: {'criadoEm':'DESC'}
                });
                // this.toogleChatHandler.emit(true);
            } else if (chat?.id === this.chatOpen?.id) {
                this.chatOpen = chat;
            }
        });
        this.chatMensagens$.subscribe((chatMensagens) => {
            if (!this.chatMensagens || !this.chatMensagens.length) {
                this.chatMensagens = chatMensagens;
            } else {
                // Tratamento para melhorar a experiência do usuário junto ao scroll no
                // Envio de uma nova mensagem...
                this.chatMensagensBuffer = chatMensagens;
                this.recarregaMensagens = true;
                if (!!chatMensagens && chatMensagens.length) {
                    const mensagensSemId = this.chatMensagens.filter(chatMensagem => !chatMensagem.id);

                    mensagensSemId.forEach((chatMensagemSemId, index) => {
                        const matchMensagem = chatMensagens.filter(chatMensagemRecebida => chatMensagemRecebida.mensagem === chatMensagemSemId.mensagem
                                && chatMensagemRecebida.usuario.id === chatMensagemSemId.usuario.id);

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

        this.chatList$.subscribe(chatList => this.chatList = chatList);
        this.chatPaginator$.subscribe(paginator => this.chatPaginator = paginator);
        this.chatMensagemPaginator$.subscribe(paginator => this.chatMensagemPaginator = paginator);
    }

    private getChatsUsuario(keyword: string = ''): void
    {
        let gridFilter = {};

        if (keyword.length > 0) {
            gridFilter = {'keyword': keyword};
        }
        this._store.dispatch(new fromStore.GetChat({
            context: {
                'chat_individual_usuario': this.usuarioLogado.id,
                'chat_participante': this.usuarioLogado.id,
            },
            gridFilter: gridFilter,
            populate: [
                'ultimaMensagem',
                'capa',
            ],
            limit: 10,
            offset: 0,
            sort: {atualizadoEm: 'DESC'}
        }));
    }

    onScrollChatMensagemList(): void
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

    openChat(chat: Chat): void
    {
        if (!this.chatOpen || this.chatOpen.id !== chat.id) {
            this._store.dispatch(new fromStore.OpenChat(chat));
            this.marcarMensagensLida(chat);
        }
    }

    getChatMensagens(paginator: any): void
    {
        this.chatMensagens = [];
        this._changeDetectorRef.markForCheck();

        this._store.dispatch(new fromStore.GetMensagens({
            ...paginator,
            filter: {
                'chat.id': 'eq:'+this.chatOpen?.id,
                'criadoEm': 'gte:'+this.chatOpen?.chatParticipante?.criadoEm
            },
            populate: [
                'usuario',
                'usuario.imgPerfil',
                'chat',
            ],
            sort: {'criadoEm':'DESC'}
        }));
    }

    getChatParticipantes(paginator: any, increment: boolean = false): void
    {
        this._store.dispatch(new fromStore.GetParticipantes({
            pagination: {
                ...paginator,
                filter: {
                    'chat.id': 'eq:' + this.chatOpen.id
                },
                populate: [
                    'chat',
                    'usuario',
                    'usuario.imgPerfil',
                ]
            },
            increment: increment
        }));
    }

    fecharChat(): void
    {
        // this.toogleChatHandler.emit(false);
        if (this.chatOpen && this.chatOpen.id) {
            this._mercureService.unsubscribe('/v1/administrativo/chat/'+this.chatOpen.id);
            this.marcarMensagensLida(this.chatOpen);
            this._store.dispatch(new fromStore.UnloadChatParticipantes());
            this._store.dispatch(new fromStore.UnloadChatMensagens());

            this.getChatsUsuario();
        }
        this._store.dispatch(new fromStore.CloseChat(this.chatOpen));
        this.chatOpen = null;
    }

    marcarMensagensLida(chat: Chat): void
    {
        if (chat.chatParticipante?.mensagensNaoLidas) {
            this._store.dispatch(new fromStore.LimparMensagensNaoLidas({
                chat: chat,
                populate: [
                    'chat',
                    'chat.ultimaMensagem',
                    'chat.capa',
                ],
                context: {
                    'chat_participante': this.usuarioLogado.id,
                    'chat_individual_usuario': this.usuarioLogado.id
                }
            }));
        }
    }

    closeSidebar(): void
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

            this._store.dispatch(new fromStore.EnviarMensagem(chatMensagem));
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
        this._store.dispatch(new fromStore.GetChatIncrement(nparams));
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
        this._store.dispatch(new fromStore.GetMensagensIncrement(nparams));
    }

    onScrollChatMessageList(scrollEvent: any): void
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
    scrollChatMensagensToBottom(ingoresScrollControl: boolean = false): void
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

    cancelChatGrupoForm(): void
    {
        let activeCard = '';
        if (!this.chatOpen?.id) {

            activeCard = 'chat-list';
        } else {
            activeCard = 'chat-mensagem-list';
        }

        this._store.dispatch(new fromStore.SetChatActiveCard(activeCard));
    }

    criarGrupo(): void
    {
        if (this.chatOpen) {
            this._store.dispatch(new fromStore.CloseChat(this.chatOpen));
        }
        this._store.dispatch(new fromStore.SetChatActiveCard('chat-grupo-form'));
    }

    salvarChat(chat: Chat): void
    {
        this._store.dispatch(new fromStore.ChatSave({
            chat: chat,
            populate: [
                'capa',
                'ultimaMensagem',
            ],
            context: {
                'chat_individual_usuario': this.usuarioLogado?.id,
                'chat_participante': this.usuarioLogado.id
            }
        }));
    }

    uploadImgCapaChat(capa: ComponenteDigital): void
    {
        this._store.dispatch(new fromStore.UploadImagemCapa(capa));
    }

    chatForm(chat: Chat): void {
        this._store.dispatch(new fromStore.SetChatActiveCard('chat-grupo-form'));
    }

    chatParticipantes(chat: Chat): void {
        this._store.dispatch(new fromStore.SetChatActiveCard('chat-participantes-list'));
    }

    adicionarParticipante(chatParticipante: ChatParticipante): void
    {
        this._store.dispatch(new fromStore.AddParticipante({
            chatParticipante: chatParticipante,
            populate: [
                'usuario',
                'usuario.imgPerfil',
                'chat',
                'chat.ultimaMensagem',
            ]
        }));
    }

    tornarAdministrador(chatParticipante: ChatParticipante): void
    {
        this._store.dispatch(new fromStore.UpdateParticipante({
            chatParticipante: chatParticipante,
            changes: {
                administrador: true
            },
            populate: [
                'usuario',
                'usuario.imgPerfil',
                'chat',
                'chat.capa',
            ]
        }));
    }

    removerParticipante(chatParticipante: ChatParticipante): void
    {
        this._store.dispatch(new fromStore.RemoverParticipante({
            chatParticipante: chatParticipante
        }));
    }

    fecharParticipantes(): void
    {
        this._store.dispatch(new fromStore.SetChatActiveCard('chat-mensagem-list'));
    }

    onScrollDownChatParticipante(): void
    {
        if (this.chatParticipanteList.length >= this.chatParticipantePaginator.total) {
            return;
        }

        const paginator = {
            ...this.chatParticipantePaginator,
            offset: this.chatParticipanteList.length,
            limit: 10
        };

        this.getChatParticipantes(paginator, true);
    }

    excluirChat(chat: Chat): void
    {
        this._store.dispatch(new fromStore.ChatExcluir({
            chat: chat
        }));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

}

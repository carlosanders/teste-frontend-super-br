import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {Chat, ChatParticipante, Pagination} from "@cdk/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'chat-participantes-list',
    templateUrl: './chat-participantes-list.component.html',
    styleUrls: ['./chat-participantes-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ChatParticipantesListComponent implements OnInit, OnChanges
{
    @Input()
    chat: Chat = null;

    @Input()
    chatParticipanteList: ChatParticipante[] = [];

    @Input()
    errors: any = null;

    @Input()
    saving: boolean = false;

    @Input()
    loading: boolean = false;

    @Output()
    fecharHandler = new EventEmitter();

    @Output()
    chatFormHandler = new EventEmitter<Chat>();

    @Output()
    chatParticipantesHandler = new EventEmitter<Chat>();

    @Output()
    adicionarParticipanteHandler = new EventEmitter<ChatParticipante>();

    @Output()
    tornarAdministradorHandler = new EventEmitter<ChatParticipante>();

    @Output()
    removerParticipanteHandler = new EventEmitter<ChatParticipante>();

    @Output()
    excluirChatHandler = new EventEmitter<Chat>();

    @Output()
    scrollDownHandler = new EventEmitter();

    usuarioPagination: any = new Pagination();
    participanteForm: FormGroup = null;
    errorMessage: string = null;

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef:ChangeDetectorRef)
    {
        this.participanteForm = this._formBuilder.group({
            usuario: [null, [Validators.required]]
        });

    }

    ngOnInit(): void
    {
    }

    fechar() : void
    {
        this.fecharHandler.emit();
    }

    chatParticipantes(chat: Chat) : void
    {
            this.chatParticipantesHandler.emit(chat);
    }

    chatForm(chat: Chat) : void
    {
        this.chatFormHandler.emit(chat);
    }

    adicionarParticipante(): void
    {
        this.checkUsuario();

        if (this.participanteForm.invalid || this.saving) {
            return;
        }

        const chatParticipante = new ChatParticipante();

        chatParticipante.chat = this.chat;
        chatParticipante.usuario = this.participanteForm.get('usuario').value;
        chatParticipante.administrador = false;

        this.adicionarParticipanteHandler.emit(chatParticipante);
    }

    checkUsuario(): void
    {
        const value = this.participanteForm.get('usuario').value;
        if (!value || typeof value !== 'object') {
            this.participanteForm.get('usuario').setValue(null);
        }
    }

    tornarAdministrador(chatParticipante: ChatParticipante): void
    {
        this.tornarAdministradorHandler.emit(chatParticipante);
    }

    removerParticipante(chatParticipante: ChatParticipante): void
    {
        this.removerParticipanteHandler.emit(chatParticipante);
    }

    excluirChat(chat: Chat): void
    {
        this.excluirChatHandler.emit(chat);
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        this.errorMessage = null;

        if (changes['chat'] && this.chat && this.chat?.participantes?.length > 0) {
            this.usuarioPagination.filter = {
                'id' : 'notIn:' + this.chat.participantes
                    .map(chatParticipante => chatParticipante.usuario.id)
                    .join(',')
            }
        }

        if (changes['chat'] && changes['saving'] && this.saving === false && !this.errors) {
            this.participanteForm.reset();
        }

        if (this.errors && this.errors.status && this.errors.status === 422) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                this.errorMessage = fields.join(', ');
            } catch (e) {
                this.errorMessage = this.errors.error.message;
            }
        }

        this._changeDetectorRef.detectChanges();
    }

    scrollDown(): void
    {
        this.scrollDownHandler.emit();
    }

}

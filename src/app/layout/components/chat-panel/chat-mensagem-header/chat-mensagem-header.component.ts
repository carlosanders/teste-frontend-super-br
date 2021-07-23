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
import {Chat, ChatParticipante} from "@cdk/models";

@Component({
    selector: 'chat-mensagem-header',
    templateUrl: './chat-mensagem-header.component.html',
    styleUrls: ['./chat-mensagem-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ChatMensagemHeaderComponent implements OnInit, OnChanges
{
    @Input()
    chat: Chat = null;

    @Output()
    fecharChatHandler = new EventEmitter();

    @Output()
    chatFormHandler = new EventEmitter<Chat>();

    @Output()
    excluirChatHandler = new EventEmitter<Chat>();

    @Output()
    chatParticipantesHandler = new EventEmitter<Chat>();

    @Output()
    sairChatHandler = new EventEmitter<ChatParticipante>();

    constructor(private _changeDetectorRef:ChangeDetectorRef)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    }

    fecharChat() : void
    {
        this.fecharChatHandler.emit();
    }

    chatForm(): void
    {
        this.chatFormHandler.emit(this.chat);
    }

    chatParticipantes(): void
    {
        this.chatParticipantesHandler.emit(this.chat);
    }

    sairChat(): void
    {
        this.sairChatHandler.emit(this.chat.chatParticipante);
    }

    excluirChat(): void
    {
        this.excluirChatHandler.emit(this.chat);
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        this._changeDetectorRef.markForCheck();
    }

}

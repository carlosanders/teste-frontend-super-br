import {
    Component, EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {Chat} from "../../../../../@cdk/models";
import {ChatUtils} from "../utils/chat.utils";

@Component({
    selector: 'chat-mensagem-header',
    templateUrl: './chat-mensagem-header.component.html',
    styleUrls: ['./chat-mensagem-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatMensagemHeaderComponent implements OnInit
{
    @Input()
    chat: Chat = null;

    @Output()
    fecharChatHandler = new EventEmitter();

    /**
     */
    constructor(public chatUtils:ChatUtils)
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
}

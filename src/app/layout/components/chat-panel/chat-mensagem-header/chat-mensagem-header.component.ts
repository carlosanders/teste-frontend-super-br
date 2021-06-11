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
import {Chat} from "../../../../../@cdk/models";
import {ChatUtils} from "../utils/chat.utils";

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

    /**
     * @param chatUtils
     * @param _changeDetectorRef
     */
    constructor(public chatUtils:ChatUtils,
                private _changeDetectorRef:ChangeDetectorRef)
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

    ngOnChanges(changes: SimpleChanges): void {
        this._changeDetectorRef.markForCheck();
    }


}

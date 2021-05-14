import {
    Component,
    EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {Chat} from "@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";
import {ChatUtils} from "../utils/chat.utils";

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatListComponent implements OnInit
{
    @Input()
    chatList: Chat[] = [];
    @Input()
    loading: boolean = true;

    @Output()
    chatClickHandler = new EventEmitter<Chat>();

    /**
     * @param _loginService
     * @param chatUtils
     */
    constructor(
        private _loginService: LoginService,
        public chatUtils: ChatUtils
    )
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

    chatClick(chat: Chat) : void
    {
        this.chatClickHandler.emit(chat);
    }
}

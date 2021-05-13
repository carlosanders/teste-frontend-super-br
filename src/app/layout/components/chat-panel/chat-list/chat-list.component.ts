import {
    Component,
    EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {Chat} from "@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";

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
     *
     * @param _loginService
     */
    constructor(private _loginService: LoginService)
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

    getChatInfo(chat: Chat) : any
    {
        if (chat.grupo || chat.nome) {
            return chat;
        }

        let chatParticipante = chat.participantes
            .filter(chatParticipante => chatParticipante.usuario.id != this._loginService.getUserProfile().id)[0];

        chat.nome = chatParticipante.usuario.nome;

        return chat;
    }
}

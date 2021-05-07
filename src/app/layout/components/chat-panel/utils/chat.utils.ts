import {Injectable} from "@angular/core";
import {Chat} from "../../../../../@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";

@Injectable()
export class ChatUtils
{

    constructor(private _loginService:LoginService)
    {
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

}

import {Injectable} from "@angular/core";
import {Chat, ChatParticipante, ComponenteDigital} from "../../../../../@cdk/models";
import {LoginService} from "../../../../main/auth/login/login.service";

@Injectable()
export class ChatUtils
{

    constructor(private _loginService:LoginService)
    {
    }

    public getOutroParticipante(participantes: ChatParticipante[]): ChatParticipante
    {
        const outroParticipante = participantes
            .filter(chatParticipante => chatParticipante.usuario.id != this._loginService.getUserProfile().id);

        if (outroParticipante.length > 0) {
            return outroParticipante[0];
        }
    }

    public getParticipante(participantes: ChatParticipante[]): ChatParticipante
    {
        const outroParticipante = participantes
            .filter(chatParticipante => chatParticipante.usuario.id == this._loginService.getUserProfile().id);

        if (outroParticipante.length > 0) {
            return outroParticipante[0];
        }
    }

    getChatData(chat: Chat, chatOpen: Chat = null) : ChatData
    {
        const participante = this.getParticipante(chat.participantes);

        let mensagensNaoLidas = 0;

        if (chatOpen?.id !== chat.id) {
            mensagensNaoLidas = participante?.mensagensNaoLidas || 0;
        }


        if (chat.grupo) {
            return {
                id: chat.id,
                nome: chat.nome,
                descricao: chat.descricao,
                imagem: chat?.capa,
                participantes: chat.participantes,
                mensagensNaoLidas: mensagensNaoLidas
            };
        }

        const outroParticipante = this.getOutroParticipante(chat.participantes);

        return {
            id: chat.id,
            nome: outroParticipante?.usuario?.nome,
            descricao: null,
            imagem: outroParticipante?.usuario?.imgPerfil,
            participantes: chat.participantes,
            mensagensNaoLidas: mensagensNaoLidas
        };
    }

    getChatListTotalMensagensNaoLidas(chatlist:Chat[], chatOpen: Chat = null): number
    {
        let total = 0;

        chatlist.forEach((chat) => {
            if (chat.id !== chatOpen?.id) {
                total += this.getParticipante(chat.participantes)?.mensagensNaoLidas || 0;
            }
        })

        return total;
    }

}

export interface ChatData {
    id: number;
    nome: string;
    descricao: string;
    imagem: ComponenteDigital;
    participantes: ChatParticipante[]
    mensagensNaoLidas: number;
}


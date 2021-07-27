import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Chat, ChatParticipante} from "../models";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";

@Injectable()
export class ChatParticipanteService extends ParentGenericService<ChatParticipante> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/chat_participante', ChatParticipante);
    }

    limparMensagens(chat: Chat, populate:any = [], context: any = '{}'): Observable<ChatParticipante> {
            const params = {};
            params['context'] = context;
            params['populate'] = populate;
            return this.http.patch(
                environment.api_url + this.path + '/limpar_mensagens/' + chat.id + environment.xdebug,
                {},
                { params }
            ).pipe(
                map(response => {
                    response = plainToClass(this.clz, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new this.clz(), response);
                })
            );
        }

}

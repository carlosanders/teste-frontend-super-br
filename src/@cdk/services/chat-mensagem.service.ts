import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {ChatMensagem} from "../models";

@Injectable()
export class ChatMensagemService extends ParentGenericService<ChatMensagem> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/chat_mensagem', ChatMensagem);
    }

}

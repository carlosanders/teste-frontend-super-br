import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ChatParticipante} from "../models";

@Injectable()
export class ChatParticipanteService extends ParentGenericService<ChatParticipante> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/chat_participante', ChatParticipante);
    }

}

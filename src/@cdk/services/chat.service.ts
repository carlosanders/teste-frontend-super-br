import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {Chat, PaginatedResponse, Usuario} from "../models";

@Injectable()
export class ChatService extends ParentGenericService<Chat> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/chat', Chat);
    }

    criarOuRetornar(usuario: Usuario, populate:any = [], context: any = '{}'): Observable<Chat> {
        const params = {};
        params['context'] = context;
        params['populate'] = populate;
        return this.http.post(
            environment.api_url + this.path + '/criar_ou_retornar/' + usuario.id + environment.xdebug,
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

    findChatList(filters: any = '{}', limit: number = 25, offset: number = 0, populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get(this.path + '/find_chat_list'+ environment.xdebug, new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(this.clz, response['entities']), response['total']))
            );
    }

}

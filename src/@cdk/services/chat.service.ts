import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {classToPlain, plainToClass} from 'class-transformer';
import {Chat, Usuario} from "../models";

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

}

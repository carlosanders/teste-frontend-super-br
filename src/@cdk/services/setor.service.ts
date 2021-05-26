import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Setor, Tarefa} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class SetorService extends ParentGenericService<Setor> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/setor', Setor);
    }

    transferirProcessosProtocolo(setor: Setor, context: any = '{}'): Observable<Tarefa> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/setor'}/${setor.id}/transferir_processos_protocolo` + environment.xdebug,
            null,
            {params}
        ).pipe(
            map((response) => {
                response = plainToClass(Setor, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Setor(), {...setor, ...response});
            })
        );
    }
}

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginatedResponse, Pessoa} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {ParentGenericService} from './parent-generic.service';
import {environment} from '../../environments/environment';

@Injectable()
export class PessoaService extends ParentGenericService<Pessoa> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
        @Inject('serviceModule') @Optional() private serviceModule: string
    ) {
        super(modelService, `${serviceModule ?? 'administrativo'}/pessoa`, Pessoa);
    }

    patch(pessoa: Pessoa, changes: any): Observable<Pessoa> {
        return this.http.patch(
            `${environment.api_url}${this.serviceModule ?? 'administrativo'}/pessoa/${pessoa.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(Pessoa, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Pessoa(), {...pessoa, ...response});
            })
        );
    }

    search(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.search(`${this.serviceModule ?? 'administrativo'}/pessoa`, new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Pessoa, response['entities']), response['total']))
            );
    }


}

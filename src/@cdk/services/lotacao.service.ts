import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Lotacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';

@Injectable()
export class LotacaoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Lotacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('lotacao', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Lotacao, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('lotacao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Lotacao, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('lotacao', new HttpParams({fromObject: params}));
    }

    save(lotacao: Lotacao, context: any = '{}'): Observable<Lotacao> {
        const params = {};
        params['context'] = context;
        if (lotacao.id) {
            return this.modelService.put('lotacao', lotacao.id, classToPlain(lotacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Lotacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Lotacao(), {...lotacao, ...response});
                    })
                );
        } else {
            return this.modelService.post('lotacao', classToPlain(lotacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Lotacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Lotacao(), {...lotacao, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Lotacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('lotacao', id, new HttpParams({fromObject: params}));
    }

    patch(lotacao: Lotacao, changes: any): Observable<Lotacao> {
        return this.http.patch(
            `${environment.api_url}${'lotacao'}/${lotacao.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map(response => {
                response = plainToClass(Lotacao, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Lotacao(), {...lotacao, ...response});
            })
        );
    }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Processo} from '@cdk/models/processo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {environment} from 'environments/environment';
import {Visibilidade} from '@cdk/models/visibilidade.model';

@Injectable()
export class ProcessoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<Processo> {
        return this.modelService.getOne('processo', id)
            .pipe(
                map(response => plainToClass(Processo, response)[0])
            );
    }

    getVisibilidade(id: number): Observable<any> {
        return this.http.get(`${environment.api_url}${'processo'}/${id}/visibilidade` + environment.xdebug, {})
            .pipe(
                map(response => plainToClass(Visibilidade, response))
            );
    }

    createVisibilidade(processoId: number, visibilidade: Visibilidade): Observable<Visibilidade> {
        return this.http.put(
            `${environment.api_url}${'processo'}/${processoId}/${'visibilidade'}` + environment.xdebug,
            JSON.stringify(visibilidade)
        ).pipe(
            map(response => plainToClass(Visibilidade, response))
        );
    }

    destroyVisibilidade(processoId: number, visibilidadeId: number): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${'processo'}/${processoId}/${'visibilidade'}/${visibilidadeId}` + environment.xdebug
        );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('processo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Processo, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('processo', new HttpParams({fromObject: params}));
    }

    save(processo: Processo): Observable<Processo> {
        if (processo.id) {
            return this.modelService.put('processo', processo.id, classToPlain(processo))
                .pipe(
                    map(response => {
                        response = plainToClass(Processo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Processo(), {...processo, ...response});
                    })
                );
        } else {
            return this.modelService.post('processo', classToPlain(processo))
                .pipe(
                    map(response => {
                        response = plainToClass(Processo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Processo(), {...processo, ...response});
                    })
                );
        }
    }

    arquivar(processo: Processo): Observable<Processo> {
        return this.http.patch(
            `${environment.api_url}${'processo'}/${processo.id}/${'arquivar'}` + environment.xdebug,
            JSON.stringify(classToPlain(processo))
        ).pipe(
            map(response => {
                response = plainToClass(Processo, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Processo(), {...processo, ...response});
            })
        );
    }

    destroy(id: number): Observable<Processo> {
        return this.modelService.delete('processo', id);
    }
}

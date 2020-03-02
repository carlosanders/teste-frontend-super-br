import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Processo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';
import {Visibilidade} from '@cdk/models';

@Injectable()
export class ProcessoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number, params: HttpParams = new HttpParams(), context: any = {}): Observable<Processo> {
        params['context'] = context;
        return this.modelService.getOne('processo', id, params)
            .pipe(
                map(response => plainToClass(Processo, response)[0])
            );
    }

    downloadAsPdf(id: number | string, sequencial: number | string, params: HttpParams = new HttpParams(), context: any = {}): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}processo/${id}/downloadAsPdf/${sequencial}` + environment.xdebug, {params});
    }

    downloadAsZip(id: number | string, sequencial: number | string, params: HttpParams = new HttpParams(), context: any = {}): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}processo/${id}/downloadAsZip/${sequencial}` + environment.xdebug, {params});
    }

    getVisibilidade(id: number, context: any = {}): Observable<any> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.get(`${environment.api_url}${'processo'}/${id}/visibilidade` + environment.xdebug, {params})
            .pipe(
                map(response => plainToClass(Visibilidade, response))
            );
    }

    createVisibilidade(processoId: number, visibilidade: Visibilidade, context: any = {}): Observable<Visibilidade> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.put(
            `${environment.api_url}${'processo'}/${processoId}/${'visibilidade'}` + environment.xdebug,
            JSON.stringify(visibilidade),
            {params}
        ).pipe(
            map(response => plainToClass(Visibilidade, response))
        );
    }

    destroyVisibilidade(processoId: number, visibilidadeId: number, context: any = {}): Observable<any> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.delete(
            `${environment.api_url}${'processo'}/${processoId}/${'visibilidade'}/${visibilidadeId}` + environment.xdebug,
            {params}
        );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('processo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Processo, response['entities']), response['total']))
                
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('processo', new HttpParams({fromObject: params}));
    }

    save(processo: Processo, context: any = {}): Observable<Processo> {
        const params = {};
        params['context'] = context;
        if (processo.id) {
            return this.modelService.put('processo', processo.id, classToPlain(processo), new HttpParams({fromObject: params}))
                .pipe(
//                    tap((n) => {console.log('servico PUT' + n); } ),
                    map(response => {
                        response = plainToClass(Processo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Processo(), {...processo, ...response});
                    })
                );
        } else {
            return this.modelService.post('processo', classToPlain(processo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Processo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Processo(), {...processo, ...response});
                    })
                );
        }
    }

    arquivar(processo: Processo, context: any = {}): Observable<Processo> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'processo'}/${processo.id}/${'arquivar'}` + environment.xdebug,
            JSON.stringify(classToPlain(processo)),
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(Processo, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Processo(), {...processo, ...response});
            })
        );
    }

    destroy(id: number, context: any = {}): Observable<Processo> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('processo', id, new HttpParams({fromObject: params}));
    }
}

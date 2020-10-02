import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginatedResponse, Processo, Visibilidade} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {classToPlain, plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class ProcessoService extends ParentGenericService<Processo> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/processo', Processo);
    }

    downloadAsPdf(id: number | string, sequencial: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/processo/${id}/download_as_pdf/${sequencial}` + environment.xdebug, {params});
    }

    downloadAsZip(id: number | string, sequencial: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/processo/${id}/download_as_zip/${sequencial}` + environment.xdebug, {params});
    }

    getVisibilidade(id: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/${'processo'}/${id}/visibilidade` + environment.xdebug, {params})
            .pipe(
                map(response => plainToClass(Visibilidade, response))
            );
    }

    createVisibilidade(processoId: number, visibilidade: Visibilidade, context: any = '{}'): Observable<Visibilidade> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.put(
            `${environment.api_url}${'administrativo/processo'}/${processoId}/${'visibilidade'}` + environment.xdebug,
            JSON.stringify(visibilidade),
            {params}
        ).pipe(
            map(response => plainToClass(Visibilidade, response))
        );
    }

    destroyVisibilidade(processoId: number, visibilidadeId: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.delete(
            `${environment.api_url}${'administrativo/processo'}/${processoId}/${'visibilidade'}/${visibilidadeId}` + environment.xdebug,
            {params}
        );
    }

    arquivar(processo: Processo, context: any = '{}'): Observable<Processo> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/processo'}/${processo.id}/${'arquivar'}` + environment.xdebug,
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

    autuar(processo: Processo, context: any = '{}'): Observable<Processo> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/processo'}/${processo.id}/${'autuar'}` + environment.xdebug,
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

    patch(processo: Processo, changes: any): Observable<Processo> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/processo'}/${processo.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map(response => {
                response = plainToClass(Processo, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Processo(), {...processo, ...response});
            })
        );
    }

    imprimirEtiqueta(id: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/processo/imprime_etiqueta/${id}` + environment.xdebug, {params});
    }

    search(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.search('administrativo/processo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Processo, response['entities']), response['total']))
            );
    }
}

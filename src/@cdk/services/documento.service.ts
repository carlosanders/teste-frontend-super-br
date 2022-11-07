import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Documento, Tarefa, Visibilidade} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';

import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class DocumentoService extends ParentGenericService<Documento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/documento', Documento);
    }

    preparaAssinatura(documentosId: any = '[]', context: any = '{}'): Observable<any> {
        const p = {};
        p['documentosId'] = documentosId;
        p['processUUID'] = localStorage.getItem('assinador');
        const params = new HttpParams({fromObject: p});
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/${'documento'}` + '/prepara_assinatura' + environment.xdebug, {params});
    }

    removeAssinatura(documentosId: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.delete(`${environment.api_url}administrativo/${'documento'}/${documentosId}/delete_assinatura` + environment.xdebug, {params});
    }

    getVisibilidade(id: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/${'documento'}/${id}/visibilidade` + environment.xdebug, {params})
            .pipe(
                map(response => plainToClass(Visibilidade, response))
            );
    }

    createVisibilidade(documentosId: number, visibilidade: Visibilidade, context: any = '{}'): Observable<Visibilidade> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.put(
            `${environment.api_url}${'administrativo/documento'}/${documentosId}/${'visibilidade'}` + environment.xdebug,
            JSON.stringify(visibilidade),
            {params}
        ).pipe(
            map(response => plainToClass(Visibilidade, response))
        );
    }

    destroyVisibilidade(documentosId: number, visibilidadeId: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.delete(
            `${environment.api_url}${'administrativo/documento'}/${documentosId}/${'visibilidade'}/${visibilidadeId}` + environment.xdebug,
            {params}
        );
    }

    deleteVisibilidades(documentoId: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.delete(
            `${environment.api_url}${'administrativo/documento'}/${'deletevisibilidade'}/${documentoId}` + environment.xdebug,
            {params}
        );
    }

    downloadP7S(id: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.get(`${environment.api_url}administrativo/documento/${id}/download_p7s` + environment.xdebug, {params});
    }

    undelete(documento: Documento, populate: any = '[]', context: any = '{}'): Observable<Documento> {
        const objParams = {
            'context': context,
            'populate': populate
        };
        const params: HttpParams = new HttpParams({fromObject: objParams});
        return this.http.patch(
            `${environment.api_url}${'administrativo/documento'}/${documento.id}/${'undelete'}` + environment.xdebug,
            null,
            { params }
        ).pipe(
            map((response) => {
                response = plainToClass(Documento, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Documento(), {...documento, ...response});
            })
        );
    }

    convertToPdf(id: number, changes: any, populate: any = '[]', context: any = '{}'): Observable<Documento> {
        const params = {};
        params['populate'] = JSON.stringify(populate);
        params['context'] = context;

        return this.modelService.patch(
            'administrativo/documento/convertToPdf',
            id,
            changes,
            new HttpParams({fromObject: params})
        );
    }

    converteMinutaEmAnexo(documentoOrigem: Documento, documentoDestino: Documento, populate: any = '[]', context: any = '{}'): Observable<Documento> {
        const objParams = {
            'context': context,
            'populate': populate
        };
        const params: HttpParams = new HttpParams({fromObject: objParams});
        return this.http.patch(
            `${environment.api_url}administrativo/documento/${documentoOrigem.id}/converte_minuta_anexo/${documentoDestino.id}` + environment.xdebug,
            null,
            { params }
        ).pipe(
            map((response) => plainToClass(Documento, response))
        );
    }

    converteAnexoEmMinuta(documento: Documento, tarefa: Tarefa, populate: any = '[]', context: any = '{}'): Observable<Documento> {
        const objParams = {
            'context': context,
            'populate': populate
        };
        const params: HttpParams = new HttpParams({fromObject: objParams});
        return this.http.patch(
            `${environment.api_url}administrativo/documento/${documento.id}/converte_anexo_minuta/${tarefa.id}` + environment.xdebug,
            null,
            { params }
        ).pipe(
            map((response) => plainToClass(Documento, response))
        );
    }
}

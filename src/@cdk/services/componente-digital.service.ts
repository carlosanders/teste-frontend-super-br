import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ParentGenericService} from './parent-generic.service';
import {ComponenteDigital, PaginatedResponse} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {classToPlain, plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ComponenteDigitalService extends ParentGenericService<ComponenteDigital> {

    public doEditorSave: Subject<any> = new Subject();
    public completedEditorSave: Subject<any> = new Subject();
    public revertendo: Subject<boolean> = new Subject();
    public alterandoModelo: Subject<boolean> = new Subject();
    public trocandoDocumento: Subject<boolean> = new Subject();
    public saving: Subject<boolean> = new Subject();

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/componente_digital', ComponenteDigital);
    }

    download(id: number | string, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.get(`${environment.api_url}administrativo/componente_digital/${id}/download` + environment.xdebug, {params});
    }

    downloadLatestByProcessoId(processoId: number | string, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.get(`${environment.api_url}administrativo/componente_digital/${processoId}/download_latest` + environment.xdebug, {params});
    }

    search(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.search('administrativo/componente_digital', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ComponenteDigital, response['entities']), response['total']))
            );
    }

    patch(componenteDigital: ComponenteDigital, changes: any, context: any = '{}'): Observable<ComponenteDigital> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}administrativo/componente_digital/${componenteDigital.id}` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        ).pipe(
            map((response) => {
                response = plainToClass(ComponenteDigital, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
            })
        );
    }

    reverter(componenteDigital: ComponenteDigital, changes: any, context: any = '{}'): Observable<ComponenteDigital> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}administrativo/componente_digital/${componenteDigital.id}/reverter` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        ).pipe(
            map((response) => {
                response = plainToClass(ComponenteDigital, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
            })
        );
    }

    aprovar(componenteDigital: ComponenteDigital, populate: any = '[]'): Observable<ComponenteDigital> {
        const params = {};
        params['populate'] = populate;
        return this.modelService.post(
            'administrativo/componente_digital/aprovar', classToPlain(componenteDigital), new HttpParams({fromObject: params})
        ).pipe(
            map((response) => {
                response = plainToClass(ComponenteDigital, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
            })
        );
    }

    preparaConverter(id: number, changes: any, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/componente_digital'}/${id}/${'convertToPdf'}` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        )
            .pipe(
                map(response =>
                    plainToClass(ComponenteDigital, response))
            );
    }

    downloadP7S(id: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.get(`${environment.api_url}administrativo/componente_digital/${id}/download_p7s` + environment.xdebug, {params});
    }

    converterHtml(id: number, changes: any, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/componente_digital'}/${id}/${'convertToHtml'}` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        )
            .pipe(
                map(response =>
                    plainToClass(ComponenteDigital, response))
            );
    }

    renderHtmlContent(componenteDigital: ComponenteDigital): Observable<ComponenteDigital> {
        return this.modelService
            .post('administrativo/componente_digital/render_html_content', classToPlain(componenteDigital))
            .pipe(
                map((response) => {
                    response = plainToClass(ComponenteDigital, response);
                    Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                    return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
                })
            );
    }

    comparaComponenteDigitalComHtml(id: number | string, params: {conteudo: string, usuario: string, data: string}, context: any = '{}'): Observable<any> {
        return this.modelService
            .post(`administrativo/componente_digital/${id}/compara_component_digital_com_html`, classToPlain(params))
            .pipe(
                map((response) => {
                    response = plainToClass(ComponenteDigital, response);
                    Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                    return Object.assign(new ComponenteDigital(), {...response});
                })
            );
    }

    preparaAssinaturaComponente(componentesDigitalId: any = '[]', documentoId: any = '[]', context: any = '{}'): Observable<any> {
        const p = {};
        p['componentesDigitalId'] = componentesDigitalId;
        p['documentoId'] = documentoId;
        p['processUUID'] = localStorage.getItem('assinador');
        const params = new HttpParams({fromObject: p});
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/${'componente_digital'}` + '/prepara_assinatura_componente' + environment.xdebug, {params});
    }
}

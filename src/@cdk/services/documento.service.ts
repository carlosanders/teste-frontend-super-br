import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Distribuicao, Documento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {environment} from 'environments/environment';
import {Visibilidade} from '../models/visibilidade.model';
import { ComponenteDigital } from '@cdk/models';
import {DocumentoAvulso} from '@cdk/models';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class DocumentoService extends ParentGenericService<Documento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'documento', Documento);
    }

    preparaAssinatura(documentosId: any = '[]', context: any = '{}'): any {
        const p = {};
        p['documentosId'] = documentosId;
        const params = new HttpParams({fromObject: p});
        params['context'] = context;
        return this.http.get(`${environment.api_url}${'documento'}` + '/prepara_assinatura' + environment.xdebug, {params});
    }

    getVisibilidade(id: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.get(`${environment.api_url}${'documento'}/${id}/visibilidade` + environment.xdebug, {params})
            .pipe(
                map(response => plainToClass(Visibilidade, response))
            );
    }

    createVisibilidade(documentosId: number, visibilidade: Visibilidade, context: any = '{}'): Observable<Visibilidade> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.put(
            `${environment.api_url}${'documento'}/${documentosId}/${'visibilidade'}` + environment.xdebug,
            JSON.stringify(visibilidade),
            {params}
        ).pipe(
            map(response => plainToClass(Visibilidade, response))
        );
    }

    destroyVisibilidade(documentosId: number, visibilidadeId: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.delete(
            `${environment.api_url}${'documento'}/${documentosId}/${'visibilidade'}/${visibilidadeId}` + environment.xdebug,
            {params}
        );
    }

    /**SERVICE DE COMPONENTE DIGITAL NO LUGAR ERRADO. VER SE CONSEGUE MUDAR. */
    preparaConverter(documentoId: number, changes: any, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'componente_digital'}/${documentoId}/${'convertToPdf'}`+ environment.xdebug,
            JSON.stringify(changes),
            {params}
        )
        .pipe(
            map(response =>  
                plainToClass(ComponenteDigital, response)[0])            
                )
        ;
    }
}

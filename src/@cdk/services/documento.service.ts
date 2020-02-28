import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Documento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';
import {Visibilidade} from '../models/visibilidade.model';
import { ComponenteDigital } from '@cdk/models';

@Injectable()
export class DocumentoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<Documento> {
        return this.modelService.getOne('documento', id)
            .pipe(
                map(response => plainToClass(Documento, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('documento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Documento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('documento', new HttpParams({fromObject: params}));
    }

    save(documento: Documento): Observable<Documento> {
        if (documento.id) {
            return this.modelService.put('documento', documento.id, classToPlain(documento))
                .pipe(
                    map(response => {
                        response = plainToClass(Documento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Documento(), {...documento, ...response});
                    })
                );
        } else {
            return this.modelService.post('documento', classToPlain(documento))
                .pipe(
                    map(response => {
                        response = plainToClass(Documento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Documento(), {...documento, ...response});
                    })
                );
        }
    }

    preparaAssinatura(documentosId: any = '[]'): any {
        const p = {};
        p['documentosId'] = documentosId;
        const params = new HttpParams({fromObject: p});
        return this.http.get(`${environment.api_url}${'documento'}` + '/prepara_assinatura' + environment.xdebug, {params});
    }

    destroy(id: number): Observable<Documento> {
        return this.modelService.delete('documento', id);
    }

    getVisibilidade(id: number): Observable<any> {
        return this.http.get(`${environment.api_url}${'documento'}/${id}/visibilidade` + environment.xdebug, {})
            .pipe(
                map(response => plainToClass(Visibilidade, response))
            );
    }

    createVisibilidade(documentosId: number, visibilidade: Visibilidade): Observable<Visibilidade> {
        return this.http.put(
            `${environment.api_url}${'documento'}/${documentosId}/${'visibilidade'}` + environment.xdebug,
            JSON.stringify(visibilidade)
        ).pipe(
            map(response => plainToClass(Visibilidade, response))
        );
    }

    destroyVisibilidade(documentosId: number, visibilidadeId: number): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${'documento'}/${documentosId}/${'visibilidade'}/${visibilidadeId}` + environment.xdebug
        );
    }


    /**SERVICE DE COMPONENTE DIGITAL NO LUGAR ERRADO. VER SE CONSEGUE MUDAR. */
    preparaConverter(documentoId: number, changes: any): Observable<any> {
        return this.http.patch(
            `${environment.api_url}${'componente_digital'}/${documentoId}/${'convertToPdf'}`+ environment.xdebug,
            JSON.stringify(changes)
        )
        .pipe(
            map(response =>  
                plainToClass(ComponenteDigital, response)[0])            
                )
        ;
    }
}

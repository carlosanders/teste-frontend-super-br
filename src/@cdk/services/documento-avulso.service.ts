import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {environment} from 'environments/environment';
import {Documento} from '../models';

@Injectable()
export class DocumentoAvulsoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<DocumentoAvulso> {
        return this.modelService.getOne('documento_avulso', id)
            .pipe(
                map(response => plainToClass(DocumentoAvulso, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('documento_avulso', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(DocumentoAvulso, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('documento_avulso', new HttpParams({fromObject: params}));
    }

    save(documentoAvulso: DocumentoAvulso): Observable<DocumentoAvulso> {
        if (documentoAvulso.id) {
            return this.modelService.put('documento_avulso', documentoAvulso.id, classToPlain(documentoAvulso))
                .pipe(
                    map(response => {
                        response = plainToClass(DocumentoAvulso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new DocumentoAvulso(), {...documentoAvulso, ...response});
                    })
                );
        } else {
            return this.modelService.post('documento_avulso', classToPlain(documentoAvulso))
                .pipe(
                    map(response => {
                        response = plainToClass(DocumentoAvulso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new DocumentoAvulso(), {...documentoAvulso, ...response});
                    })
                );
        }
    }

    remeter(documentoAvulso: DocumentoAvulso): Observable<DocumentoAvulso> {
        return this.http.patch(
            `${environment.api_url}${'documento_avulso'}/${documentoAvulso.id}/${'remeter'}` + environment.xdebug,
            JSON.stringify(classToPlain(documentoAvulso))
        ).pipe(
            map(response => {
                response = plainToClass(DocumentoAvulso, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new DocumentoAvulso(), {...documentoAvulso, ...response});
            })
        );
    }

    toggleEncerramento(documentoAvulso: DocumentoAvulso): Observable<DocumentoAvulso> {
        return this.http.patch(
            `${environment.api_url}${'documento_avulso'}/${documentoAvulso.id}/${'toggle_encerramento'}` + environment.xdebug,
            JSON.stringify(classToPlain(documentoAvulso))
        ).pipe(
            map(response => {
                response = plainToClass(DocumentoAvulso, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new DocumentoAvulso(), {...documentoAvulso, ...response});
            })
        );
    }

    destroy(id: number): Observable<DocumentoAvulso> {
        return this.modelService.delete('documento_avulso', id);
    }

    responder(documentoAvulso: DocumentoAvulso): Observable<DocumentoAvulso> {
        return this.http.patch(
            `${environment.api_url}${'documento_avulso'}/${documentoAvulso.id}/${'responder'}` + environment.xdebug,
            JSON.stringify(classToPlain(documentoAvulso))
        ).pipe(
            map(response => {
                response = plainToClass(DocumentoAvulso, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new DocumentoAvulso(), {...documentoAvulso, ...response});
            })
        );
    }
}

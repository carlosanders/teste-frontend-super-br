import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DocumentoIdentificador} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class DocumentoIdentificadorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<DocumentoIdentificador> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('documento_identificador', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(DocumentoIdentificador, response)[0])
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

        return this.modelService.get('documento_identificador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(DocumentoIdentificador, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('documento_identificador', new HttpParams({fromObject: params}));
    }

    save(documentoIdentificador: DocumentoIdentificador, context: any = {}): Observable<DocumentoIdentificador> {
        const params = {};
        params['context'] = context;
        if (documentoIdentificador.id) {
            return this.modelService.put('documento_identificador', documentoIdentificador.id, classToPlain(documentoIdentificador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(DocumentoIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new DocumentoIdentificador(), {...documentoIdentificador, ...response});
                    })
                );
        } else {
            return this.modelService.post('documento_identificador', classToPlain(documentoIdentificador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(DocumentoIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new DocumentoIdentificador(), {...documentoIdentificador, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<DocumentoIdentificador> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('documento_identificador', id, new HttpParams({fromObject: params}));
    }
}

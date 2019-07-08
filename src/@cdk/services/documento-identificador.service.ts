import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DocumentoIdentificador} from '@cdk/models/documento-identificador.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class DocumentoIdentificadorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<DocumentoIdentificador> {
        return this.modelService.getOne('documento_identificador', id)
            .pipe(
                map(response => plainToClass(DocumentoIdentificador, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('documento_identificador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(DocumentoIdentificador, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('documento_identificador', new HttpParams({fromObject: params}));
    }

    save(documentoIdentificador: DocumentoIdentificador): Observable<DocumentoIdentificador> {
        if (documentoIdentificador.id) {
            return this.modelService.put('documento_identificador', documentoIdentificador.id, classToPlain(documentoIdentificador))
                .pipe(
                    map(response => {
                        response = plainToClass(DocumentoIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new DocumentoIdentificador(), {...documentoIdentificador, ...response});
                    })
                );
        } else {
            return this.modelService.post('documento_identificador', classToPlain(documentoIdentificador))
                .pipe(
                    map(response => {
                        response = plainToClass(DocumentoIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new DocumentoIdentificador(), {...documentoIdentificador, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<DocumentoIdentificador> {
        return this.modelService.delete('documento_identificador', id);
    }
}

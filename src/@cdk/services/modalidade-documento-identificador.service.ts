import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeDocumentoIdentificador} from '@cdk/models/modalidade-documento-identificador.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeDocumentoIdentificadorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeDocumentoIdentificador> {
        return this.modelService.getOne('modalidade_documento_identificador', id)
            .pipe(
                map(response => plainToClass(ModalidadeDocumentoIdentificador, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_documento_identificador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeDocumentoIdentificador, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_documento_identificador', new HttpParams({fromObject: params}));
    }

    save(modalidadeDocumentoIdentificador: ModalidadeDocumentoIdentificador): Observable<ModalidadeDocumentoIdentificador> {
        if (modalidadeDocumentoIdentificador.id) {
            return this.modelService.put('modalidade_documento_identificador', modalidadeDocumentoIdentificador.id, classToPlain(modalidadeDocumentoIdentificador))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeDocumentoIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeDocumentoIdentificador(), {...modalidadeDocumentoIdentificador, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_documento_identificador', classToPlain(modalidadeDocumentoIdentificador))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeDocumentoIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeDocumentoIdentificador(), {...modalidadeDocumentoIdentificador, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeDocumentoIdentificador> {
        return this.modelService.delete('modalidade_documento_identificador', id);
    }
}

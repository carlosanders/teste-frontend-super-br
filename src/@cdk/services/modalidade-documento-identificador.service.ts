import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeDocumentoIdentificador} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeDocumentoIdentificadorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeDocumentoIdentificador> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_documento_identificador', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeDocumentoIdentificador, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('modalidade_documento_identificador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeDocumentoIdentificador, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_documento_identificador', new HttpParams({fromObject: params}));
    }

    save(modalidadeDocumentoIdentificador: ModalidadeDocumentoIdentificador, context: any = '{}'): Observable<ModalidadeDocumentoIdentificador> {
        const params = {};
        params['context'] = context;
        if (modalidadeDocumentoIdentificador.id) {
            return this.modelService.put('modalidade_documento_identificador', modalidadeDocumentoIdentificador.id, classToPlain(modalidadeDocumentoIdentificador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeDocumentoIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeDocumentoIdentificador(), {...modalidadeDocumentoIdentificador, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_documento_identificador', classToPlain(modalidadeDocumentoIdentificador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeDocumentoIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeDocumentoIdentificador(), {...modalidadeDocumentoIdentificador, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeDocumentoIdentificador> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_documento_identificador', id, new HttpParams({fromObject: params}));
    }
}

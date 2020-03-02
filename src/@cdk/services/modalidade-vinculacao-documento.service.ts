import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeVinculacaoDocumento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeVinculacaoDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<ModalidadeVinculacaoDocumento> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_vinculacao_documento', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeVinculacaoDocumento, response)[0])
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

        return this.modelService.get('modalidade_vinculacao_documento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeVinculacaoDocumento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_vinculacao_documento', new HttpParams({fromObject: params}));
    }

    save(modalidadeVinculacaoDocumento: ModalidadeVinculacaoDocumento, context: any = {}): Observable<ModalidadeVinculacaoDocumento> {
        const params = {};
        params['context'] = context;
        if (modalidadeVinculacaoDocumento.id) {
            return this.modelService.put('modalidade_vinculacao_documento', modalidadeVinculacaoDocumento.id, classToPlain(modalidadeVinculacaoDocumento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeVinculacaoDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeVinculacaoDocumento(), {...modalidadeVinculacaoDocumento, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_vinculacao_documento', classToPlain(modalidadeVinculacaoDocumento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeVinculacaoDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeVinculacaoDocumento(), {...modalidadeVinculacaoDocumento, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<ModalidadeVinculacaoDocumento> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_vinculacao_documento', id, new HttpParams({fromObject: params}));
    }
}

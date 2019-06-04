import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalidadeVinculacaoDocumento} from '@cdk/models/modalidade-vinculacao-documento.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeVinculacaoDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeVinculacaoDocumento> {
        return this.modelService.getOne('modalidade_vinculacao_documento', id)
            .map(response => plainToClass(ModalidadeVinculacaoDocumento, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_vinculacao_documento', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ModalidadeVinculacaoDocumento, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_vinculacao_documento', new HttpParams({fromObject: params}));
    }

    save(modalidadeVinculacaoDocumento: ModalidadeVinculacaoDocumento): Observable<ModalidadeVinculacaoDocumento> {
        if (modalidadeVinculacaoDocumento.id) {
            return this.modelService.put('modalidade_vinculacao_documento', modalidadeVinculacaoDocumento.id, classToPlain(modalidadeVinculacaoDocumento))
                .map(response => {
                    response = plainToClass(ModalidadeVinculacaoDocumento, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeVinculacaoDocumento(), {...modalidadeVinculacaoDocumento, ...response});
                });
        } else {
            return this.modelService.post('modalidade_vinculacao_documento', classToPlain(modalidadeVinculacaoDocumento))
                .map(response => {
                    response = plainToClass(ModalidadeVinculacaoDocumento, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeVinculacaoDocumento(), {...modalidadeVinculacaoDocumento, ...response});
                });
        }
    }

    destroy(id: number): Observable<ModalidadeVinculacaoDocumento> {
        return this.modelService.delete('modalidade_vinculacao_documento', id);
    }
}

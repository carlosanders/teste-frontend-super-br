import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeVinculacaoProcesso} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeVinculacaoProcessoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeVinculacaoProcesso> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_vinculacao_processo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeVinculacaoProcesso, response)[0])
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

        return this.modelService.get('modalidade_vinculacao_processo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeVinculacaoProcesso, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_vinculacao_processo', new HttpParams({fromObject: params}));
    }

    save(modalidadeVinculacaoProcesso: ModalidadeVinculacaoProcesso, context: any = '{}'): Observable<ModalidadeVinculacaoProcesso> {
        const params = {};
        params['context'] = context;
        if (modalidadeVinculacaoProcesso.id) {
            return this.modelService.put('modalidade_vinculacao_processo', modalidadeVinculacaoProcesso.id, classToPlain(modalidadeVinculacaoProcesso), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeVinculacaoProcesso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeVinculacaoProcesso(), {...modalidadeVinculacaoProcesso, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_vinculacao_processo', classToPlain(modalidadeVinculacaoProcesso), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeVinculacaoProcesso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeVinculacaoProcesso(), {...modalidadeVinculacaoProcesso, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeVinculacaoProcesso> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_vinculacao_processo', id, new HttpParams({fromObject: params}));
    }
}

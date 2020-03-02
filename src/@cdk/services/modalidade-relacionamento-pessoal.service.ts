import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeRelacionamentoPessoal} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeRelacionamentoPessoalService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeRelacionamentoPessoal> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_relacionamento_pessoal', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeRelacionamentoPessoal, response)[0])
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

        return this.modelService.get('modalidade_relacionamento_pessoal', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeRelacionamentoPessoal, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_relacionamento_pessoal', new HttpParams({fromObject: params}));
    }

    save(modalidadeRelacionamentoPessoal: ModalidadeRelacionamentoPessoal, context: any = '{}'): Observable<ModalidadeRelacionamentoPessoal> {
        const params = {};
        params['context'] = context;
        if (modalidadeRelacionamentoPessoal.id) {
            return this.modelService.put('modalidade_relacionamento_pessoal', modalidadeRelacionamentoPessoal.id, classToPlain(modalidadeRelacionamentoPessoal), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeRelacionamentoPessoal, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeRelacionamentoPessoal(), {...modalidadeRelacionamentoPessoal, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_relacionamento_pessoal', classToPlain(modalidadeRelacionamentoPessoal), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeRelacionamentoPessoal, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeRelacionamentoPessoal(), {...modalidadeRelacionamentoPessoal, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeRelacionamentoPessoal> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_relacionamento_pessoal', id, new HttpParams({fromObject: params}));
    }
}

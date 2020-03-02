import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeGeneroPessoa} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeGeneroPessoaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeGeneroPessoa> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_genero_pessoa', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeGeneroPessoa, response)[0])
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

        return this.modelService.get('modalidade_genero_pessoa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeGeneroPessoa, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_genero_pessoa', new HttpParams({fromObject: params}));
    }

    save(modalidadeGeneroPessoa: ModalidadeGeneroPessoa, context: any = '{}'): Observable<ModalidadeGeneroPessoa> {
        const params = {};
        params['context'] = context;
        if (modalidadeGeneroPessoa.id) {
            return this.modelService.put('modalidade_genero_pessoa', modalidadeGeneroPessoa.id, classToPlain(modalidadeGeneroPessoa), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeGeneroPessoa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeGeneroPessoa(), {...modalidadeGeneroPessoa, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_genero_pessoa', classToPlain(modalidadeGeneroPessoa), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeGeneroPessoa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeGeneroPessoa(), {...modalidadeGeneroPessoa, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeGeneroPessoa> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_genero_pessoa', id, new HttpParams({fromObject: params}));
    }
}

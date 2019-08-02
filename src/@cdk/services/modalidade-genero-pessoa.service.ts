import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeGeneroPessoa} from '@cdk/models/modalidade-genero-pessoa.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeGeneroPessoaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeGeneroPessoa> {
        return this.modelService.getOne('modalidade_genero_pessoa', id)
            .pipe(
                map(response => plainToClass(ModalidadeGeneroPessoa, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_genero_pessoa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeGeneroPessoa, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_genero_pessoa', new HttpParams({fromObject: params}));
    }

    save(modalidadeGeneroPessoa: ModalidadeGeneroPessoa): Observable<ModalidadeGeneroPessoa> {
        if (modalidadeGeneroPessoa.id) {
            return this.modelService.put('modalidade_genero_pessoa', modalidadeGeneroPessoa.id, classToPlain(modalidadeGeneroPessoa))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeGeneroPessoa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeGeneroPessoa(), {...modalidadeGeneroPessoa, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_genero_pessoa', classToPlain(modalidadeGeneroPessoa))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeGeneroPessoa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeGeneroPessoa(), {...modalidadeGeneroPessoa, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeGeneroPessoa> {
        return this.modelService.delete('modalidade_genero_pessoa', id);
    }
}

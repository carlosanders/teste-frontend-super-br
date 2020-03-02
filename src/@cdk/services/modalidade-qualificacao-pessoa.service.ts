import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeQualificacaoPessoa} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeQualificacaoPessoaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeQualificacaoPessoa> {
        return this.modelService.getOne('modalidade_qualificacao_pessoa', id)
            .pipe(
                map(response => plainToClass(ModalidadeQualificacaoPessoa, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_qualificacao_pessoa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeQualificacaoPessoa, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_qualificacao_pessoa', new HttpParams({fromObject: params}));
    }

    save(modalidadeQualificacaoPessoa: ModalidadeQualificacaoPessoa): Observable<ModalidadeQualificacaoPessoa> {
        if (modalidadeQualificacaoPessoa.id) {
            return this.modelService.put('modalidade_qualificacao_pessoa', modalidadeQualificacaoPessoa.id, classToPlain(modalidadeQualificacaoPessoa))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeQualificacaoPessoa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeQualificacaoPessoa(), {...modalidadeQualificacaoPessoa, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_qualificacao_pessoa', classToPlain(modalidadeQualificacaoPessoa))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeQualificacaoPessoa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeQualificacaoPessoa(), {...modalidadeQualificacaoPessoa, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeQualificacaoPessoa> {
        return this.modelService.delete('modalidade_qualificacao_pessoa', id);
    }
}

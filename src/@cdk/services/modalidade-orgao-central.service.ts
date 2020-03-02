import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeOrgaoCentral} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeOrgaoCentralService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeOrgaoCentral> {
        return this.modelService.getOne('modalidade_orgao_central', id)
            .pipe(
                map(response => plainToClass(ModalidadeOrgaoCentral, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_orgao_central', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeOrgaoCentral, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_orgao_central', new HttpParams({fromObject: params}));
    }

    save(modalidadeOrgaoCentral: ModalidadeOrgaoCentral): Observable<ModalidadeOrgaoCentral> {
        if (modalidadeOrgaoCentral.id) {
            return this.modelService.put('modalidade_orgao_central', modalidadeOrgaoCentral.id, classToPlain(modalidadeOrgaoCentral))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeOrgaoCentral, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeOrgaoCentral(), {...modalidadeOrgaoCentral, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_orgao_central', classToPlain(modalidadeOrgaoCentral))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeOrgaoCentral, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeOrgaoCentral(), {...modalidadeOrgaoCentral, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeOrgaoCentral> {
        return this.modelService.delete('modalidade_orgao_central', id);
    }
}

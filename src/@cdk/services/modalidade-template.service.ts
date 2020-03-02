import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeTemplate} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeTemplateService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeTemplate> {
        return this.modelService.getOne('modalidade_template', id)
            .pipe(
                map(response => plainToClass(ModalidadeTemplate, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_template', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeTemplate, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_template', new HttpParams({fromObject: params}));
    }

    save(modalidadeTemplate: ModalidadeTemplate): Observable<ModalidadeTemplate> {
        if (modalidadeTemplate.id) {
            return this.modelService.put('modalidade_template', modalidadeTemplate.id, classToPlain(modalidadeTemplate))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeTemplate, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeTemplate(), {...modalidadeTemplate, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_template', classToPlain(modalidadeTemplate))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeTemplate, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeTemplate(), {...modalidadeTemplate, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeTemplate> {
        return this.modelService.delete('modalidade_template', id);
    }
}

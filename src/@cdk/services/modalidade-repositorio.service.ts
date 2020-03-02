import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeRepositorio} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeRepositorioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeRepositorio> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_repositorio', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeRepositorio, response)[0])
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

        return this.modelService.get('modalidade_repositorio', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeRepositorio, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_repositorio', new HttpParams({fromObject: params}));
    }

    save(modalidadeRepositorio: ModalidadeRepositorio, context: any = '{}'): Observable<ModalidadeRepositorio> {
        const params = {};
        params['context'] = context;
        if (modalidadeRepositorio.id) {
            return this.modelService.put('modalidade_repositorio', modalidadeRepositorio.id, classToPlain(modalidadeRepositorio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeRepositorio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeRepositorio(), {...modalidadeRepositorio, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_repositorio', classToPlain(modalidadeRepositorio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeRepositorio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeRepositorio(), {...modalidadeRepositorio, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeRepositorio> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_repositorio', id, new HttpParams({fromObject: params}));
    }
}

import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoRepositorio} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class VinculacaoRepositorioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<VinculacaoRepositorio> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('vinculacao_repositorio', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(VinculacaoRepositorio, response)[0])
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

        return this.modelService.get('vinculacao_repositorio', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(VinculacaoRepositorio, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('vinculacao_repositorio', new HttpParams({fromObject: params}));
    }

    save(vinculacaoRepositorio: VinculacaoRepositorio, context: any = '{}'): Observable<VinculacaoRepositorio> {
        const params = {};
        params['context'] = context;
        if (vinculacaoRepositorio.id) {
            return this.modelService.put('vinculacao_repositorio', vinculacaoRepositorio.id, classToPlain(vinculacaoRepositorio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoRepositorio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoRepositorio(), {...vinculacaoRepositorio, ...response});
                    })
                );
        } else {
            return this.modelService.post('vinculacao_repositorio', classToPlain(vinculacaoRepositorio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoRepositorio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoRepositorio(), {...vinculacaoRepositorio, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<VinculacaoRepositorio> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('vinculacao_repositorio', id, new HttpParams({fromObject: params}));
    }
}

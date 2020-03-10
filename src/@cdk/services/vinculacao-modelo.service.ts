import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoModelo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class VinculacaoModeloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<VinculacaoModelo> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('vinculacao_modelo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(VinculacaoModelo, response)[0])
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

        return this.modelService.get('vinculacao_modelo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(VinculacaoModelo, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('vinculacao_modelo', new HttpParams({fromObject: params}));
    }

    save(vinculacaoModelo: VinculacaoModelo, context: any = '{}'): Observable<VinculacaoModelo> {
        const params = {};
        params['context'] = context;
        if (vinculacaoModelo.id) {
            return this.modelService.put('vinculacao_modelo', vinculacaoModelo.id, classToPlain(vinculacaoModelo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoModelo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoModelo(), {...vinculacaoModelo, ...response});
                    })
                );
        } else {
            return this.modelService.post('vinculacao_modelo', classToPlain(vinculacaoModelo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoModelo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoModelo(), {...vinculacaoModelo, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<VinculacaoModelo> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('vinculacao_modelo', id, new HttpParams({fromObject: params}));
    }
}

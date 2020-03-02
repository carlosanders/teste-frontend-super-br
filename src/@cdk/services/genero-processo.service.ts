import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroProcesso} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class GeneroProcessoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<GeneroProcesso> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('genero_processo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(GeneroProcesso, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('genero_processo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroProcesso, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('genero_processo', new HttpParams({fromObject: params}));
    }

    save(generoProcesso: GeneroProcesso, context: any = {}): Observable<GeneroProcesso> {
        const params = {};
        params['context'] = context;
        if (generoProcesso.id) {
            return this.modelService.put('genero_processo', generoProcesso.id, classToPlain(generoProcesso), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroProcesso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroProcesso(), {...generoProcesso, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_processo', classToPlain(generoProcesso), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroProcesso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroProcesso(), {...generoProcesso, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<GeneroProcesso> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('genero_processo', id, new HttpParams({fromObject: params}));
    }
}

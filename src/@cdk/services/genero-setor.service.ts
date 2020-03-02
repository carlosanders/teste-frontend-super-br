import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroSetor} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class GeneroSetorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<GeneroSetor> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('genero_setor', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(GeneroSetor, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('genero_setor', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroSetor, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('genero_setor', new HttpParams({fromObject: params}));
    }

    save(generoSetor: GeneroSetor, context: any = {}): Observable<GeneroSetor> {
        const params = {};
        params['context'] = context;
        if (generoSetor.id) {
            return this.modelService.put('genero_setor', generoSetor.id, classToPlain(generoSetor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroSetor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroSetor(), {...generoSetor, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_setor', classToPlain(generoSetor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroSetor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroSetor(), {...generoSetor, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<GeneroSetor> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('genero_setor', id, new HttpParams({fromObject: params}));
    }
}

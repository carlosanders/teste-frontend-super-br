import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroSetor} from '@cdk/models/genero-setor.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class GeneroSetorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<GeneroSetor> {
        return this.modelService.getOne('genero_setor', id)
            .pipe(
                map(response => plainToClass(GeneroSetor, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('genero_setor', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroSetor, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('genero_setor', new HttpParams({fromObject: params}));
    }

    save(generoSetor: GeneroSetor): Observable<GeneroSetor> {
        if (generoSetor.id) {
            return this.modelService.put('genero_setor', generoSetor.id, classToPlain(generoSetor))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroSetor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroSetor(), {...generoSetor, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_setor', classToPlain(generoSetor))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroSetor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroSetor(), {...generoSetor, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<GeneroSetor> {
        return this.modelService.delete('genero_setor', id);
    }
}

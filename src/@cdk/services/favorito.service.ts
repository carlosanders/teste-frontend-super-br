import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Favorito} from '@cdk/models/favorito.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class FavoritoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Favorito> {
        return this.modelService.getOne('favorito', id)
            .map(response => plainToClass(Favorito, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('favorito', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Favorito, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('favorito', new HttpParams({fromObject: params}));
    }

    save(favorito: Favorito): Observable<Favorito> {
        if (favorito.id) {
            return this.modelService.put('favorito', favorito.id, classToPlain(favorito))
                .map(response => {
                    response = plainToClass(Favorito, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Favorito(), {...favorito, ...response});
                });
        } else {
            return this.modelService.post('favorito', classToPlain(favorito))
                .map(response => {
                    response = plainToClass(Favorito, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Favorito(), {...favorito, ...response});
                });
        }
    }

    destroy(id: number): Observable<Favorito> {
        return this.modelService.delete('favorito', id);
    }
}

import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Repositorio} from '@cdk/models/repositorio.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class RepositorioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Repositorio> {
        return this.modelService.getOne('repositorio', id)
            .pipe(
                map(response => plainToClass(Repositorio, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('repositorio', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Repositorio, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('repositorio', new HttpParams({fromObject: params}));
    }

    save(repositorio: Repositorio): Observable<Repositorio> {
        if (repositorio.id) {
            return this.modelService.put('repositorio', repositorio.id, classToPlain(repositorio))
                .pipe(
                    map(response => {
                        response = plainToClass(Repositorio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Repositorio(), {...repositorio, ...response});
                    })
                );
        } else {
            return this.modelService.post('repositorio', classToPlain(repositorio))
                .pipe(
                    map(response => {
                        response = plainToClass(Repositorio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Repositorio(), {...repositorio, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Repositorio> {
        return this.modelService.delete('repositorio', id);
    }
}

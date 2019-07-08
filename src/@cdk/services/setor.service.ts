import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Setor} from '@cdk/models/setor.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class SetorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Setor> {
        return this.modelService.getOne('setor', id)
            .pipe(
                map(response => plainToClass(Setor, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('setor', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Setor, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('setor', new HttpParams({fromObject: params}));
    }

    save(setor: Setor): Observable<Setor> {
        if (setor.id) {
            return this.modelService.put('setor', setor.id, classToPlain(setor))
                .pipe(
                    map(response => {
                        response = plainToClass(Setor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Setor(), {...setor, ...response});
                    })
                );
        } else {
            return this.modelService.post('setor', classToPlain(setor))
                .pipe(
                    map(response => {
                        response = plainToClass(Setor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Setor(), {...setor, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Setor> {
        return this.modelService.delete('setor', id);
    }
}

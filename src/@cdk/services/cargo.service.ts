import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Cargo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class CargoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Cargo> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('cargo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Cargo, response)[0])
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

        return this.modelService.get('cargo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Cargo, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('cargo', new HttpParams({fromObject: params}));
    }

    save(cargo: Cargo, context: any = '{}'): Observable<Cargo> {
        const params = {};
        params['context'] = context;
        if (cargo.id) {
            return this.modelService.put('cargo', cargo.id, classToPlain(cargo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Cargo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Cargo(), {...cargo, ...response});
                    })
                );
        } else {
            return this.modelService.post('cargo', classToPlain(cargo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Cargo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Cargo(), {...cargo, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Cargo> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('cargo', id, new HttpParams({fromObject: params}));
    }
}

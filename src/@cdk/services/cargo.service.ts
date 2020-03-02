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

    get(id: number): Observable<Cargo> {
        return this.modelService.getOne('cargo', id)
            .pipe(
                map(response => plainToClass(Cargo, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('cargo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Cargo, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('cargo', new HttpParams({fromObject: params}));
    }

    save(cargo: Cargo): Observable<Cargo> {
        if (cargo.id) {
            return this.modelService.put('cargo', cargo.id, classToPlain(cargo))
                .pipe(
                    map(response => {
                        response = plainToClass(Cargo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Cargo(), {...cargo, ...response});
                    })
                );
        } else {
            return this.modelService.post('cargo', classToPlain(cargo))
                .pipe(
                    map(response => {
                        response = plainToClass(Cargo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Cargo(), {...cargo, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Cargo> {
        return this.modelService.delete('cargo', id);
    }
}

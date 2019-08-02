import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Localizador} from '@cdk/models/localizador.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class LocalizadorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Localizador> {
        return this.modelService.getOne('localizador', id)
            .pipe(
                map(response => plainToClass(Localizador, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('localizador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Localizador, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('localizador', new HttpParams({fromObject: params}));
    }

    save(localizador: Localizador): Observable<Localizador> {
        if (localizador.id) {
            return this.modelService.put('localizador', localizador.id, classToPlain(localizador))
                .pipe(
                    map(response => {
                        response = plainToClass(Localizador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Localizador(), {...localizador, ...response});
                    })
                );
        } else {
            return this.modelService.post('localizador', classToPlain(localizador))
                .pipe(
                    map(response => {
                        response = plainToClass(Localizador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Localizador(), {...localizador, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Localizador> {
        return this.modelService.delete('localizador', id);
    }
}

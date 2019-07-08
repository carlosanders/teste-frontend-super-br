import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Colaborador} from '@cdk/models/colaborador.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ColaboradorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Colaborador> {
        return this.modelService.getOne('colaborador', id)
            .pipe(
                map(response => plainToClass(Colaborador, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('colaborador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Colaborador, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('colaborador', new HttpParams({fromObject: params}));
    }

    save(colaborador: Colaborador): Observable<Colaborador> {
        if (colaborador.id) {
            return this.modelService.put('colaborador', colaborador.id, classToPlain(colaborador))
                .pipe(
                    map(response => {
                        response = plainToClass(Colaborador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Colaborador(), {...colaborador, ...response});
                    })
                );
        } else {
            return this.modelService.post('colaborador', classToPlain(colaborador))
                .pipe(
                    map(response => {
                        response = plainToClass(Colaborador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Colaborador(), {...colaborador, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Colaborador> {
        return this.modelService.delete('colaborador', id);
    }
}

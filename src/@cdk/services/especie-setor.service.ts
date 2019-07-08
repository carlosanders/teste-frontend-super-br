import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspecieSetor} from '@cdk/models/especie-setor.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class EspecieSetorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<EspecieSetor> {
        return this.modelService.getOne('especie_setor', id)
            .pipe(
                map(response => plainToClass(EspecieSetor, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('especie_setor', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieSetor, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('especie_setor', new HttpParams({fromObject: params}));
    }

    save(especieSetor: EspecieSetor): Observable<EspecieSetor> {
        if (especieSetor.id) {
            return this.modelService.put('especie_setor', especieSetor.id, classToPlain(especieSetor))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieSetor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieSetor(), {...especieSetor, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_setor', classToPlain(especieSetor))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieSetor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieSetor(), {...especieSetor, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<EspecieSetor> {
        return this.modelService.delete('especie_setor', id);
    }
}

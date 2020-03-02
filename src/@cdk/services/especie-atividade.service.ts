import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspecieAtividade} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class EspecieAtividadeService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<EspecieAtividade> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('especie_atividade', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(EspecieAtividade, response)[0])
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

        return this.modelService.get('especie_atividade', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieAtividade, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('especie_atividade', new HttpParams({fromObject: params}));
    }

    save(especieAtividade: EspecieAtividade, context: any = {}): Observable<EspecieAtividade> {
        const params = {};
        params['context'] = context;
        if (especieAtividade.id) {
            return this.modelService.put('especie_atividade', especieAtividade.id, classToPlain(especieAtividade), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieAtividade, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieAtividade(), {...especieAtividade, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_atividade', classToPlain(especieAtividade), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieAtividade, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieAtividade(), {...especieAtividade, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<EspecieAtividade> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('especie_atividade', id, new HttpParams({fromObject: params}));
    }
}

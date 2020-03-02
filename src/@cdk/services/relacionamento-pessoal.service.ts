import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RelacionamentoPessoal} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class RelacionamentoPessoalService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<RelacionamentoPessoal> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('relacionamento_pessoal', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(RelacionamentoPessoal, response)[0])
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

        return this.modelService.get('relacionamento_pessoal', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(RelacionamentoPessoal, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('relacionamento_pessoal', new HttpParams({fromObject: params}));
    }

    save(relacionamentoPessoal: RelacionamentoPessoal, context: any = '{}'): Observable<RelacionamentoPessoal> {
        const params = {};
        params['context'] = context;
        if (relacionamentoPessoal.id) {
            return this.modelService.put('relacionamento_pessoal', relacionamentoPessoal.id, classToPlain(relacionamentoPessoal), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(RelacionamentoPessoal, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new RelacionamentoPessoal(), {...relacionamentoPessoal, ...response});
                    })
                );
        } else {
            return this.modelService.post('relacionamento_pessoal', classToPlain(relacionamentoPessoal), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(RelacionamentoPessoal, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new RelacionamentoPessoal(), {...relacionamentoPessoal, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<RelacionamentoPessoal> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('relacionamento_pessoal', id, new HttpParams({fromObject: params}));
    }
}

import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RelacionamentoPessoal} from '@cdk/models/relacionamento-pessoal.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class RelacionamentoPessoalService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<RelacionamentoPessoal> {
        return this.modelService.getOne('relacionamento_pessoal', id)
            .pipe(
                map(response => plainToClass(RelacionamentoPessoal, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('relacionamento_pessoal', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(RelacionamentoPessoal, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('relacionamento_pessoal', new HttpParams({fromObject: params}));
    }

    save(relacionamentoPessoal: RelacionamentoPessoal): Observable<RelacionamentoPessoal> {
        if (relacionamentoPessoal.id) {
            return this.modelService.put('relacionamento_pessoal', relacionamentoPessoal.id, classToPlain(relacionamentoPessoal))
                .pipe(
                    map(response => {
                        response = plainToClass(RelacionamentoPessoal, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new RelacionamentoPessoal(), {...relacionamentoPessoal, ...response});
                    })
                );
        } else {
            return this.modelService.post('relacionamento_pessoal', classToPlain(relacionamentoPessoal))
                .pipe(
                    map(response => {
                        response = plainToClass(RelacionamentoPessoal, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new RelacionamentoPessoal(), {...relacionamentoPessoal, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<RelacionamentoPessoal> {
        return this.modelService.delete('relacionamento_pessoal', id);
    }
}

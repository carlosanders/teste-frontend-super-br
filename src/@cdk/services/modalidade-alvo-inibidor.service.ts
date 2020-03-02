import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeAlvoInibidor} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeAlvoInibidorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<ModalidadeAlvoInibidor> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_alvo_inibidor', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeAlvoInibidor, response)[0])
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

        return this.modelService.get('modalidade_alvo_inibidor', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeAlvoInibidor, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_alvo_inibidor', new HttpParams({fromObject: params}));
    }

    save(modalidadeAlvoInibidor: ModalidadeAlvoInibidor, context: any = {}): Observable<ModalidadeAlvoInibidor> {
        const params = {};
        params['context'] = context;
        if (modalidadeAlvoInibidor.id) {
            return this.modelService.put('modalidade_alvo_inibidor', modalidadeAlvoInibidor.id, classToPlain(modalidadeAlvoInibidor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeAlvoInibidor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeAlvoInibidor(), {...modalidadeAlvoInibidor, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_alvo_inibidor', classToPlain(modalidadeAlvoInibidor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeAlvoInibidor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeAlvoInibidor(), {...modalidadeAlvoInibidor, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<ModalidadeAlvoInibidor> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_alvo_inibidor', id, new HttpParams({fromObject: params}));
    }
}

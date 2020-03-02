import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeTipoInibidor} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeTipoInibidorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<ModalidadeTipoInibidor> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_tipo_inibidor', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeTipoInibidor, response)[0])
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

        return this.modelService.get('modalidade_tipo_inibidor', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeTipoInibidor, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_tipo_inibidor', new HttpParams({fromObject: params}));
    }

    save(modalidadeTipoInibidor: ModalidadeTipoInibidor, context: any = {}): Observable<ModalidadeTipoInibidor> {
        const params = {};
        params['context'] = context;
        if (modalidadeTipoInibidor.id) {
            return this.modelService.put('modalidade_tipo_inibidor', modalidadeTipoInibidor.id, classToPlain(modalidadeTipoInibidor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeTipoInibidor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeTipoInibidor(), {...modalidadeTipoInibidor, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_tipo_inibidor', classToPlain(modalidadeTipoInibidor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeTipoInibidor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeTipoInibidor(), {...modalidadeTipoInibidor, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<ModalidadeTipoInibidor> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_tipo_inibidor', id, new HttpParams({fromObject: params}));
    }
}

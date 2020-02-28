import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoProcesso} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class VinculacaoProcessoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<VinculacaoProcesso> {
        return this.modelService.getOne('vinculacao_processo', id)
            .pipe(
                map(response => plainToClass(VinculacaoProcesso, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('vinculacao_processo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(VinculacaoProcesso, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('vinculacao_processo', new HttpParams({fromObject: params}));
    }

    save(vinculacaoProcesso: VinculacaoProcesso): Observable<VinculacaoProcesso> {
        if (vinculacaoProcesso.id) {
            return this.modelService.put('vinculacao_processo', vinculacaoProcesso.id, classToPlain(vinculacaoProcesso))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoProcesso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoProcesso(), {...vinculacaoProcesso, ...response});
                    })
                );
        } else {
            return this.modelService.post('vinculacao_processo', classToPlain(vinculacaoProcesso))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoProcesso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoProcesso(), {...vinculacaoProcesso, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<VinculacaoProcesso> {
        return this.modelService.delete('vinculacao_processo', id);
    }
}

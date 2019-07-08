import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoDocumento} from '@cdk/models/vinculacao-documento.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class VinculacaoDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<VinculacaoDocumento> {
        return this.modelService.getOne('vinculacao_documento', id)
            .pipe(
                map(response => plainToClass(VinculacaoDocumento, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('vinculacao_documento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(VinculacaoDocumento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('vinculacao_documento', new HttpParams({fromObject: params}));
    }

    save(vinculacaoDocumento: VinculacaoDocumento): Observable<VinculacaoDocumento> {
        if (vinculacaoDocumento.id) {
            return this.modelService.put('vinculacao_documento', vinculacaoDocumento.id, classToPlain(vinculacaoDocumento))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoDocumento(), {...vinculacaoDocumento, ...response});
                    })
                );
        } else {
            return this.modelService.post('vinculacao_documento', classToPlain(vinculacaoDocumento))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoDocumento(), {...vinculacaoDocumento, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<VinculacaoDocumento> {
        return this.modelService.delete('vinculacao_documento', id);
    }
}

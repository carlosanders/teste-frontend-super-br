import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GarantiaAdministrativo} from '@cdk/models/garantia-administrativo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class GarantiaAdministrativoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<GarantiaAdministrativo> {
        return this.modelService.getOne('garantia_administrativo', id)
            .pipe(
                map(response => plainToClass(GarantiaAdministrativo, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('garantia_administrativo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GarantiaAdministrativo, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('garantia_administrativo', new HttpParams({fromObject: params}));
    }

    save(garantiaAdministrativo: GarantiaAdministrativo): Observable<GarantiaAdministrativo> {
        if (garantiaAdministrativo.id) {
            return this.modelService.put('garantia_administrativo', garantiaAdministrativo.id, classToPlain(garantiaAdministrativo))
                .pipe(
                    map(response => {
                        response = plainToClass(GarantiaAdministrativo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GarantiaAdministrativo(), {...garantiaAdministrativo, ...response});
                    })
                );
        } else {
            return this.modelService.post('garantia_administrativo', classToPlain(garantiaAdministrativo))
                .pipe(
                    map(response => {
                        response = plainToClass(GarantiaAdministrativo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GarantiaAdministrativo(), {...garantiaAdministrativo, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<GarantiaAdministrativo> {
        return this.modelService.delete('garantia_administrativo', id);
    }
}

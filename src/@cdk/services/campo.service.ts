import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Campo} from '@cdk/models/campo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class CampoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Campo> {
        return this.modelService.getOne('campo', id)
            .pipe(
                map(response => plainToClass(Campo, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('campo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Campo, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('campo', new HttpParams({fromObject: params}));
    }

    save(campo: Campo): Observable<Campo> {
        if (campo.id) {
            return this.modelService.put('campo', campo.id, classToPlain(campo))
                .pipe(
                    map(response => {
                        response = plainToClass(Campo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Campo(), {...campo, ...response});
                    })
                );
        } else {
            return this.modelService.post('campo', classToPlain(campo))
                .pipe(
                    map(response => {
                        response = plainToClass(Campo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Campo(), {...campo, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Campo> {
        return this.modelService.delete('campo', id);
    }
}

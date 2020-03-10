import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Assunto} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class AssuntoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Assunto> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('assunto', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Assunto, response)[0])
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

        return this.modelService.get('assunto', new HttpParams({fromObject: params}))
            .pipe(
                //tap((response) => {console.log(" ****** AssuntoService response ==> " + JSON.stringify(response) + " ******")}),                
                map(response => new PaginatedResponse(plainToClass(Assunto, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('assunto', new HttpParams({fromObject: params}));
    }

    save(assunto: Assunto, context: any = '{}'): Observable<Assunto> {
        const params = {};
        params['context'] = context;
        if (assunto.id) {
            return this.modelService.put('assunto', assunto.id, classToPlain(assunto), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Assunto, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Assunto(), {...assunto, ...response});
                    })
                );
        } else {
            return this.modelService.post('assunto', classToPlain(assunto), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Assunto, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Assunto(), {...assunto, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Assunto> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('assunto', id, new HttpParams({fromObject: params}));
    }
}

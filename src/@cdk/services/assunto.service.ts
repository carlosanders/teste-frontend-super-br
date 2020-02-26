import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Assunto} from '@cdk/models/assunto.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class AssuntoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Assunto> {
        return this.modelService.getOne('assunto', id)
            .pipe(
                map(response => plainToClass(Assunto, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        //console.log("*** AssuntoServiceParams => " + JSON.stringify(params));
        return this.modelService.get('assunto', new HttpParams({fromObject: params}))
            .pipe(
                //tap((response) => {console.log(" ****** AssuntoService response ==> " + JSON.stringify(response) + " ******")}),                
                map(response => new PaginatedResponse(plainToClass(Assunto, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('assunto', new HttpParams({fromObject: params}));
    }

    save(assunto: Assunto): Observable<Assunto> {
        if (assunto.id) {
            return this.modelService.put('assunto', assunto.id, classToPlain(assunto))
                .pipe(
                    map(response => {
                        response = plainToClass(Assunto, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Assunto(), {...assunto, ...response});
                    })
                );
        } else {
            return this.modelService.post('assunto', classToPlain(assunto))
                .pipe(
                    map(response => {
                        response = plainToClass(Assunto, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Assunto(), {...assunto, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Assunto> {
        return this.modelService.delete('assunto', id);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Endereco} from '@cdk/models/endereco.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {environment} from 'environments/environment';

@Injectable()
export class EnderecoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<Endereco> {
        return this.modelService.getOne('endereco', id)
            .pipe(
                map(response => plainToClass(Endereco, response)[0])
            );
    }

    getFromCorreiosByCep(cep: string): Observable<Endereco>{
        return this.http.get(
            `${environment.api_url}${'endereco'}/${cep}/${'correios'}` + environment.xdebug

        ).pipe(
            map(response => {
                response = plainToClass(Endereco, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Endereco(), {...response});
            }),
        );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('endereco', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Endereco, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('endereco', new HttpParams({fromObject: params}));
    }

    save(endereco: Endereco): Observable<Endereco> {
        if (endereco.id) {
            return this.modelService.put('endereco', endereco.id, classToPlain(endereco))
                .pipe(
                    map(response => {
                        response = plainToClass(Endereco, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Endereco(), {...endereco, ...response});
                    })
                );
        } else {
            return this.modelService.post('endereco', classToPlain(endereco))
                .pipe(
                    map(response => {
                        response = plainToClass(Endereco, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Endereco(), {...endereco, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Endereco> {
        return this.modelService.delete('endereco', id);
    }
}

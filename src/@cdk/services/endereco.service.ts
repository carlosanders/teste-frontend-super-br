import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Endereco} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';

@Injectable()
export class EnderecoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number, context: any = {}): Observable<Endereco> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('endereco', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Endereco, response)[0])
            );
    }

    getFromCorreiosByCep(cep: string, context: any = {}): Observable<Endereco>{
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.get(
            `${environment.api_url}${'endereco'}/${cep}/${'correios'}` + environment.xdebug,
            {params}

        ).pipe(
            map(response => {
                response = plainToClass(Endereco, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Endereco(), {...response});
            }),
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

        return this.modelService.get('endereco', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Endereco, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('endereco', new HttpParams({fromObject: params}));
    }

    save(endereco: Endereco, context: any = {}): Observable<Endereco> {
        const params = {};
        params['context'] = context;
        if (endereco.id) {
            return this.modelService.put('endereco', endereco.id, classToPlain(endereco), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Endereco, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Endereco(), {...endereco, ...response});
                    })
                );
        } else {
            return this.modelService.post('endereco', classToPlain(endereco), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Endereco, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Endereco(), {...endereco, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Endereco> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('endereco', id, new HttpParams({fromObject: params}));
    }
}

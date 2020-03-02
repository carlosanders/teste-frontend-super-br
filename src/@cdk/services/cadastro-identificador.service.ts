import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CadastroIdentificador} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class CadastroIdentificadorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<CadastroIdentificador> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('cadastro_identificador', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(CadastroIdentificador, response)[0])
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

        return this.modelService.get('cadastro_identificador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(CadastroIdentificador, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('cadastro_identificador', new HttpParams({fromObject: params}));
    }

    save(cadastroIdentificador: CadastroIdentificador, context: any = '{}'): Observable<CadastroIdentificador> {
        const params = {};
        params['context'] = context;
        if (cadastroIdentificador.id) {
            return this.modelService.put('cadastro_identificador', cadastroIdentificador.id, classToPlain(cadastroIdentificador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(CadastroIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new CadastroIdentificador(), {...cadastroIdentificador, ...response});
                    })
                );
        } else {
            return this.modelService.post('cadastro_identificador', classToPlain(cadastroIdentificador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(CadastroIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new CadastroIdentificador(), {...cadastroIdentificador, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<CadastroIdentificador> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('cadastro_identificador', id, new HttpParams({fromObject: params}));
    }
}

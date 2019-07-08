import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CadastroIdentificador} from '@cdk/models/cadastro-identificador.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class CadastroIdentificadorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<CadastroIdentificador> {
        return this.modelService.getOne('cadastro_identificador', id)
            .pipe(
                map(response => plainToClass(CadastroIdentificador, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('cadastro_identificador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(CadastroIdentificador, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('cadastro_identificador', new HttpParams({fromObject: params}));
    }

    save(cadastroIdentificador: CadastroIdentificador): Observable<CadastroIdentificador> {
        if (cadastroIdentificador.id) {
            return this.modelService.put('cadastro_identificador', cadastroIdentificador.id, classToPlain(cadastroIdentificador))
                .pipe(
                    map(response => {
                        response = plainToClass(CadastroIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new CadastroIdentificador(), {...cadastroIdentificador, ...response});
                    })
                );
        } else {
            return this.modelService.post('cadastro_identificador', classToPlain(cadastroIdentificador))
                .pipe(
                    map(response => {
                        response = plainToClass(CadastroIdentificador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new CadastroIdentificador(), {...cadastroIdentificador, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<CadastroIdentificador> {
        return this.modelService.delete('cadastro_identificador', id);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Endereco} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class EnderecoService extends ParentGenericService<Endereco> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/endereco', Endereco);
    }

    getFromCorreiosByCep(cep: string, context: any = '{}'): Observable<Endereco> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.get(
            `${environment.api_url}${'administrativo/endereco'}/${cep}/${'correios'}` + environment.xdebug,
            {params}
        ).pipe(
            map((response) => {
                response = plainToClass(Endereco, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Endereco(), {...response});
            }),
        );
    }
}

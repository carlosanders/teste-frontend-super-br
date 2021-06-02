import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Lotacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class LotacaoService extends ParentGenericService<Lotacao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/lotacao', Lotacao);
    }

    patch(lotacao: Lotacao, changes: any): Observable<Lotacao> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/lotacao'}/${lotacao.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(Lotacao, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Lotacao(), {...lotacao, ...response});
            })
        );
    }
}

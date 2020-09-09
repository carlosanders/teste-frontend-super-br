import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class TipoRelatorioService extends ParentGenericService<TipoRelatorio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tipo_relatorio', TipoRelatorio);
    }

    patch(tipoRelatorio: TipoRelatorio, changes: any): Observable<TipoRelatorio> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/tipoRelatorio'}/${tipoRelatorio.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map(response => {
                response = plainToClass(TipoRelatorio, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new TipoRelatorio(), {...tipoRelatorio, ...response});
            })
        );
    }
}
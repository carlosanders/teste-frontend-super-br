import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {TipoDocumento} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class TipoDocumentoService extends ParentGenericService<TipoDocumento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tipo_documento', TipoDocumento);
    }

    patch(tipoDocumento: TipoDocumento, changes: any): Observable<TipoDocumento> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/tipoDocumento'}/${tipoDocumento.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(TipoDocumento, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new TipoDocumento(), {...tipoDocumento, ...response});
            })
        );
    }
}

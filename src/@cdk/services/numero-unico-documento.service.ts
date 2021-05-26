import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NumeroUnicoDocumento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class NumeroUnicoDocumentoService extends ParentGenericService<NumeroUnicoDocumento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/numero_unico_documento', NumeroUnicoDocumento);
    }

    patch(numeroUnicoDocumento: NumeroUnicoDocumento, changes: any): Observable<NumeroUnicoDocumento> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/numero_unico_documento'}/${numeroUnicoDocumento.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(NumeroUnicoDocumento, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new NumeroUnicoDocumento(), {...numeroUnicoDocumento, ...response});
            })
        );
    }
}

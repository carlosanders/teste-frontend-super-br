import {Injectable} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoEtiqueta} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class VinculacaoEtiquetaService extends ParentGenericService<VinculacaoEtiqueta> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'vinculacao_etiqueta', VinculacaoEtiqueta);
    }

    patch(vinculacaoEtiqueta: VinculacaoEtiqueta, changes: any, context: any = '{}'): Observable<VinculacaoEtiqueta> {
        const params = {};
        params['context'] = context;
        return this.modelService.patch('vinculacao_etiqueta', vinculacaoEtiqueta.id, changes, new HttpParams({fromObject: params}))
            .pipe(
                map(response => {
                    response = plainToClass(VinculacaoEtiqueta, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new VinculacaoEtiqueta(), {...vinculacaoEtiqueta, ...response});
                })
            );
    }
}

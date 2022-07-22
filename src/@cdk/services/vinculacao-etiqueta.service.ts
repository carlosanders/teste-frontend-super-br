import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoEtiqueta} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {ParentGenericService} from './parent-generic.service';
import {environment} from 'environments/environment';

@Injectable()
export class VinculacaoEtiquetaService extends ParentGenericService<VinculacaoEtiqueta> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/vinculacao_etiqueta', VinculacaoEtiqueta);
    }

    patch(vinculacaoEtiqueta: VinculacaoEtiqueta, changes: any, context: any = '{}'): Observable<VinculacaoEtiqueta> {
        const params = {};
        params['context'] = context;
        return this.modelService.patch('administrativo/vinculacao_etiqueta', vinculacaoEtiqueta.id, changes, new HttpParams({fromObject: params}))
            .pipe(
                map((response) => {
                    response = plainToClass(VinculacaoEtiqueta, response);
                    Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                    return Object.assign(new VinculacaoEtiqueta(), {...vinculacaoEtiqueta, ...response});
                })
            );
    }

    aprovarSugestao(vinculacaoEtiqueta: VinculacaoEtiqueta, changes: any, populate: any = '[]', context: any = '{}'): Observable<VinculacaoEtiqueta> {
        const params = {};
        params['populate'] = populate;
        params['context'] = context;

        return this.http.patch(
            `${environment.api_url}administrativo/vinculacao_etiqueta/${vinculacaoEtiqueta.id}/aprovar_sugestao` + environment.xdebug,
            JSON.stringify(changes),
            { params }
        ).pipe(
            map((response) => {
                response = plainToClass(VinculacaoEtiqueta, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new VinculacaoEtiqueta(), {...vinculacaoEtiqueta, ...response});
            })
        );
    }
}

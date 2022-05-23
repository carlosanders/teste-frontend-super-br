import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {VinculacaoProcesso} from '@cdk/models';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class VinculacaoProcessoService extends ParentGenericService<VinculacaoProcesso> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/vinculacao_processo', VinculacaoProcesso);
    }

    findAllVinculacoes(processoId: number | string, populate: any = '[]', context: any = '{}'): Observable<any> {
        const params = {};
        params['context'] = context;
        params['populate'] = populate;

        return this.http.get(`${environment.api_url}administrativo/vinculacao_processo/${processoId}/all_vinculacoes` + environment.xdebug, {params: new HttpParams({fromObject: params})});
    }
}

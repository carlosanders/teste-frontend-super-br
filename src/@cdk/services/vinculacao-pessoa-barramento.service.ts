import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from "@cdk/services/parent-generic.service";
import {VinculacaoPessoaBarramento} from "../models/vinculacao-pessoa-barramento";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {PaginatedResponse} from "@cdk/models";
import {environment} from "../../environments/environment";

@Injectable()
export class VinculacaoPessoaBarramentoService extends ParentGenericService<VinculacaoPessoaBarramento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/vinculacao_pessoa_barramento', VinculacaoPessoaBarramento);
    }

    consultaRepositorio(params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}administrativo/vinculacao_pessoa_barramento/consulta_repositorio` + environment.xdebug, {params});
    }

    consultaEstrutura(filters: any = '{}'): Observable<any> {
        let params: any;
        if (filters.nome) {
            params = new HttpParams()
                .set('nome', filters.nome)
                .set('repositorio', filters.filter['idRepositorio'])
                .set('limit', filters.limit)
                .set('offset', filters.offset);
        } else {
            params = new HttpParams()
                .set('repositorio', filters.filter['idRepositorio'])
                .set('limit', filters.limit)
                .set('offset', filters.offset);
        }

        return this.http.get(`${environment.api_url}administrativo/vinculacao_pessoa_barramento/consulta_estrutura` +
            environment.xdebug, { params }  )
            .pipe(
                map(response => new PaginatedResponse(response['entities'], response['total']))
            );
    }
}

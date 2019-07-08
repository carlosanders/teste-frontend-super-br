import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoUsuario} from '@cdk/models/vinculacao-usuario.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class VinculacaoUsuarioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<VinculacaoUsuario> {
        return this.modelService.getOne('vinculacao_usuario', id)
            .pipe(
                map(response => plainToClass(VinculacaoUsuario, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('vinculacao_usuario', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(VinculacaoUsuario, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('vinculacao_usuario', new HttpParams({fromObject: params}));
    }

    save(vinculacaoUsuario: VinculacaoUsuario): Observable<VinculacaoUsuario> {
        if (vinculacaoUsuario.id) {
            return this.modelService.put('vinculacao_usuario', vinculacaoUsuario.id, classToPlain(vinculacaoUsuario))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoUsuario, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoUsuario(), {...vinculacaoUsuario, ...response});
                    })
                );
        } else {
            return this.modelService.post('vinculacao_usuario', classToPlain(vinculacaoUsuario))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoUsuario, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoUsuario(), {...vinculacaoUsuario, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<VinculacaoUsuario> {
        return this.modelService.delete('vinculacao_usuario', id);
    }
}

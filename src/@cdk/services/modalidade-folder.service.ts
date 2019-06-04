import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalidadeFolder} from '@cdk/models/modalidade-folder.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeFolderService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeFolder> {
        return this.modelService.getOne('modalidade_folder', id)
            .map(response => plainToClass(ModalidadeFolder, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_folder', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ModalidadeFolder, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_folder', new HttpParams({fromObject: params}));
    }

    save(modalidadeFolder: ModalidadeFolder): Observable<ModalidadeFolder> {
        if (modalidadeFolder.id) {
            return this.modelService.put('modalidade_folder', modalidadeFolder.id, classToPlain(modalidadeFolder))
                .map(response => {
                    response = plainToClass(ModalidadeFolder, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeFolder(), {...modalidadeFolder, ...response});
                });
        } else {
            return this.modelService.post('modalidade_folder', classToPlain(modalidadeFolder))
                .map(response => {
                    response = plainToClass(ModalidadeFolder, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeFolder(), {...modalidadeFolder, ...response});
                });
        }
    }

    destroy(id: number): Observable<ModalidadeFolder> {
        return this.modelService.delete('modalidade_folder', id);
    }
}

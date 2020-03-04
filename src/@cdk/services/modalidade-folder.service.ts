import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeFolder} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeFolderService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeFolder> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_folder', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeFolder, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('modalidade_folder', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeFolder, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_folder', new HttpParams({fromObject: params}));
    }

    save(modalidadeFolder: ModalidadeFolder, context: any = '{}'): Observable<ModalidadeFolder> {
        const params = {};
        params['context'] = context;
        if (modalidadeFolder.id) {
            return this.modelService.put('modalidade_folder', modalidadeFolder.id, classToPlain(modalidadeFolder), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeFolder, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeFolder(), {...modalidadeFolder, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_folder', classToPlain(modalidadeFolder), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeFolder, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeFolder(), {...modalidadeFolder, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeFolder> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_folder', id, new HttpParams({fromObject: params}));
    }
}

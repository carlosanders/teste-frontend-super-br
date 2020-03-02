import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Folder} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class FolderService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Folder> {
        return this.modelService.getOne('folder', id)
            .pipe(
                map(response => plainToClass(Folder, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('folder', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Folder, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('folder', new HttpParams({fromObject: params}));
    }

    save(folder: Folder): Observable<Folder> {
        if (folder.id) {
            return this.modelService.put('folder', folder.id, classToPlain(folder))
                .pipe(
                    map(response => {
                        response = plainToClass(Folder, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Folder(), {...folder, ...response});
                    })
                );
        } else {
            return this.modelService.post('folder', classToPlain(folder))
                .pipe(
                    map(response => {
                        response = plainToClass(Folder, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Folder(), {...folder, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Folder> {
        return this.modelService.delete('folder', id);
    }
}

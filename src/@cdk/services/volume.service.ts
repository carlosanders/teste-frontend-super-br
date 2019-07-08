import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Volume} from '@cdk/models/volume.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class VolumeService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Volume> {
        return this.modelService.getOne('volume', id)
            .pipe(
                map(response => plainToClass(Volume, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('volume', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Volume, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('volume', new HttpParams({fromObject: params}));
    }

    save(volume: Volume): Observable<Volume> {
        if (volume.id) {
            return this.modelService.put('volume', volume.id, classToPlain(volume))
                .pipe(
                    map(response => {
                        response = plainToClass(Volume, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Volume(), {...volume, ...response});
                    })
                );
        } else {
            return this.modelService.post('volume', classToPlain(volume))
                .pipe(
                    map(response => {
                        response = plainToClass(Volume, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Volume(), {...volume, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Volume> {
        return this.modelService.delete('volume', id);
    }
}

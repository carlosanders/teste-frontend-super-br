import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Template} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class TemplateService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Template> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('template', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Template, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('template', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Template, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('template', new HttpParams({fromObject: params}));
    }

    save(template: Template, context: any = {}): Observable<Template> {
        const params = {};
        params['context'] = context;
        if (template.id) {
            return this.modelService.put('template', template.id, classToPlain(template), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Template, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Template(), {...template, ...response});
                    })
                );
        } else {
            return this.modelService.post('template', classToPlain(template), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Template, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Template(), {...template, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Template> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('template', id, new HttpParams({fromObject: params}));
    }
}

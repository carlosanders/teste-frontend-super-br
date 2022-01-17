import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {Bookmark} from "../models/bookmark.model";

@Injectable()
export class BookmarkService extends ParentGenericService<Bookmark> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/bookmark', Bookmark);
    }
}

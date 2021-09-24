import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from '../store';
import {Documento, Template} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'template-edit',
    templateUrl: './documento-template-edit.component.html',
    styleUrls: ['./documento-template-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoTemplateEditComponent implements OnInit {

    documento$: Observable<Documento>;

    /**
     * @param _store
     * @param _location
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    back(): void {
        this._location.back();
    }

    submit(values): void {

        const template = new Template();

        Object.entries(values).forEach(
            ([key, value]) => {
                template[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveTemplate({
            template: template,
            operacaoId: operacaoId
        }));
    }

}


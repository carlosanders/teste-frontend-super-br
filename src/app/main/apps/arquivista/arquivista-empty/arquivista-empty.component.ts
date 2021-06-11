import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import * as fromStore from 'app/store';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Component({
    selector: 'arquivista-empty',
    templateUrl: './arquivista-empty.component.html',
    styleUrls: ['./arquivista-empty.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaEmptyComponent {

    screen$: Observable<any>;

    /**
     *
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.State>
    ) {

        this.screen$ = this._store.pipe(select(fromStore.getScreenState));
    }
}

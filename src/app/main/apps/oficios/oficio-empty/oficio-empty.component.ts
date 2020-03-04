import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import * as fromStore from 'app/store';
import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Component({
    selector: 'oficio-empty',
    templateUrl: './oficio-empty.component.html',
    styleUrls: ['./oficio-empty.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OficioEmptyComponent {

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

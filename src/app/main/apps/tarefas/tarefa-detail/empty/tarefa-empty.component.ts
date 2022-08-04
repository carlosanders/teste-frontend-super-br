import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import * as fromStore from 'app/store';
import {cdkAnimations} from '@cdk/animations';
import {Store} from '@ngrx/store';

@Component({
    selector: 'tarefa-empty',
    templateUrl: './tarefa-empty.component.html',
    styleUrls: ['./tarefa-empty.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaEmptyComponent {

    /**
     *
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.State>
    ) {}
}

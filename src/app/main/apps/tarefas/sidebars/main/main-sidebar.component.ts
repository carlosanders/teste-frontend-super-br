import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import * as fromStore from 'app/main/apps/tarefas/store';
import {Folder} from '@cdk/models/folder.model';

@Component({
    selector: 'tarefas-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TarefasMainSidebarComponent {

    folders$: Observable<Folder[]>;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.TarefasAppState>
    ) {
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Compose dialog
     */
    create(): void {
        this._store.dispatch(new fromStore.CreateTarefa());
    }

    onDrop($event): void {
        this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: $event[0].data, folder: $event[1]}));
    }
}

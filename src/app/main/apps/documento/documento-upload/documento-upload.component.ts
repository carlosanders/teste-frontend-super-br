import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {TarefaDetailAppState} from 'app/main/apps/tarefas/tarefa-detail/store';
import {Tarefa} from '@cdk/models/tarefa.model';
import * as fromStore from '../../../../store';

@Component({
    selector: 'documento-upload',
    templateUrl: './documento-upload.component.html',
    styleUrls: ['./documento-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentoUploadComponent implements OnInit, OnDestroy {

    tarefa$: Observable<Tarefa>;

    accept = 'application/pdf';

    @ViewChild('ckdUpload', {static: true})
    cdkUpload;

    /**
     *
     * @param _store
     */
    constructor(
        private _store: Store<TarefaDetailAppState>
    ) {
        // this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.cdkUpload.onClick();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    complete(pending: number): void {
        if (pending === 0) {

        }
    }

}

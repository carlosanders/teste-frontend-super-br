import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Folder, Tarefa} from "../../../../@cdk/models";
import {select, Store} from "@ngrx/store";
import * as fromStore from './store';
import {Subject} from "rxjs";
import {distinctUntilChanged, filter, takeUntil} from "rxjs/operators";
import {LoginService} from "../../auth/login/login.service";

@Component({
    selector: 'board-tarefas',
    templateUrl: './board-tarefas.component.html',
    styleUrls: ['./board-tarefas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class BoardTarefasComponent implements OnDestroy{

    private _unsubscribeAll: Subject<any> = new Subject();
    folderList: Folder[] = [];

    constructor(private _store: Store<fromStore.BoardTarefasAppState>,
                private _loginService: LoginService,
                private _changeRef: ChangeDetectorRef)
    {
        this._store
            .pipe(
                select(fromStore.getFolders),
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                filter(
                    folderList => folderList !== undefined
                        && (
                            !folderList.length
                            || folderList.length !== this.folderList.filter(folder => !!folder.id).length
                        )
                )
            )
            .subscribe(folderList => {
                const folderEntrada = new Folder();
                folderEntrada.nome = 'Entrada';
                folderList.splice(0, 0, folderEntrada);
                this.folderList = folderList;
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

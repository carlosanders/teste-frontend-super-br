import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter, Input, OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/tarefas/store';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {ContaEmail} from '@cdk/models';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Folder} from '../../models/folder.model';
import {getRouterState} from '../../../../../store';

@Component({
    selector: 'caixa-email-folder-sidebar',
    templateUrl: './caixa-email-folder-sidebar.component.html',
    styleUrls: ['./caixa-email-folder-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CaixaEmailFolderSidebarComponent implements OnInit, OnChanges, OnDestroy {

    @Output()
    reloadHandler = new EventEmitter();

    @Output()
    changeContaEmailHandler = new EventEmitter<ContaEmail>();

    @Output()
    clickFolderHandler = new EventEmitter<Folder>();

    @Input()
    selectedContaEmail: ContaEmail = null;

    @Input()
    contaEmailList: ContaEmail[] = [];

    @Input()
    folderList: Folder[] = [];

    @Input()
    foldersIsLoading: boolean = null;

    private _unsubscribeAll: Subject<any> = new Subject();
    links: any;
    contaEmailControl: FormControl;
    routerState: any;

    /**
     * @param _store
     * @param _changeDetectorRef
     * @param router
     * @param _snackBar
     * @param _cdkSidebarService
     */
    constructor(private _store: Store<fromStore.TarefasAppState>,
                private _changeDetectorRef: ChangeDetectorRef,
                private router: Router,
                private _snackBar: MatSnackBar,
                private _cdkSidebarService: CdkSidebarService)
    {
        this.contaEmailControl = new FormControl('');
        this.contaEmailControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this._unsubscribeAll)
        ).subscribe(value => {
            if (value && value != this.selectedContaEmail.id) {
                this.changeContaEmailHandler.emit(this.contaEmailList.find(item => item.id === value));
            }
        });

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        const path = 'app/main/apps/tarefas/sidebars/main';
        modulesConfig.forEach((module) => {
            if (module['sidebars'].hasOwnProperty(path)) {
                module['sidebars'][path].forEach((s => this.links.push(s)));
            }
        });
    }

    ngOnChanges(changes: SimpleChanges)
    {
        this._changeDetectorRef.detectChanges();
        if (changes['selectedContaEmail']) {
            this.contaEmailControl.setValue(this.selectedContaEmail?.id);
        }
    }

    ngOnInit(): void
    {
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reload(): void
    {
    }

    isFolderActive(folder: Folder): boolean
    {
        return this.routerState.params['folderHandle'] === folder.uuid;
    }

    fecharSidebar()
    {
        if (!this._cdkSidebarService.getSidebar('folder-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('folder-main-sidebar').close();
        }
    }

    clickFolder(folder: Folder): void
    {
        this.clickFolderHandler.emit(folder);
    }
}

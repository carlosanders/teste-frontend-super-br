import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, of, Subject} from 'rxjs';
import * as fromStore from './store';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {ComponenteDigital, Documento, Usuario} from '@cdk/models';
import {GetDocumento, SetCurrentStep} from '../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, take, takeUntil} from 'rxjs/operators';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {getComponenteDigitalLoading} from "./store";

@Component({
    selector: 'documento-edit-componentes-digitais',
    templateUrl: './documento-edit-componentes-digitais.component.html',
    styleUrls: ['./documento-edit-componentes-digitais.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditComponentesDigitaisComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('ckdUploadComponenteDigital', {static: false})
    cdkUploadComponenteDigital;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    documento$: Observable<Documento>;

    documento: Documento;
    lote: string;
    routerState: any;
    pagination: any;

    _profile: Usuario;

    formComponentesDigitais = false;
    componenteDigital: ComponenteDigital;
    componenteDigital$: Observable<ComponenteDigital>;
    componentesDigitais$: Observable<ComponenteDigital[]>;
    componenteDigitalLoading$: Observable<boolean>;
    deletingComponenteDigitalIds$: Observable<any>;
    deletedComponenteDigitalIds$: Observable<any>;
    paginationComponenteDigital$: Observable<any>;
    componenteDigitalIsSaving$: Observable<boolean>;
    componenteDigitalErrors$: Observable<any>;
    actions: string[] = ['edit', 'view', 'delete'];
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _loginService
     * @param _dynamicService
     * @param _ref
     * @param _matDialog
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditComponentesDigitaisAppState>,
        private _location: Location,
        private _router: Router,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef,
        private _matDialog: MatDialog
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.componentesDigitais$ = this._store.pipe(select(fromStore.getComponentesDigitais));
        this.paginationComponenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigitalPagination));
        this.deletingComponenteDigitalIds$ = this._store.pipe(select(fromStore.getDeletingComponenteDigitalIds));
        this.deletedComponenteDigitalIds$ = this._store.pipe(select(fromStore.getDeletedComponenteDigitalIds));
        this.componenteDigitalLoading$ = this._store.pipe(select(fromStore.getComponenteDigitalLoading));
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.componenteDigitalIsSaving$ = this._store.pipe(select(fromStore.getIsSavingComponenteDigital));
        this.componenteDigitalErrors$ = this._store.pipe(select(fromStore.getErrorsComponenteDigital));

        this._profile = _loginService.getUserProfile();

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.componenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (componenteDigital) => {
                this.componenteDigital = componenteDigital;
            }
        );

        this.documento$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(documento => !!documento)
        ).subscribe((documento) => {
            this.documento = documento;
            if (!documento.minuta) {
                this.actions = ['edit', 'view'];
            } else {
                this.actions = ['edit', 'view', 'delete'];
            }
        });

        this.paginationComponenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {
                this.pagination = pagination;
                this.reloadComponentesDigitais(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });
    }

    ngAfterViewInit(): void {
        const path1 = 'app/main/apps/documento/documento-edit/componentes-digitais';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path1)) {
                module.components[path1].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then( (componentFactory)  => {
                            this.container.createComponent(componentFactory);
                            this._ref.markForCheck();
                        });
                }));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    editComponenteDigital(componenteDigital: any): void {
        this.formComponentesDigitais = true;
        this._store.dispatch(new fromStore.DownloadComponenteDigital({componenteDigitalId: componenteDigital.componenteDigital.id}));
    }

    onCompleteComponenteDigital(componenteDigital: ComponenteDigital): void {
        // this._store.dispatch(new GetDocumento());
        this._store.dispatch(new fromStore.SaveComponenteDigital(componenteDigital));
        this.reloadComponentesDigitais({});
    }

    uploadComponenteDigital(): void {
        this.cdkUploadComponenteDigital.upload();
    }

    deleteComponenteDigital(componenteDigitalId: number, loteId: string = null): void {
        if (this.documento.minuta) {
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.DeleteComponenteDigital({
                componenteDigitalId: componenteDigitalId,
                documento: this.documento,
                operacaoId: operacaoId,
                loteId: loteId,
            }));
        }
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.deleteComponenteDigital(id, this.lote));
    }

    hasChanges(): boolean {
        const editor = window['CKEDITOR'];
        if (editor && editor.instances) {
            for (const editorInstance in editor.instances) {
                if (editor.instances.hasOwnProperty(editorInstance) && editor.instances[editorInstance]) {
                    if (editor.instances[editorInstance].checkDirty()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    podeNavegarDoEditor(): Observable<boolean> {
        if (this.hasChanges()) {
            const confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Confirmação',
                    confirmLabel: 'Sim',
                    cancelLabel: 'Não',
                    message: 'Existem mudanças não salvas no editor que serão perdidas. Deseja continuar?'
                },
                disableClose: false
            });

            return confirmDialogRef.afterClosed();
        } else {
            return of(true);
        }
    }

    viewComponenteDigital(componenteDigital: ComponenteDigital): void {
        if (!componenteDigital.editavel) {
            return this._store.dispatch(new SetCurrentStep({
                id: componenteDigital.id,
                editavel: componenteDigital.editavel && this.documento.minuta
            }));
        }
        this.podeNavegarDoEditor().pipe(take(1)).subscribe((result) => {
            if (result) {
                return this._store.dispatch(new SetCurrentStep({
                    id: componenteDigital.id,
                    editavel: componenteDigital.editavel && this.documento.minuta
                }));
            }
        });
    }

    reloadComponentesDigitais(params): void {
        this._store.dispatch(new fromStore.GetComponentesDigitais({
            ...this.pagination,
            filter: {
                'documento.id': 'eq:' + this.routerState.params.documentoHandle
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: []
        }));
    }

    showGridComponentes(): void {
        this.formComponentesDigitais = !this.formComponentesDigitais;
    }

    submitComponenteDigital(values): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.PatchComponenteDigital({
            operacaoId: operacaoId,
            componenteDigital: this.componenteDigital,
            changes: {
                numeracaoSequencial: values.numeracaoSequencial, fileName: values.fileName,
                softwareCriacao: values.softwareCriacao, versaoSoftwareCriacao: values.versaoSoftwareCriacao
            }
        }));

        this.componenteDigitalIsSaving$.subscribe((next) => {
            if (!next) {
                this.formComponentesDigitais = false;
            }
        });

        this.componenteDigitalErrors$.subscribe((next) => {
            if (next) {
                this.formComponentesDigitais = true;
            }
        });
    }
}

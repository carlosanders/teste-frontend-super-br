import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from '../store';
import * as AssinaturaStore from 'app/store';
import {select, Store} from '@ngrx/store';
import {Assinatura, ComponenteDigital, Documento} from '@cdk/models';
import {filter, take, takeUntil, tap} from 'rxjs/operators';
import {getRouterState} from '../../../../../store';
import {getRepositorioComponenteDigital} from '../../documento-edit/inteligencia/store';
import {getRepositorioComponenteDigital as getRepositorioComponenteDigitalAvulso} from '../../documento-avulso-edit/inteligencia/store/selectors';
import {
    SetQueryRepositorios,
    SetRepositorioComponenteDigital
} from 'app/main/apps/documento/documento-edit/inteligencia/store/actions';
import {
    SetQueryRepositorios as SetQueryRepositoriosAvulso,
    SetRepositorioComponenteDigital as SetRepositorioComponenteDigitalAvulso
} from 'app/main/apps/documento/documento-avulso-edit/inteligencia/store/actions';
import {Pagination} from '@cdk/models/pagination';
import {CdkUtils} from '@cdk/utils';
import * as moment from 'moment';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConflitoVersaoDialogComponent} from './dialog/conflito-versao-dialog.component';
import {CacheGenericUserDataService} from '@cdk/services/cache.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Component({
    selector: 'componente-digital-ckeditor',
    templateUrl: './componente-digital-ckeditor.component.html',
    styleUrls: ['./componente-digital-ckeditor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComponenteDigitalCkeditorComponent implements OnInit, OnDestroy {

    componenteDigital$: Observable<ComponenteDigital>;
    componenteDigital: ComponenteDigital;
    documento$: Observable<Documento>;
    documento: Documento;
    repositorio$: Observable<string>;
    repositorio: string;
    saving$: Observable<boolean>;
    autosaving$: Observable<boolean>;
    loading$: Observable<boolean>;
    saving = false;
    autosaving = false;
    anySaving = false;
    errors$: Observable<any>;
    routerState: any;
    assinandoDocumentosId$: Observable<number[]>;
    btVersoes = true;
    logEntryPagination: Pagination;
    mode = 'documento';
    dialogSub;
    dialogRef: MatDialogRef<ConflitoVersaoDialogComponent>;
    static LocalStorageBackupKey: string = 'componenteDigitalBakcup';
    componenteDigitalReady: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.ComponenteDigitalAppState>,
        private _dialog: MatDialog,
        private _cacheGenericUserDataService: CacheGenericUserDataService,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.saving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.autosaving$ = this._store.pipe(select(fromStore.getIsAutoSaving));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            if (this.routerState.url.indexOf('/documento/') > -1) {
                this.mode = 'documento';
            }

            if (this.routerState.url.indexOf('sidebar:modelo/') > -1) {
                this.mode = 'modelo';
            }

            if (this.routerState.url.indexOf('sidebar:repositorio/') > -1) {
                this.mode = 'repositorio';
            }

            if (this.routerState.url.indexOf('sidebar:template/') > -1) {
                this.mode = 'template';
            }
        });
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        if (this.routerState.url.indexOf('sidebar:oficio') === -1) {
            this.repositorio$ = this._store.pipe(select(getRepositorioComponenteDigital));
        } else if (this.routerState.url.indexOf('sidebar:oficio') !== -1) {
            this.repositorio$ = this._store.pipe(select(getRepositorioComponenteDigitalAvulso));
        }
        this._componenteDigitalService.saving.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((saving) => {
            this.anySaving = saving;
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
            takeUntil(this._unsubscribeAll),
            filter(cd => !!cd)
        ).subscribe((cd) => {
            this._cacheGenericUserDataService
                .get(ComponenteDigitalCkeditorComponent.LocalStorageBackupKey)
                .pipe(
                    takeUntil(this._unsubscribeAll)
                ).subscribe((cachedComponenteDigitalBackupList) => {
                    const componenteDigitalBackupList = cachedComponenteDigitalBackupList || [];
                    const componenteDigitalBackup = componenteDigitalBackupList
                        .find((item) => item.id == cd.id);
                    //first run
                    if (!this.componenteDigital && componenteDigitalBackup && moment(componenteDigitalBackup.atualizadoEm) > cd.atualizadoEm) {
                        this.componenteDigitalReady = false;
                        if (!this.dialogRef) {
                            this.dialogRef = this._dialog.open(ConflitoVersaoDialogComponent, {
                                data: {
                                    componenteDigital: cd,
                                    componenteDigitalBackup: componenteDigitalBackup
                                },
                                hasBackdrop: true,
                                disableClose: true,
                                closeOnNavigation: true,
                            });
                        }

                        this.dialogSub = this.dialogRef.afterClosed()
                            .pipe(
                                tap(
                                    (componenteDigital) => {
                                        if (componenteDigital) {
                                            this.componenteDigital = {...cd, conteudo: componenteDigital.conteudo};
                                            this._componenteDigitalService.trocandoDocumento.next(true);
                                            this.componenteDigitalReady = true;
                                            this.logEntryPagination = new Pagination();
                                            this.logEntryPagination.filter = {
                                                entity: 'SuppCore\\AdministrativoBackend\\Entity\\ComponenteDigital',
                                                target: 'hash',
                                                id: +this.componenteDigital.id
                                            };
                                            this.doSave({
                                                conteudo: componenteDigital.conteudo,
                                                hashAntigo: componenteDigital.hash,
                                                auto: true,
                                            });
                                            this._changeDetectorRef.detectChanges();
                                        }
                                    }
                                ),
                                tap(() => {
                                    if (this.dialogRef) {
                                        this.dialogRef.close();
                                        this.dialogSub.unsubscribe();
                                    }
                                    this.dialogRef = null;
                                }),
                                take(1)
                            ).subscribe();
                    } else {
                        this.componenteDigitalReady = true;
                        if (!this.anySaving && this.componenteDigital && this.componenteDigital.id !== cd.id) {
                            this._componenteDigitalService.trocandoDocumento.next(true);
                        }
                        this.componenteDigital = cd;
                        if (this.componenteDigital) {
                            this.logEntryPagination = new Pagination();
                            this.logEntryPagination.filter = {
                                entity: 'SuppCore\\AdministrativoBackend\\Entity\\ComponenteDigital',
                                target: 'hash',
                                id: + this.componenteDigital.id
                            };
                        }
                    }

                    this._changeDetectorRef.markForCheck();
                });
        });
        this.documento$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(documento => !!documento)
        ).subscribe((documento) => {
            this.documento = documento;
        });

        this.saving$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((saving) => {
            this.saving = saving;
            this._changeDetectorRef.detectChanges();
        });

        this.autosaving$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((saving) => {
            this.autosaving = saving;
            this._changeDetectorRef.detectChanges();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    doClearRepositorio(): void {
        if (this.routerState.url.indexOf('sidebar:oficio') === -1) {
            this._store.dispatch(new SetRepositorioComponenteDigital(''));
        } else {
            this._store.dispatch(new SetRepositorioComponenteDigitalAvulso(''));
        }
    }

    doQuery(query): void {
        if (this.routerState.url.indexOf('sidebar:oficio') === -1) {
            this._store.dispatch(new SetQueryRepositorios({'documento.componentesDigitais.conteudo': query}));
        } else {
            this._store.dispatch(new SetQueryRepositoriosAvulso({'documento.componentesDigitais.conteudo': query}));
        }
    }

    /**
     * @param data
     */
    doSave(data: any): void {
        if (!data.auto) {
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveComponenteDigital({
                operacaoId: operacaoId,
                componenteDigital: this.componenteDigital,
                data: data.conteudo,
                hashAntigo: data.hashAntigo
            }));
        } else {
            this._store.dispatch(new fromStore.AutoSaveComponenteDigital({
                componenteDigital: this.componenteDigital,
                data: data.conteudo,
                hashAntigo: data.hashAntigo
            }));
        }
    }

    /**
     * @param data
     */
    doReverter(data: any): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.RevertComponenteDigital({
            operacaoId: operacaoId,
            componenteDigital: this.componenteDigital,
            hash: data.toString()
        }));
    }

    /**
     * @param data
     */
    doVisualizar(data: any): void {
        this._store.dispatch(new fromStore.VisualizarVersaoComponenteDigital(data.toString()));
    }

    /**
     * @param data
     */
    doComparar(data: any): void {
        this._store.dispatch(new fromStore.CompararVersaoComponenteDigital(data.toString()));
    }

    doAssinarDigitalmente(): void {
        this._store.dispatch(new AssinaturaStore.AssinaDocumento([this.documento.id]));
    }

    doAssinarEletronicamente(plainPassword): void {
        const assinatura = new Assinatura();
        assinatura.componenteDigital = this.componenteDigital;
        assinatura.algoritmoHash = 'A1';
        assinatura.cadeiaCertificadoPEM = 'A1';
        assinatura.cadeiaCertificadoPkiPath = 'A1';
        assinatura.assinatura = 'A1';
        assinatura.plainPassword = plainPassword;
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
            assinatura: assinatura,
            operacaoId: operacaoId,
            documento: this.documento
        }));
    }

    doPdf(): void {
        this._store.dispatch(new fromStore.DownloadAsPdfComponenteDigital());
    }

    doBackupComponenteDigital(componenteDigitalBackup: any): void {
        this._cacheGenericUserDataService
            .get(ComponenteDigitalCkeditorComponent.LocalStorageBackupKey)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cachedComponenteDigitalBackupList: any) => {
                const componenteDigitalBackupList = cachedComponenteDigitalBackupList || [];
                this._cacheGenericUserDataService.set(
                    [
                        ...componenteDigitalBackupList.filter((backup) => backup.id !== componenteDigitalBackup.id),
                        componenteDigitalBackup
                    ],
                    ComponenteDigitalCkeditorComponent.LocalStorageBackupKey,
                    (60*60*24*30) //30 dias
                ).subscribe();
            });
    }
}

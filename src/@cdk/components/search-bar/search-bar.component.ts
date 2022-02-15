import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs/operators';
import {CdkConfigService} from '@cdk/services/config.service';
import {Pagination} from '../../models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkChaveAcessoPluginComponent} from '../chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.component';
import {LoginService} from '../../../app/main/auth/login/login.service';
import {MatDialog} from '../../angular/material';
import {DynamicService} from 'modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {SearchBarService} from './search-bar.service';

@Component({
    selector: 'cdk-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkSearchBarComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('dynamicComponent', {
        static: false,
        read: ViewContainerRef
    }) buscaPersonalizadaContainer: ViewContainerRef;

    @Input()
    processoPagination: Pagination;

    @Output()
    inputText: EventEmitter<any>;

    collapsed: boolean;
    cdkConfig: any;

    form: FormGroup;

    activeCard = 'form';

    searchField = 'NUP';

    searchFieldName = 'NUP';

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param _cdkConfigService
     * @param _formBuilder
     * @param _loginService
     * @param _dialog
     * @param _searchBarService
     * @param _dynamicService
     * @param _changeDetectorRef
     */
    constructor(
        private _cdkConfigService: CdkConfigService,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        private _dialog: MatDialog,
        private _searchBarService: SearchBarService,
        private _dynamicService: DynamicService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.form = this._formBuilder.group({
            processo: [null],
        });

        this.processoPagination = new Pagination();
        this.processoPagination.populate = ['especieProcesso', 'especieProcesso.generoProcesso', 'setorAtual', 'setorAtual.unidade'];

        // Set the defaults
        this.inputText = new EventEmitter();
        this.collapsed = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._cdkConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.cdkConfig = config;
                }
            );

        // Subscribe to searchBar field changes
        this._searchBarService.searchField.pipe(
            takeUntil(this._unsubscribeAll),
            filter(campo => !!campo)
        ).subscribe(
            (campo) => {
                this.searchField = campo;
                this.form.get('processo').reset();
                this._changeDetectorRef.detectChanges();
            }
        );

        // Subscribe to searchBar field changes
        this._searchBarService.searchFieldName.pipe(
            takeUntil(this._unsubscribeAll),
            filter(campo => !!campo)
        ).subscribe(
            (campo) => {
                this.searchFieldName = campo;
                this._changeDetectorRef.detectChanges();
            }
        );

        if (this.form.get('processo')) {
            this.form.get('processo').valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((value) => {
                        if (value && typeof value === 'object') {
                            if (value.visibilidadeExterna || this._loginService.isGranted('ROLE_COLABORADOR')) {
                                this.inputText.emit({id: value.id});
                                return of([]);
                            }

                            const dialogRef = this._dialog.open(CdkChaveAcessoPluginComponent, {
                                width: '600px'
                            });

                            dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
                                this.inputText.emit({id: value.id, chaveAcesso: result});
                                return of([]);
                            });
                        }

                        return of([]);
                    }
                )
            ).subscribe();
        }

        this._searchBarService.setSearchField('NUP');
        this._searchBarService.setSearchFieldName('NUP');
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/search-bar';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.buscaPersonalizadaContainer.createComponent(componentFactory));
                }));
            }
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Collapse
     */
    collapse(): void {
        this.collapsed = true;
    }

    /**
     * Expand
     */
    expand(): void {
        this.collapsed = false;
    }

    checkProcesso(): void {
        const processo = this.form.get('processo').value;
        if (!processo || typeof processo !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }

    selecionaCampo(campo: string, nome: string): void {
        this._searchBarService.setSearchField(campo);
        this._searchBarService.setSearchFieldName(nome);
    }
}

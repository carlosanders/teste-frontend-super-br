import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output, ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkConfigService} from '@cdk/services/config.service';
import {Etiqueta, Pagination} from '../../models';
import {LoginService} from '../../../app/main/auth/login/login.service';
import {MatDialog} from '../../angular/material';
import {SearchBarEtiquetasService} from './search-bar-etiquetas.service';
import {SearchBarEtiquetasFiltro} from './search-bar-etiquetas-filtro';

@Component({
    selector: 'cdk-search-bar-etiquetas',
    templateUrl: './search-bar-etiquetas.component.html',
    styleUrls: ['./search-bar-etiquetas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkSearchBarEtiquetasComponent implements OnInit, OnDestroy {

    @Input()
    etiquetas: Etiqueta[] = [];

    @Input()
    entidades: string;

    @Input()
    arraySearchTypes: SearchBarEtiquetasFiltro[] = [];

    @Output()
    create = new EventEmitter<Etiqueta>();

    @Output()
    delete = new EventEmitter<Etiqueta>();

    @Output()
    changeFilter = new EventEmitter<SearchBarEtiquetasFiltro>();

    vinculacaoEtiquetaPagination: Pagination;
    labelEtiquetasSearch = 'etiquetas';

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param _cdkConfigService
     * @param _dialog
     * @param _searchBarEtiquetasService
     * @param _changeDetectorRef
     */
    constructor(
        private _cdkConfigService: CdkConfigService,
        private _dialog: MatDialog,
        private _searchBarEtiquetasService: SearchBarEtiquetasService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
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
        // Subscribe to searchBar field changes
        this._searchBarEtiquetasService.searchField.pipe(
            takeUntil(this._unsubscribeAll),
            filter(filtro => !!filtro)
        ).subscribe((filtro: SearchBarEtiquetasFiltro) => {
            this.labelEtiquetasSearch = filtro.label;
            this.vinculacaoEtiquetaPagination = filtro.pagination;
            this._changeDetectorRef.detectChanges();
        });

        this._searchBarEtiquetasService.setSearchField(this.arraySearchTypes[0]);
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
     * Recebe informação de etiqueta removida do filtro
     */
    remove(etiqueta: Etiqueta): void {
        this.delete.emit(etiqueta);
    }

    /**
     * Recebe informação de etiqueta adicionada ao filtro
     */
    adiciona(etiqueta: Etiqueta): void {
        this.create.emit(etiqueta);
    }

    /**
     * Informa aos componentes que o filtro foi alterado
     */
    alteraFiltro(filtro: SearchBarEtiquetasFiltro): void {
        this.etiquetas = [];
        this.changeFilter.emit(filtro);
    }

    selecionaCampo(filtro: SearchBarEtiquetasFiltro): void {
        this.alteraFiltro(filtro);
        this._searchBarEtiquetasService.setSearchField(filtro);
    }
}

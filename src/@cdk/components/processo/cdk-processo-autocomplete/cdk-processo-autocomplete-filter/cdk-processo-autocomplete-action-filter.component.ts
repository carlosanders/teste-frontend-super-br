import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter,
    Input, OnInit, Output, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {modulesConfig} from 'modules/modules-config';
import {ProcessoService} from '@cdk/services/processo.service';
import {DynamicService} from 'modules/dynamic.service';
import {Filter, ProcessoAutocompleteActionFilter} from './filters/filter';
import {Subject} from 'rxjs';
import {
    filter,
    takeUntil
} from 'rxjs/operators';
import {Pagination} from "../../../../models";
import {FormGroup} from "@angular/forms";
import {CdkConfigService} from "../../../../services/config.service";
import {SearchBarService} from "../../../search-bar/search-bar.service";

@Component({
    selector: 'cdk-processo-autocomplete-action-filter',
    templateUrl: './cdk-processo-autocomplete-action-filter.component.html',
    styleUrls: ['./cdk-processo-autocomplete-action-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcessoAutocompleteActionFilterComponent implements OnInit, AfterViewInit{
    @ViewChild('dynamicComponent', {
        static: false,
        read: ViewContainerRef
    }) filterContainerContainer: ViewContainerRef;

    @Output() filterChange: EventEmitter<Filter> = new EventEmitter<Filter>();

    @Input() defaultFilters: Filter[] = [
        {field: 'NUP', name: 'NUP'},
        {field: 'outroNumero', name: 'Outro Número'}
    ];

    @Input('filter') setSelectedFilter(filter: Filter): void {
        this._filter = filter;
        this._filterSelectedState.next(this._filter);
    }

    @Input()
    processoPagination: Pagination;

    @Output()
    inputText: EventEmitter<any>;

    collapsed: boolean;
    cdkConfig: any;

    searchField = 'NUP';

    searchFieldName = 'NUP';

    private _filter: Filter;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _filterSelectedState: Subject<Filter> = new Subject<Filter>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _processoService: ProcessoService,
        private _dynamicService: DynamicService,
        private _cdkConfigService: CdkConfigService,
        private _searchBarService: SearchBarService,
    ) {
        this._filterSelectedState
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((filter: Filter) => this.filterChange.emit(filter));
    }

    ngOnInit(): void {
        if (!this._filter) {
            this.setSelectedFilter(this.defaultFilters[0]);
        }

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
                this.filterChange.emit({
                    field: this.searchField,
                    name: campo
                })
                this._changeDetectorRef.detectChanges();
            }
        );

        this._searchBarService.setSearchField('NUP');
        this._searchBarService.setSearchFieldName('NUP');
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/processo/cdk-processo-autocomplete-action-filter';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => {
                            const filterComponent = this.filterContainerContainer.createComponent<ProcessoAutocompleteActionFilter>(componentFactory);

                            filterComponent.instance.filterSelectedState = this._filterSelectedState.asObservable();
                        });
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

    getFilterName(): string {
        return this._filter?.name;
    }

    isFilterSelected(filter: Filter): boolean {
        return this._filter?.field == filter.field;
    }

    selecionaCampo(campo: string, nome: string): void {
        this._searchBarService.setSearchField(campo);
        this._searchBarService.setSearchFieldName(nome);
    }
}

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
    takeUntil
} from 'rxjs/operators';

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

    private _filter: Filter;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _filterSelectedState: Subject<Filter> = new Subject<Filter>();

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _processoService: ProcessoService,
                private _dynamicService: DynamicService) {

        this._filterSelectedState
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((filter: Filter) => this.filterChange.emit(filter));
    }

    ngOnInit(): void {
        if (!this._filter) {
            this.setSelectedFilter(this.defaultFilters[0]);
        }
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/processo/cdk-processo-autocomplete-action-filter';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => {
                            const filterComponent = this.filterContainerContainer.createComponent<ProcessoAutocompleteActionFilter>(componentFactory);

                            filterComponent.instance.onSelected()
                                .pipe( takeUntil(this._unsubscribeAll))
                                .subscribe(this.setSelectedFilter);

                            filterComponent.instance.filterSelectedState = this._filterSelectedState.asObservable();
                        });
                }));
            }
        });
    }

    getFilterName(): string {
        return this._filter?.name;
    }

    isFilterSelected(filter: Filter): boolean {
        return this._filter?.field == filter.field;
    }
}

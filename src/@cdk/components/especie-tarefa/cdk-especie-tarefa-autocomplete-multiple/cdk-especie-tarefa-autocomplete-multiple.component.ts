import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input,
    OnInit, Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {EspecieTarefa, Pagination} from '@cdk/models';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CdkAutocompleteMultipleComponent} from '@cdk/components/autocomplete-multiple/cdk-autocomplete-multiple.component';

@Component({
    selector: 'cdk-especie-tarefa-autocomplete-multiple',
    templateUrl: './cdk-especie-tarefa-autocomplete-multiple.component.html',
    styleUrls: ['./cdk-especie-tarefa-autocomplete-multiple.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'especieTarefaAutocomplete',
})
export class CdkEspecieTarefaAutocompleteMultipleComponent implements OnInit {

    @Input() pagination: Pagination = new Pagination();
    @Input() control: AbstractControl;
    @Input('especieTarefaList') set especieTarefaList(especieTarefaList: EspecieTarefa[]) {
        this._especieTarefaList = especieTarefaList;
        this._especieTarefaListId = this._especieTarefaList.map((especieTarefa: EspecieTarefa) => especieTarefa.id);
    };
    @Input('selectedEspecieTarefaList') set selectedEspecieTarefaList(especieTarefaList: EspecieTarefa[]) {
        this._selectedEspecieTarefaList = especieTarefaList;
        this._selectedEspecieTarefaListId = this._selectedEspecieTarefaList.map((especieTarefa: EspecieTarefa) => especieTarefa.id);
    };
    @Input() especieTarefaListIsLoading: boolean = false;
    @Input() autoclose: boolean = false;
    @Input() displayItemFn: (especieTarefa: EspecieTarefa) => string | '';
    @Input() disableItemFn: (especieTarefa: EspecieTarefa, pagination: Pagination) => boolean | false;
    @Output() valuesChanged: EventEmitter<EspecieTarefa[]> = new EventEmitter<EspecieTarefa[]>();
    @Output() panelState: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild(CdkAutocompleteMultipleComponent, {static: true}) autocomplete: CdkAutocompleteMultipleComponent;
    private _especieTarefaList: EspecieTarefa[] = [];
    private _especieTarefaListId: number[] = [];
    private _selectedEspecieTarefaList: EspecieTarefa[] = [];
    private _selectedEspecieTarefaListId: number[] = [];

    get especieTarefaList(): EspecieTarefa[] {
        return this._especieTarefaList || [];
    }

    get selectedEspecieTarefaList(): EspecieTarefa[] {
        return this._selectedEspecieTarefaList || [];
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _especieTarefaService: EspecieTarefaService) {
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                this.especieTarefaList = [];
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        andxFilter.push({
                            nome: `like:%${bit}%`
                        });
                    });
                    if (this.selectedEspecieTarefaList.length) {
                        andxFilter.push({
                            'id': `notIn:${this._selectedEspecieTarefaListId.join(',')}`
                        });
                    }
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.especieTarefaListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._especieTarefaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate),
                            JSON.stringify(this.pagination['context']))
                            .pipe(
                                finalize(() => this.especieTarefaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.especieTarefaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    panelStateChange(isOpen: boolean): void {
        if (!isOpen) {
            this.especieTarefaList = [];
        }
        this.panelState.emit(isOpen);
    }

    isIndeterminate(): boolean {
        let qtdSelected = this._selectedEspecieTarefaListId.filter((selected) => this._especieTarefaListId.includes(selected)).length;
        return qtdSelected > 0 && qtdSelected < this.especieTarefaList.length;
    }

    isSelected(especieTarefa: EspecieTarefa): boolean {
        return this._selectedEspecieTarefaListId.includes(especieTarefa.id);
    }

    allSelected(): boolean {
        return this._selectedEspecieTarefaListId.filter((selected) => this._especieTarefaListId.includes(selected)).length == this.especieTarefaList.length;
    }

    toggleSelected(): void {
        if (this.allSelected()) {
            this.valuesChanged.emit([]);
        } else {
            this.valuesChanged.emit(
                [
                    ...this.selectedEspecieTarefaList.filter((selected) => !this._especieTarefaListId.includes(selected.id)),
                    ...this.especieTarefaList
                ]
            );
        }
        this.autocomplete.closeDropdown();
    }

    toggleItem(especieTarefa: EspecieTarefa): void {
        if (this._selectedEspecieTarefaListId.includes(especieTarefa.id)) {
            this.valuesChanged.emit([
                ...this.selectedEspecieTarefaList.filter((selected) => especieTarefa.id != selected.id)
            ]);
            return;
        }

        this.valuesChanged.emit([
            ...this.selectedEspecieTarefaList,
            especieTarefa
        ]);
    }
}

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {EspecieTarefa, Pagination} from '@cdk/models';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-especie-tarefa-autocomplete',
    templateUrl: './cdk-especie-tarefa-autocomplete.component.html',
    styleUrls: ['./cdk-especie-tarefa-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'especieTarefaAutocomplete',
})
export class CdkEspecieTarefaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    especieTarefaList: EspecieTarefa[];

    @Input()
    especieTarefaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    isWorkflow = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieTarefaService: EspecieTarefaService
    ) {
        this.especieTarefaList = [];
        this.especieTarefaListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.especieTarefaList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        andxFilter.push({
                            nome: `like:%${bit}%`});
                    });
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
            if (this.pagination['context'] && this.pagination['context'].processoId) {
                this.isWorkflow = true;
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEspecieTarefaFn(especieTarefa): string {
        let displayed = especieTarefa ? TitleCasePipe.format(especieTarefa.nome) : '';
        displayed += (especieTarefa && especieTarefa.generoTarefa) ? (' (' + TitleCasePipe.format(especieTarefa.generoTarefa.nome) + ')') : '';
        return displayed;
    }
}

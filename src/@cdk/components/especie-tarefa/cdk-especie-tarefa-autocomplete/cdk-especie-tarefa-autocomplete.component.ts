import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {EspecieTarefa} from '@cdk/models';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

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

    isWorflow = false;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieTarefaService: EspecieTarefaService
    ) {
        this.especieTarefaList = [];
        this.especieTarefaListIsLoading = false;

        this.pagination = new Pagination();
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
                this.isWorflow = true;
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEspecieTarefaFn(especieTarefa): string {
        let displayed = especieTarefa ? especieTarefa.nome : '';
        displayed += (especieTarefa && especieTarefa.generoTarefa) ? (' (' + especieTarefa.generoTarefa.nome + ')') : '';
        return displayed;
    }
}

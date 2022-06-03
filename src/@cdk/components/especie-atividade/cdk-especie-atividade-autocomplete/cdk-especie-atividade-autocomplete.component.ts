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
import {EspecieAtividade, Pagination} from '@cdk/models';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-especie-atividade-autocomplete',
    templateUrl: './cdk-especie-atividade-autocomplete.component.html',
    styleUrls: ['./cdk-especie-atividade-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'especieAtividadeAutocomplete',
})
export class CdkEspecieAtividadeAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    especieAtividadeList: EspecieAtividade[];

    @Input()
    especieAtividadeListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    isWorkflow = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieAtividadeService: EspecieAtividadeService
    ) {
        this.especieAtividadeList = [];
        this.especieAtividadeListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.especieAtividadeList = [];
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
                        this.especieAtividadeListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._especieAtividadeService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate),
                            JSON.stringify(this.pagination['context']))
                            .pipe(
                                finalize(() => this.especieAtividadeListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.especieAtividadeList = response['entities'];
            if (this.pagination['context'] && this.pagination['context'].tarefaId) {
                this.isWorkflow = true;
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEspecieAtividadeFn(especieAtividade): string {
        let displayed = TitleCasePipe.format(especieAtividade ? especieAtividade.nome : '');
        displayed += (especieAtividade && especieAtividade.generoAtividade) ? (' (' + TitleCasePipe.format(especieAtividade.generoAtividade.nome) + ')') : '';
        return displayed;
    }
}

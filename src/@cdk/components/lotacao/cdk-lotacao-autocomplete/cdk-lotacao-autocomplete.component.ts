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
import {Pagination, Lotacao} from '@cdk/models';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-lotacao-autocomplete',
    templateUrl: './cdk-lotacao-autocomplete.component.html',
    styleUrls: ['./cdk-lotacao-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'lotacaoAutocomplete',
})
export class CdkLotacaoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    mode = 'list';

    @Input()
    lotacaoList: Lotacao[];

    @Input()
    lotacaoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _lotacaoService: LotacaoService
    ) {
        this.lotacaoList = [];
        this.lotacaoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.lotacaoList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && value.length >= 2) {
                        const termFilterNome = [];
                        value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                            const objNome = {
                                'colaborador.usuario.nome': `like:%${bit}%`
                            };
                            termFilterNome.push(objNome);
                        });
                        const termFilter = {
                            'andX': [...termFilterNome]
                        };
                        if (typeof value === 'string' && termFilterNome.length > 0) {
                            this.lotacaoListIsLoading = true;
                            this._changeDetectorRef.detectChanges();
                            const filterParam = {
                                ...this.pagination.filter,
                                ...termFilter
                            };
                            return this._lotacaoService.query(
                                JSON.stringify(filterParam),
                                this.pagination.limit,
                                this.pagination.offset,
                                JSON.stringify(this.pagination.sort),
                                JSON.stringify(this.pagination.populate),
                                JSON.stringify(this.pagination.context))
                                .pipe(
                                    finalize(() => this.lotacaoListIsLoading = false),
                                    catchError(() => of([]))
                                );
                        } else {
                            return of([]);
                        }
                    } else if (!value) {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.lotacaoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayLotacaoFn(lotacao): string {
        let displayed = lotacao ? TitleCasePipe.format(lotacao.colaborador.usuario.nome) : '';
        displayed += (lotacao && lotacao.setor) ? (' - ' + TitleCasePipe.format(lotacao.setor.nome) + '') : '';
        displayed += (lotacao && lotacao.setor && lotacao.setor.unidade) ? (' (' + lotacao.setor.unidade.sigla + ')') : '';
        return displayed;
    }
}

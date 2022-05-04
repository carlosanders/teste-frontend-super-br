import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'cdk-date-filter',
    templateUrl: './cdk-date-filter.component.html',
    styleUrls: ['./cdk-date-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'dateFilter',
})
export class CdkDateFilterComponent implements OnInit, OnChanges {

    @Input()
    campo: string;

    @Input()
    limparForm: Subject<boolean> = new Subject<boolean>();

    @Output()
    filtra = new EventEmitter<any>();

    @Input()
    mode: string = 'period';

    @Input()
    datetime: boolean = false;

    @Input()
    format: string = 'YYYY-MM-DD';

    @Input()
    exibeDatetime: boolean = null;

    @Input()
    interval: string = null;

    form: FormGroup;

    filters: any = [];

    filtroAntes: any = [];

    filtroDepois: any = [];

    filtroEm: any = [];

    minDateDepois: any = null;
    maxDateDepois: any = null;
    minDateAntes: any = null;
    maxDateAntes: any = null;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            checkAntes: [false],
            checkDepois: [false],
            checkEm: [false],
            filterAntes: [{value: null, disabled: true}, [Validators.required]],
            filterDepois: [{value: null, disabled: true}, [Validators.required]],
            filterEm: [{value: null, disabled: true}, [Validators.required]]
        });

        // this.filters = new FormControl({value: []});
    }

    /**
     * OnInit
     */
    ngOnInit(): void {
        this.form.get('checkAntes').valueChanges.subscribe((value) => {
            this.checkAntes(value);
            this._changeDetectorRef.markForCheck();
        });

        this.form.get('checkDepois').valueChanges.subscribe((value) => {
            this.checkDepois(value);
            this._changeDetectorRef.markForCheck();
        });

        this.form.get('checkEm').valueChanges.subscribe((value) => {
            if (value) {
                this.form.get('filterEm').enable({emitEvent: false});
                this.form.get('checkAntes').setValue(false);
                this.form.get('checkDepois').setValue(false);
            } else {
                this.form.get('filterEm').setValue('');
                this.form.get('filterEm').disable({emitEvent: false});
            }
            this._changeDetectorRef.markForCheck();
        });

        this.form.get('filterAntes').valueChanges.subscribe((value) => {
            this.atualizaFiltros();

            this.emite();
        });

        this.form.get('filterDepois').valueChanges.subscribe((value) => {
            this.atualizaFiltros();

            this.emite();
        });

        this.form.get('filterEm').valueChanges.subscribe((value) => {
            this.atualizaFiltros();
            this.emite();
        });

        this.limparForm.subscribe((value) => {
            if (value) {
                this.limpar();
            }
        });
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['mode']) {
            if (this.mode !== 'period') {
                this.form.get('filterAntes').disable({emitEvent: false});
                this.form.get('filterDepois').disable({emitEvent: false});
                this.form.get('filterEm').enable({emitEvent: false});
                this._changeDetectorRef.markForCheck();
            }
        }

        if (changes['interval']) {
            if (this.interval !== null) {
                this.form.get('checkAntes').setValue(true, {emitEvent: false});
                this.checkAntes(true);
            } else {
                this.form.get('checkAntes').setValue(false, {emitEvent: false});
                this.checkAntes(false);
                this.maxDateAntes = null;
                this.minDateDepois = null;
            }
        }

        if (changes['datetime']) {
            if (this.datetime) {
                this.format = 'YYYY-MM-DDTHH:mm:ss';
                if (this.exibeDatetime === null) {
                    this.exibeDatetime = true;
                }
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    checkAntes(valor: boolean): void {
        if (this.interval === null) {
            if (valor) {
                this.form.get('filterAntes').enable({emitEvent: false});
                if (this.form.get('checkEm').value === true) {
                    this.form.get('checkEm').setValue(false);
                }
            } else {
                this.form.get('filterAntes').setValue('');
                this.form.get('filterAntes').disable({emitEvent: false});
            }
        } else {
            if (valor) {
                this.form.get('filterAntes').enable({emitEvent: false});
                this.form.get('checkDepois').setValue(true,{emitEvent: false});
                this.form.get('filterDepois').enable({emitEvent: false});
                if (this.form.get('checkEm').value === true) {
                    this.form.get('checkEm').setValue(false);
                }
            } else {
                this.form.get('filterAntes').setValue('');
                this.form.get('filterAntes').disable({emitEvent: false});
                this.form.get('checkDepois').setValue(false, {emitEvent: false});
                this.form.get('filterDepois').setValue('');
                this.form.get('filterDepois').disable({emitEvent: false});
            }
        }
    }

    checkDepois(valor: boolean): void {
        if (this.interval === null) {
            if (valor) {
                this.form.get('filterDepois').enable({emitEvent: false});
                if (this.form.get('checkEm').value === true) {
                    this.form.get('checkEm').setValue(false);
                }
            } else {
                this.form.get('filterDepois').setValue('');
                this.form.get('filterDepois').disable({emitEvent: false});
            }
        } else {
            if (valor) {
                this.form.get('filterDepois').enable({emitEvent: false});
                this.form.get('checkAntes').setValue(true,{emitEvent: false});
                this.form.get('filterAntes').enable({emitEvent: false});
                if (this.form.get('checkEm').value === true) {
                    this.form.get('checkEm').setValue(false);
                }
            } else {
                this.form.get('filterDepois').setValue('');
                this.form.get('filterDepois').disable({emitEvent: false});
                this.form.get('filterAntes').setValue('');
                this.form.get('filterAntes').disable({emitEvent: false});
                this.form.get('checkAntes').setValue(false, {emitEvent: false});
            }
        }
    }

    atualizaFiltros(): void {
        this.montaFiltroAntes();
        this.montaFiltroDepois();
        this.montaFiltroEm();
    }

    montaFiltro(valor: any, condicao: string, format: string = this.format): any {
        const filters = [];
        if (valor) {
            let data;
            const filtro = {};
            if (this.datetime && !this.exibeDatetime) {
                if (condicao === 'gte') {
                    data = moment(valor).startOf('day');
                } else {
                    data = moment(valor).endOf('day');
                }
            } else {
                data = moment(valor);
            }
            filtro[this.campo] = `${condicao}:${data.format(format)}`;
            filters.push(filtro);
        }
        return filters;
    }

    montaFiltroAntes(): void {
        this.filtroAntes = this.montaFiltro(this.form.get('filterAntes').value, 'lte');
    }

    montaFiltroDepois(): any {
        this.filtroDepois = this.montaFiltro(this.form.get('filterDepois').value, 'gte');
    }

    montaFiltroEm(): any {
        let filters: any;
        if (this.form.get('filterEm').value) {
            if (this.datetime) {
                // Filtro de data exata, com horários, precisa incluir o dia inteiro
                const comecoDia = moment(this.form.get('filterEm').value);
                const fimDia = moment(this.form.get('filterEm').value);
                comecoDia.startOf('day');
                fimDia.endOf('day');
                filters = [];
                const filtroBefore = {};
                filtroBefore[this.campo] = `gte:${comecoDia.format(this.format)}`;
                filters.push(filtroBefore);
                const filtroAfter = {};
                filtroAfter[this.campo] = `lte:${fimDia.format(this.format)}`;
                filters.push(filtroAfter);
            } else {
                // Data sem horas não precisa de um intervalo de horas
                filters = [];
                const filtroEquals = {};
                filtroEquals[this.campo] = `eq:${this.form.get('filterEm').value.format(this.format)}`;
                filters.push(filtroEquals);
            }
        }
        this.filtroEm = filters ?? [];
    }

    alteraDataAntes(event): void {
        if (this.interval !== null) {
            // Adicionar validações de intervalo
            if (this.interval.includes(' ')) {
                const intervalo = this.interval.split(' ');
                const objetoIntervalo = {};
                objetoIntervalo[intervalo[1]] = parseInt(intervalo[0], 10);
                const duration = moment.duration(objetoIntervalo);
                this.minDateDepois = moment(event.value).subtract(duration);
                this.maxDateDepois = moment(event.value);
            } else if (this.interval === 'year') {
                this.minDateDepois = moment(event.value).startOf('year');
                this.maxDateDepois = moment(event.value);
            }
        } else {
            this.minDateDepois = null;
            this.maxDateDepois = null;
        }
    }

    alteraDataDepois(event): void {
        if (this.interval !== null) {
            // Adicionar validações de intervalo
            if (this.interval.includes(' ')) {
                const intervalo = this.interval.split(' ');
                const objetoIntervalo = {};
                objetoIntervalo[intervalo[1]] = parseInt(intervalo[0], 10);
                const duration = moment.duration(objetoIntervalo);
                this.maxDateAntes = moment(event.value).add(duration);
                this.minDateAntes = moment(event.value);
            } else if (this.interval === 'year') {
                this.maxDateAntes = moment(event.value).endOf('year');
                this.minDateAntes = moment(event.value);
            }
        } else {
            this.maxDateAntes = null;
            this.minDateAntes = null;
        }
    }

    emite(): void {
        this.filters = [...this.filtroDepois, ...this.filtroAntes, ...this.filtroEm];
        this.filtra.emit(this.filters);
    }

    limpar(): void {
        this.form.reset({emitEvent: false});
        this.minDateDepois = null;
        this.maxDateDepois = null;
        this.minDateAntes = null;
        this.maxDateAntes = null;
        if (this.interval !== null) {
            this.form.get('checkAntes').setValue(true, {emitEvent: false});
            this.checkAntes(true);
        }
        this.limparForm.next(false);
        this._changeDetectorRef.markForCheck();
    }

}

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    OnChanges,
    Output,
    SimpleChange,
    ViewEncapsulation, OnDestroy
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Cronjob, Pagination} from '@cdk/models';
import {CdkCronjobExpressionParserService} from "../service/cdk-cronjob-expression-parser.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'cdk-cronjob-form',
    templateUrl: './cdk-cronjob-form.component.html',
    styleUrls: ['./cdk-cronjob-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCronjobFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input() cronjob: Cronjob;
    @Input() saving: boolean;
    @Input() errors: any;
    @Input() logEntryPagination: Pagination = new Pagination();
    @Input() form: FormGroup;

    @Output() save: EventEmitter<Cronjob> = new EventEmitter<Cronjob>();
    @Output() abort: EventEmitter<void> = new EventEmitter<void>();

    private _unsubscribeAll: Subject<any> = new Subject();
    activeCard: string = 'form';
    textoPeriodicidade?: string = null;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _cdkCronjobExpressionParserService: CdkCronjobExpressionParserService
    ) {

        this.form = this._formBuilder.group({
            id: new FormControl<number|null>(null),
            nome: new FormControl<string|null>(null, [Validators.maxLength(255), Validators.minLength(3)]),
            descricao: new FormControl<string|null>(null, [Validators.maxLength(255), Validators.minLength(3)]),
            periodicidade: new FormControl<string|null>(null, [Validators.maxLength(255), Validators.minLength(9)]),
            comando: new FormControl<string|null>(null, [Validators.maxLength(255), Validators.minLength(3)]),
            ativo: new FormControl<boolean>(false),
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.form.get('periodicidade')
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => this.checkTextoPeriodicidade(value));
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['cronjob'] && this.cronjob && ((!this.cronjob.id && !this.form.dirty) || (this.cronjob.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.cronjob}, {emitEvent: true});
        }

        if (changes['cronjob']) {
            this.checkTextoPeriodicidade(this.cronjob?.periodicidade ?? this.form.get('periodicidade')?.value);
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({formError: data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({rulesError: this.errors.error.message});
            }
        }

        if (!this.errors) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key).setErrors(null);
            });

            this.form.setErrors(null);
        }

        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }

    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    checkTextoPeriodicidade(expression?: string): void {
        this.textoPeriodicidade = !expression ? null : this._cdkCronjobExpressionParserService.parseExpressionToLiteralString(expression);
    }
}

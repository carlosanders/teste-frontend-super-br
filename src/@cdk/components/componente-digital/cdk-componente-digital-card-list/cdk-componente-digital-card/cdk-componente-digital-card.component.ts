import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    KeyValueDiffers,
    OnChanges,
    Output,
    SimpleChange,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-componente-digital-card',
    templateUrl: './cdk-componente-digital-card.component.html',
    styleUrls: ['./cdk-componente-digital-card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: cdkAnimations
})
export class CdkComponenteDigitalCardComponent implements DoCheck, OnChanges {

    @Input()
    componenteDigital: ComponenteDigital;

    @Input()
    selected = true;

    @Input()
    mode: string;

    @Input()
    uploadMode: string;

    @Input()
    uploading: boolean;

    @Output()
    retry = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    clicked = new EventEmitter<any>();

    @Output()
    changedSelected = new EventEmitter<boolean>();

    form: FormGroup;

    tipoDocumentoPagination: Pagination;

    habilitarTipoDocumentoSalvar: boolean = false;

    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    @ViewChild('menuTriggerTipoDocumento') menuTriggerTipoDocumento: MatMenuTrigger;

    @ViewChild('autoCompleteTipo', {static: false, read: MatAutocompleteTrigger})
    autoCompleteTipo: MatAutocompleteTrigger;

    differ: any;

    title: string = 'CARREGANDO';

    fullTitle: string;

    /**
     * Constructor
     *
     * @param _changeDetectorRef
     * @param differs
     * @param _formBuilder
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        differs: KeyValueDiffers,
        private _formBuilder: FormBuilder
    ) {
        this.differ = differs.find([]).create();
        this.mode = 'tarefa';

        this.form = this._formBuilder.group({
            tipoDocumento: [null]
        });

        this.tipoDocumentoPagination = new Pagination();

        this.form.get('tipoDocumento').valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.habilitarTipoDocumentoSalvar = value && typeof value === 'object';
                    this._changeDetectorRef.detectChanges();
                    return of([]);
                }
            )
        ).subscribe();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['uploadMode']) {
            if (this.uploadMode === 'linear' && !this.uploading) {
                this.fullTitle = this.componenteDigital.fileName;
                this.title = !(this.fullTitle.length > 14) ?
                    this.fullTitle :
                    this.fullTitle.substr(0, 15) + '...';
            }
            if (this.uploadMode === 'linear' && this.uploading &&
                (!this.componenteDigital.inProgress && !this.componenteDigital.canRetry)) {
                this.title = 'AGUARDANDO';
            }
            if (this.uploadMode === 'linear' && this.uploading &&
                (this.componenteDigital.inProgress && !this.componenteDigital.canRetry)) {
                this.title = 'CARREGANDO';
            }
            this._changeDetectorRef.markForCheck();
        }
    }

    ngDoCheck(): void {
        const changes = this.differ.diff(this.componenteDigital);

        if (changes) {
            changes.forEachChangedItem((elt) => {
                if (elt.key === 'progress' || elt.key === 'inProgress' || elt.key === 'canRetry') {
                    if (this.componenteDigital.canRetry) {
                        this.fullTitle = this.componenteDigital.fileName;
                        this.title = !(this.fullTitle.length > 14) ?
                            this.fullTitle :
                            this.fullTitle.substr(0, 15) + '...';
                        if (this.componenteDigital.tipoDocumento) {
                            this.fullTitle += '\n Tipo de documento: ' + this.componenteDigital.tipoDocumento.nome;
                        }
                    }
                    this._changeDetectorRef.markForCheck();
                }
            });
        }
    }

    salvarTipoDocumento(): void {
        const novoTipo = this.form.get('tipoDocumento').value;
        if (novoTipo) {
            this.fullTitle = this.componenteDigital.fileName;
            this.fullTitle += '\n Tipo de documento: ' + novoTipo.nome;
        }
        this.form.get('tipoDocumento').setValue(null);
        this.autoCompleteTipo.closePanel();
        this.menuTriggerTipoDocumento.closeMenu();
        this.menuTrigger.closeMenu();
        this.componenteDigital.tipoDocumento = novoTipo;
        this._changeDetectorRef.markForCheck();
    }

    toggleInSelected(componenteDigitalId): void {
        this.selected = !this.selected;
        this.changedSelected.emit(componenteDigitalId);
    }

    onCancel(componenteDigital): void {
        this.cancel.emit(componenteDigital);
    }

    onRetry(componenteDigital): void {
        this.retry.emit(componenteDigital);
    }

    onClick(componenteDigital): void {
        this.clicked.emit(componenteDigital);
    }
}

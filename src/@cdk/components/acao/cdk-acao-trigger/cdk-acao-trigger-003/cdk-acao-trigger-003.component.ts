import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {Acao, Compartilhamento, ModalidadeAcaoEtiqueta, Pagination} from '../../../../models';
import {FormBuilder, FormGroup} from '@angular/forms';

// @ts-ignore
@Component({
    selector: 'cdk-acao-trigger-003',
    templateUrl: './cdk-acao-trigger-003.component.html',
    styleUrls: ['./cdk-acao-trigger-003.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkAcaoTrigger003Component implements OnInit, OnDestroy {

    @Input()
    usuarioPagination: Pagination;

    @Input()
    saving: boolean;

    @Input()
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Acao>();

    @Output()
    abort = new EventEmitter<any>();

    compartilhamento: Compartilhamento;
    routerState: any;
    form: FormGroup;
    activeCard: string = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _formBuilder: FormBuilder
    ) {
        this.usuarioPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

    submit(values): void {
        values['modalidadeAcaoEtiqueta'] = this.modalidadeAcaoEtiqueta;
        this.save.emit(values);
    }

}

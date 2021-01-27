import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnDestroy, OnInit,
    ViewEncapsulation,
    OnChanges, SimpleChange, EventEmitter, Output
} from '@angular/core';

import {Observable} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {Router} from "@angular/router";
import {Acao, Compartilhamento, Pagination, Usuario} from "../../../../models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

// @ts-ignore
@Component({
    selector: 'cdk-acao-trigger-003',
    templateUrl: './cdk-acao-trigger-003.component.html',
    styleUrls: ['./cdk-acao-trigger-003.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkAcaoTrigger003Component implements OnInit, OnDestroy, OnChanges {

    compartilhamento: Compartilhamento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    @Input()
    usuarioPagination: Pagination;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Acao>();
    @Output()
    abort = new EventEmitter<any>();

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
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

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
        this.save.emit(values);
    }

}

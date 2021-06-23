import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {Compartilhamento, Pagination, TipoAcaoWorkflow} from '../../../../models';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-tipo-acao-workflow-trigger-003',
    templateUrl: './cdk-tipo-acao-workflow-trigger-003.component.html',
    styleUrls: ['./cdk-tipo-acao-workflow-trigger-003.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkTipoAcaoWorkflowTrigger003Component implements OnInit, OnDestroy, OnChanges {

    @Input()
    usuarioPagination: Pagination;
    @Input()
    saving: boolean;
    @Input()
    errors: any;
    @Input()
    tipoAcaoWorkflow: TipoAcaoWorkflow;

    @Output()
    save = new EventEmitter<TipoAcaoWorkflow>();
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
        values['tipoAcaoWorkflow'] = this.tipoAcaoWorkflow;
        this.save.emit(values);
    }

}

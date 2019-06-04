import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation, EventEmitter
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {ModalidadeNotificacaoService} from '@cdk/services/modalidade-notificacao.service';
import {ModalidadeNotificacao} from '@cdk/models/modalidade-notificacao.model';

@Component({
    selector: 'cdk-modalidade-notificacao-gridsearch',
    templateUrl: './cdk-modalidade-notificacao-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-notificacao-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeNotificacaoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadenotificacoes: ModalidadeNotificacao[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadenotificacaoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeNotificacaoService: ModalidadeNotificacaoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeNotificacaoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadenotificacoes = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
    }

    reload (params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
        };
        this.load (params);
    }

    select(modalidadenotificacao): void {
        this.selected.emit(modalidadenotificacao);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}

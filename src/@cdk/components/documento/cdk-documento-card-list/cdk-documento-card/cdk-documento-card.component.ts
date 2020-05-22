import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Documento} from '@cdk/models';
import {LoginService} from '../../../../../app/main/auth/login/login.service';
import {CdkAssinaturaEletronicaPluginComponent} from '../../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {filter} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';

@Component({
    selector: 'cdk-documento-card',
    templateUrl: './cdk-documento-card.component.html',
    styleUrls: ['./cdk-documento-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoCardComponent implements OnInit {

    @Input()
    documento: Documento;

    @Input()
    selected = true;

    @Input()
    deleting = false;

    @Input()
    assinando = false;

    @Input()
    removendoAssinatura = false;

    @Input()
    convertendo = false;

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    verResposta = new EventEmitter<Documento>();

    @Output()
    assinatura = new EventEmitter<number>();

    @Output()
    removeAssinatura = new EventEmitter<number>();

    @Output()
    converte = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    changedSelected = new EventEmitter<boolean>();

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService,
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    toggleInSelected(documentoId): void {
        this.selected = !this.selected;
        this.changedSelected.emit(documentoId);
    }

    doDelete(documentoId): void {
        this.delete.emit(documentoId);
    }

    doVerResposta(documento): void {
        this.verResposta.emit(documento);
    }

    doAssinatura(documentoId): void {
        const dialogRef = this.dialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            result.documento = this.documento;
            this.assinatura.emit(result);
        });
    }

    doRemoveAssinatura(documentoId): void {
        this.removeAssinatura.emit(documentoId);
    }

    doConverte(documentoId): void {
        this.converte.emit(documentoId);
    }

    onClick(documento): void {
        this.clicked.emit(documento);
    }
}

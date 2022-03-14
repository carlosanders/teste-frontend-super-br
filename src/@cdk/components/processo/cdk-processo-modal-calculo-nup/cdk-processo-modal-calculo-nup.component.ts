import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

import {Pagination} from '@cdk/models';

import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@cdk/angular/material';

@Component({
    selector: 'cdk-processo-modal-calculo-nup',
    templateUrl: './cdk-processo-modal-calculo-nup.component.html',
    styleUrls: ['./cdk-processo-modal-calculo-nup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcessoModalCalculoNupComponent implements OnInit {

    @Output()
    edit = new EventEmitter<any>();

    ano: string;
    dv: string;
    prefixo: string;
    sequencial: string;
    
    valido: boolean;
    prefixoValido: boolean;
    sequencialValido: boolean;
    anoValido: boolean;

    get nupFormatado(): string {
        const ano = this.anoValido ? this.ano : 'XXXX';
        const prefixo = this.prefixoValido ? this.prefixo : 'XXXXX';
        const sequencial = this.sequencialValido ? this.sequencial : 'XXXXXX';
        return `${prefixo}.${sequencial}/${ano}`;
    }

    /**
     * @param _changeDetectorRef
     * @param dialogRef
     * @param data
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialogRef: MatDialogRef<CdkProcessoModalCalculoNupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    validarDados(): void {
        this.anoValido = this.ano?.length === 4;
        this.prefixoValido = this.prefixo?.length === 5;
        this.sequencialValido = this.sequencial?.length === 6;

        this.valido = this.anoValido
            && this.prefixoValido
            && this.sequencialValido;


        if (this.valido) {
            if (this.ano.substr(0, 2) == '19'){
                this.ano = this.ano.substr(2, 2);
            }

            let digitos = `${this.prefixo}${this.sequencial}${this.ano}`;
            let tamanho = digitos.length;
            let i = 0;
            let dv1 = 0;
            let dv2 = 0;
            let peso = 0;

            for (dv1 = 0, i = (tamanho - 1), peso = 2; i >= 0; i--, peso++){
                dv1 += +digitos[i] * peso;
            }

            if ((dv1 = 11 - (dv1 % 11)) >= 10){
                dv1 -= 10;
            }

            digitos += dv1;

            for (dv2 = 0, i = (tamanho), peso = 2; i >= 0; i--, peso++){
                dv2 += +digitos[i] * peso;
            }

            if ((dv2 = 11 - (dv2 % 11)) >= 10){
                dv2 -= 10;
            }

            this.dv = `${dv1}${dv2}`;
        }
    }

    carregarDadosNup() {
        let nup = this.data.nup;

        if (!nup) return;

        nup = nup.replace(/\D/g, '');

        if (nup.length >= 5) {
            this.prefixo = nup.substring(0, 5);
        }
        
        if (nup.length >= 11 ) {
            this.sequencial = nup.substring(5, 11);
        }

        if (nup.length >= 15) {
            this.ano = nup.substring(11, 15);
        }

        this.validarDados();
    }

    ngOnInit(): void {
        this.carregarDadosNup();
    }

    onConfirm(): void {
        const nup = `${this.prefixo}.${this.sequencial}/${this.ano}-${this.dv}`;

        this.dialogRef.close(nup);
    }

    onClose(): void {
        this.dialogRef.close();
    }

}

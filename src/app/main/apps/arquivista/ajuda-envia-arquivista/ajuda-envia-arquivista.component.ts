import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-envia-arquivista',
    templateUrl: './ajuda-envia-arquivista.component.html',
    styleUrls: ['./ajuda-envia-arquivista.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaEnviaArquivistaComponent {

    topicos: Topico[] = [];
    titulo = 'enviaarquivista';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

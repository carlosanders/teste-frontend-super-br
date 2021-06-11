import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-arquivista',
    templateUrl: './ajuda-arquivista.component.html',
    styleUrls: ['./ajuda-arquivista.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaArquivistaComponent {

    topicos: Topico[] = [];
    titulo = 'arquivista';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-denificao-arquivista',
    templateUrl: './ajuda-definicao-arquivista.component.html',
    styleUrls: ['./ajuda-definicao-arquivista.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaDefinicaoArquivistaComponent {

    topicos: Topico[] = [];
    titulo = 'arquivista definicao';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

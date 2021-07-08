import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-videos-arquivista',
    templateUrl: './ajuda-videos-arquivista.component.html',
    styleUrls: ['./ajuda-videos-arquivista.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaVideosArquivistaComponent {

    topicos: Topico[] = [];
    titulo = 'arquivista videos';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

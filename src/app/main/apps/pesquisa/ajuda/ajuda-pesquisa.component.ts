import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-pesquisa',
    templateUrl: './ajuda-pesquisa.component.html',
    styleUrls: ['./ajuda-pesquisa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaPesquisaComponent {

    topicos: Topico[] = [];
    titulo = 'pesquisa';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

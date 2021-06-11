import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-configuracoes',
    templateUrl: './ajuda-configuracoes.component.html',
    styleUrls: ['./ajuda-configuracoes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaConfiguracoesComponent {

    topicos: Topico[] = [];
    titulo = 'configuracoes';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

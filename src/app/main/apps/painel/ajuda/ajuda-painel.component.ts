import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-painel',
    templateUrl: './ajuda-painel.component.html',
    styleUrls: ['./ajuda-painel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaPainelComponent {

    topicos: Topico[] = [];
    titulo = 'painel';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

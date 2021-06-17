import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-coordenador',
    templateUrl: './ajuda-coordenador.component.html',
    styleUrls: ['./ajuda-coordenador.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaCoordenadorComponent {

    topicos: Topico[] = [];
    titulo = 'coordenador';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

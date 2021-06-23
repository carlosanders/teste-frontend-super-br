import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-volumes',
    templateUrl: './ajuda-volumes.component.html',
    styleUrls: ['./ajuda-volumes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaVolumesComponent {

    topicos: Topico[] = [];
    titulo = 'volumes';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}

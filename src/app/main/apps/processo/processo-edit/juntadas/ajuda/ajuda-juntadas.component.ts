import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import { Topico } from 'ajuda/topico';

@Component({
    selector: 'ajuda-juntadas',
    templateUrl: './ajuda-juntadas.component.html',
    styleUrls: ['./ajuda-juntadas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaJuntadasComponent {
    topicos: Topico[] = [];
    titulo = "processo";

    Collapsible():void{
        var coll = document.getElementsByClassName("collapsible");
        var i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
            content.style.display = "none";
            } else {
            content.style.display = "block";
            }
            });
        } 
        }
    
    carregar(topico: string): void {
        this.titulo = topico;
    }
}

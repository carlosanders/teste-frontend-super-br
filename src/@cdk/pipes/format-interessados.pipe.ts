import {Pipe, PipeTransform} from '@angular/core';
import {Interessado} from '../models';

/*
 * Formata a observação das tarefas
*/
@Pipe({name: 'formatInteressados'})
export class FormatInteressadosPipe implements PipeTransform {
    transform(interessados: Interessado[], total: number): string[] {
        const interessadosNomes: string[] = interessados
            .map(interessado => interessado.pessoa.nome);
        if (interessados.length < total) {
            interessadosNomes.push('E outros...');
        }
        return interessadosNomes;
    }
}

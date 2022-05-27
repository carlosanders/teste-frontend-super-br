import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'titleCasePipe'})
export class TitleCasePipe implements PipeTransform {

    private static stopwords = ['de', 'e', 'e/ou', 'a', 'ao', 'aos', 'após', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aquilo', 'as', 'até', 'através', 'com', 'como', 'contra', 'da', 'daquele', 'daqueles', 'das', 'de', 'dela', 'delas', 'dele', 'deles', 'depois', 'dessa', 'dessas', 'desse', 'desses', 'desta', 'destas', 'deste', 'deste', 'destes', 'do', 'dos', 'e', 'é', 'ela', 'elas', 'ele', 'eles', 'em', 'enquanto', 'entre', 'era', 'essa', 'essas', 'esse', 'esses', 'este', 'estes', 'estou', 'eu', 'isso', 'isto', 'já', 'la', 'lá', 'lhe', 'lhes', 'lo', 'mas', 'me', 'mesma', 'mesmas', 'mesmo', 'mesmos', 'meu', 'meus', 'minha', 'minhas', 'na', 'não', 'nas', 'nem', 'nenhum', 'nessa', 'nessas', 'nesta', 'nestas', 'no', 'nos', 'nós', 'num', 'numa', 'o', 'os', 'ou', 'para', 'pela', 'pelas', 'pelo', 'pelos', 'per', 'pois', 'por', 'quais', 'qual', 'quando', 'quanto', 'quantos', 'que', 'quem', 'são', 'se', 'seu', 'seus', 'si', 'sido', 'só', 'sob', 'sobre', 'sua', 'suas', 'te', 'tem', 'teu', 'teus', 'ti', 'tido', 'tinha', 'tinham', 'toda', 'todas', 'todavia', 'tu', 'tua', 'tuas', 'tudo', 'um', 'uma', 'umas', 'uns', 'vir', 'vos', 'vós'];

    transform(value: string|null) {
        return TitleCasePipe.format(value);
    }

    static format(value: string|null): string {
        if (!value) {
            return value;
        }
        const values = value.toLowerCase().split(' ');
        for (let i = 0; i < values.length; i++) {
            if ((this.stopwords.indexOf(values[i]) !== -1) && (i > 0)) {
                continue;
            }
            values[i] = values[i].charAt(0).toUpperCase() + values[i].slice(1);
        }
        let result = values.join(' ')?.replace(/-([a-z])/g, (_, char) => '-' + char.toUpperCase());
        result = result?.replace(/\(([a-z])/g, (_, char) => '(' + char.toUpperCase());
        return result;
    }
}

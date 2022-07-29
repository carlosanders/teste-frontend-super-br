import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedBookmarkService
{
    static juntadaAtualSelect: any;
    static modeBookmark = false;
    static pagina = null;
}


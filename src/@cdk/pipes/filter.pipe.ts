import {Pipe, PipeTransform} from '@angular/core';
import {CdkUtils} from '@cdk/utils';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform
{
    /**
     * Transform
     *
     * @param mainArr
     * @param searchText
     * @param property
     * @returns
     */
    transform(mainArr: any[], searchText: string, property: string): any
    {
        return CdkUtils.filterArrayByString(mainArr, searchText);
    }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipe } from './search';


@NgModule ({
    imports: [
        CommonModule
    ],
    declarations: [
        FilterPipe
    ],
    exports: [
        FilterPipe
    ]
})

export class PipeModule {}
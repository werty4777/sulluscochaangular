import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {StickyComponent} from './sticky/sticky.component';
import {ModalComponent} from './modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {OrdenCompraComponent} from '../productos/orden-compra/orden-compra.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        FormsModule, ReactiveFormsModule, MatTableModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        StickyComponent,
        ModalComponent,
        OrdenCompraComponent,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        StickyComponent,
        OrdenCompraComponent
    ]
})
export class ComponentsModule {
}

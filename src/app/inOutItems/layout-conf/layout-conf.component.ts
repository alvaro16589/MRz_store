import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-layout-conf',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './layout-conf.component.html',
  styleUrl: './layout-conf.component.css'
})
export class LayoutConfComponent {

}

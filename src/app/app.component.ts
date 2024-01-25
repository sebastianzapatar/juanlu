import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "./core/side-bar/side-bar.component";
import { HeaderComponent } from "./core/header/header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, SideBarComponent, HeaderComponent]
})
export class AppComponent {
  title = 'FRONT-GERIATRIA';

  sidebarActiveStatus=false;

 
}

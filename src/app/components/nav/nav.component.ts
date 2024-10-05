import { CommonModule } from '@angular/common';
import { Component, OnInit, inject,OnChanges,SimpleChanges  } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit, OnChanges {
  authService = inject(AuthService);
  router = inject(Router);
  users: string = "" 
  isAdmin: string = "" 

  ngOnChanges(changes: SimpleChanges) {
    console.log('Cambios detectados:', changes);
    this.authService.getUserObservable().subscribe((user:any) => {
      this.users = user;
    });

    this.authService.getAdminObservable().subscribe((admin:any) => {
      this.isAdmin = admin;
    });
  }

  ngOnInit(): void {
    this.authService.getUserObservable().subscribe((user:any) => {
      this.users = user;
    });

    this.authService.getAdminObservable().subscribe((admin:any) => {
      this.isAdmin = admin;
    });
  }

  logout(){
    localStorage.clear()
    this.authService.getUserObservable().subscribe((user:any) => {
      this.users = "";
    });
    this.authService.getAdminObservable().subscribe((admin:any) => {
      this.isAdmin = "";
    });
    this.router.navigate(['/login']);
  }
}

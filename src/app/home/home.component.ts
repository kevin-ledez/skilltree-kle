import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivitesComponent } from '../activites/activites.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, ActivitesComponent],
})
export class HomeComponent {

  utilisateurs: any;

  constructor(private supabase: SupabaseService, public dialog: MatDialog) {}

  async ngOnInit(){
    this.utilisateurs = await this.supabase.getUtilisateurs();
  }

  openModal(utilisateurId: number) {
    const dialogRef = this.dialog.open(ActivitesComponent, {
      width: '100%',
      data: { utilisateurId: utilisateurId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Faites quelque chose après la fermeture de la fenêtre modale si nécessaire
    });
  }
}

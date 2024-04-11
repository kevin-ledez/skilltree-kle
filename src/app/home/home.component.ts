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
    // Ferme la fenêtres modales ouvertes
    this.dialog.closeAll();

    // Ouvre la nouvelle fenêtre quand on clic sur l'ancienne
    const dialogRef = this.dialog.open(ActivitesComponent, {
      width: '100%',
      data: { utilisateurId: utilisateurId }
    });
  }
}
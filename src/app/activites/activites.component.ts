import { Component, Inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.css'],
  standalone: true,
  imports: [CommonModule, ActivitesComponent],
})

export class ActivitesComponent {

  utilisateur: any;

  constructor(private supabase: SupabaseService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initUtilisateur(data.utilisateurId);
  }

  async initUtilisateur(utilisateurId: number) {
    
    const niveauxCompetences = await this.supabase.getNiveauxCompetences();
    const competences = await this.supabase.getCompetences();

    const utilisateurs = await this.supabase.getUtilisateurs();
    if (utilisateurs) {
      this.utilisateur = utilisateurs.find((utilisateur: any) => utilisateur.id === utilisateurId);
      
    } else {
      console.error("La liste des utilisateurs est nulle.");
    }
  }
}

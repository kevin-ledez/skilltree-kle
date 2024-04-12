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
  imports: [CommonModule],
})

export class ActivitesComponent {

  utilisateur: any;
  premieresCompetences: any[] = [];
  suivantesCompetences: any[] = [];
  dernieresCompetences: any[] = [];

  constructor(private supabase: SupabaseService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initUtilisateur(data.utilisateurId);
  }

  async initUtilisateur(utilisateurId: number) {
    try {
      // Récupérer les données des niveaux de compétences et des compétences
      const niveauxCompetences = await this.supabase.getNiveauxCompetences();
      const competences = await this.supabase.getCompetences();

      // Vérifier si les données des niveaux de compétences et des compétences sont définies
      if (niveauxCompetences && competences) {
        // Récupérer les données de l'utilisateur
        const utilisateurs = await this.supabase.getUtilisateurs();

        if (utilisateurs) {
          // Rechercher l'utilisateur spécifique
          this.utilisateur = utilisateurs.find((utilisateur: any) => utilisateur.id === utilisateurId);

          if (this.utilisateur) {
            // Filtrer les niveaux de compétences liés à cet utilisateur
            const niveauxUtilisateur = niveauxCompetences.filter((niveau: any) => niveau.utilisateur_id === utilisateurId);

            // Organiser les compétences en fonction de leur position dans la liste
            niveauxUtilisateur.forEach((niveau: any, index: number) => {
              const competence = competences.find((competence: any) => competence.id === niveau.competence_id);
              if (index < 4) {
                this.premieresCompetences.push(competence);
              } else if (index < 8) {
                this.suivantesCompetences.push(competence);
              } else {
                this.dernieresCompetences.push(competence);
              }
            });
          }
        } else {
          console.error("La liste des utilisateurs est nulle.");
        }
      } else {
        console.error("La liste des niveaux de compétences ou des compétences est nulle.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'initialisation de l'utilisateur :", error);
    }
  }
}

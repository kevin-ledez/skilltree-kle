import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { MatDialog } from '@angular/material/dialog'; // Importez MatDialog correctement
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
  isModalOpen = false; // Déclarez la variable ici

  constructor(private supabase: SupabaseService, public dialog: MatDialog) {} // Injectez MatDialog dans le constructeur

  async ngOnInit(){
    this.utilisateurs = await this.supabase.getUtilisateurs();
    console.log(this.utilisateurs);
  }

  openModal(utilisateurId:Number) { // Déclarez la fonction à l'intérieur de la classe
    console.log(utilisateurId);
    const dialogRef = this.dialog.open(ActivitesComponent, {
      width: '100%', // Définissez la largeur de la fenêtre modale selon vos besoins
    });

    dialogRef.afterClosed().subscribe(result => {
      // Faites quelque chose après la fermeture de la fenêtre modale si nécessaire
    });
  }
}

import { Component, ElementRef } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ActivitesComponent } from '../activites/activites.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, ActivitesComponent],
})
export class HomeComponent {

  utilisateurs: any;
  dialogRef!: MatDialogRef<any>; // Modifier le type selon le composant de la modale
  moyenneGlobale: number = 0;

  constructor(private supabase: SupabaseService, public dialog: MatDialog, private elementRef: ElementRef) {}

  async ngOnInit(){
    this.utilisateurs = await this.supabase.getUtilisateurs();

    // Récupérer tous les niveaux de compétences
    const niveaux = await this.supabase.getNiveauxCompetences();

    if (niveaux) {
      // Calculer la moyenne des niveaux
      this.moyenneGlobale = this.calculerMoyenne(niveaux);
    } else {
      console.error("La liste des niveaux de compétences est null.");
    }
  }


  openModal(utilisateurId: number) {
    // Ferme la fenêtres modales ouvertes
    this.dialog.closeAll();

    // Configuration de la fenêtre modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.data = { utilisateurId: utilisateurId };

    // Ouvre la nouvelle fenêtre modale et stocke sa référence dans la variable dialogRef
    this.dialogRef = this.dialog.open(ActivitesComponent, dialogConfig);

    // Ajouter un écouteur d'événements pour fermer la fenêtre modale en cliquant à l'extérieur
    this.dialogRef.afterOpened().subscribe(() => {
      this.elementRef.nativeElement.ownerDocument.addEventListener('click', this.dialogClickListener);
    });
  }

  // Fonction fléchée pour fermer la fenêtre modale lorsque l'utilisateur clique à l'extérieur
  dialogClickListener = (event: MouseEvent) => {
    if (!this.elementRef.nativeElement.contains(event.target) && !this.dialogRef['_containerInstance']['_elementRef'].nativeElement.contains(event.target)) {
      this.dialog.closeAll();
      this.elementRef.nativeElement.ownerDocument.removeEventListener('click', this.dialogClickListener);
    }
  };

  calculerMoyenne(niveaux: any[]): number {
    if (niveaux.length === 0) return 0;

    // Somme des niveaux
    const somme = niveaux.reduce((total, niveau) => total + niveau.niveau, 0);

    // Moyenne
    return somme / niveaux.length;
  }
}

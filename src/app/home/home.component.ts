import { Component, ElementRef, HostListener } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  constructor(private supabase: SupabaseService, public dialog: MatDialog, private elementRef: ElementRef) {}

  async ngOnInit(){
    this.utilisateurs = await this.supabase.getUtilisateurs();
  }

  openModal(utilisateurId: number) {
    // Ferme la fenêtres modales ouvertes
    this.dialog.closeAll();

    // Configuration de la fenêtre modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.data = { utilisateurId: utilisateurId };

    // Ouvre la nouvelle fenêtre modale
    const dialogRef = this.dialog.open(ActivitesComponent, dialogConfig);

    // Ajouter un écouteur d'événements pour fermer la fenêtre modale en cliquant à l'extérieur
    dialogRef.afterOpened().subscribe(() => {
      this.elementRef.nativeElement.ownerDocument.addEventListener('click', this.dialogClickListener);
    });
  }

  // Fonction fléchée pour fermer la fenêtre modale lorsque l'utilisateur clique à l'extérieur
  dialogClickListener = (event: MouseEvent) => {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dialog.closeAll();
      this.elementRef.nativeElement.ownerDocument.removeEventListener('click', this.dialogClickListener);
    }
  };
}

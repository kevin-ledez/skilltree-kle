import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  utilisateurs: any;

  constructor(private supabase: SupabaseService) {}

  async ngOnInit(){
    this.utilisateurs = await this.supabase.getUtilisateurs();
    console.log(this.utilisateurs);
  }

}

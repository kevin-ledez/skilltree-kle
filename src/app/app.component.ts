import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';

  constructor(private supabase: SupabaseService) {}

  getUtilisateurs(){
    return this.supabase.getUtilisateurs(
      
    );
  }

  ngOnInit(){
    this.getUtilisateurs();
  }
}

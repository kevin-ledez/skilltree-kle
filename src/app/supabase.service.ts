import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from './environments/environment';
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  async getUtilisateurs() {
    const { data, error } = await this.supabase.from('utilisateurs').select(`
        nom,
        email,
        niveaux_competences(
            utilisateur_id,
            competence_id,
            niveau
        )`
    );
    //console.log(data);
    return data;
  }
}

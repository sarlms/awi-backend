import { IsEmail, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) pour la connexion utilisateur.
 * Cette classe est utilisée pour valider les données lors d'une requête de connexion.
 */
export class LoginDto {
  /**
   * Adresse email de l'utilisateur.
   * Doit être une adresse email valide.
   */
  @IsEmail()
  email: string;

  /**
   * Mot de passe de l'utilisateur.
   * Doit être une chaîne de caractères.
   */
  @IsString()
  password: string;
}

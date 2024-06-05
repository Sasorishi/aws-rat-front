# Backend - Gestion de Tâches

## Prérequis

- Node.js (v12 ou supérieur)
- npm (v6 ou supérieur)
- MySQL

## Configuration

Avant de commencer, assurez-vous de modifier les informations de configuration de la base de données dans le fichier `config/config.json`.

### Étapes pour la configuration :

1. Ouvrez le fichier `config/config.json`.
2. Modifiez les informations sous la section `development` pour correspondre à votre configuration de base de données MySQL locale :

```json
"development": {
  "username": "root",
  "password": "password",
  "database": "db_name",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
```
### Lancer le serveur:
```json
npm i
```
lancer le serveur:
```json
npm run start
```

### Routes API
### Tâches
GET /tasks : Récupérer toutes les tâches
POST /tasks : Créer une nouvelle tâche
PUT /tasks/:id : Mettre à jour une tâche existante
DELETE /tasks/:id : Supprimer une tâche
### Utilisateurs
GET auth/users : Récupérer tous les utilisateurs
POST auth/register : Enregistrer un nouvel utilisateur
POST auth/login : Authentifier un utilisateur et obtenir un token

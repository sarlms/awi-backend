# Ah Oui - Application de Gestion de Dépôt-Vente de Jeux de Société

Ah Oui est une application web complète pour la gestion des systèmes de dépôt-vente de jeux de société. Elle est destinée à simplifier les interactions entre vendeurs, acheteurs, et administrateurs lors d'événements tels que des festivals de jeux. Cette application couvre la gestion des stocks, des transactions financières et des bilans tout en garantissant une ergonomie optimale.

L'application est disponible à l'adresse suivante : https://ahoui-front.cluster-ig4.igpolytech.fr/

## Fonctionnalités Clés

### 1. Gestion des Sessions
- **Création de Sessions** : Les administrateurs peuvent créer des sessions de dépôt-vente correspondant à des périodes de vente définies.
- **Consultation des Sessions** : Liste des sessions actives et passées avec détails (date, lieu, statut).

### 2. Dépôt et Catalogue de Jeux
- **Déposer des Jeux** : Les vendeurs enregistrent plusieurs jeux en une fois. Chaque jeu reçoit une étiquette unique pour le suivi.
- **Catalogue des Jeux** : Les acheteurs consultent les jeux disponibles et filtrent par nom, éditeur ou prix.

### 3. Transactions
- **Enregistrement des Transactions** : Gestion complète des ventes avec mise à jour des stocks et crédit des vendeurs.
- **Encaissement** : Permet aux gestionnaires de scanner les articles, finaliser les paiements et gérer les paniers.
- **Consultation des Transactions** : Vue détaillée avec recherche par client, vendeur ou session.

### 4. Gestion des Stocks
- **Vue des Stocks** : Suivi des jeux en stock ou vendus par vendeur.
- **Récupération des Invendus** : Interface pour les vendeurs afin de récupérer leurs invendus.

### 5. Rôles et Utilisateurs
- **Clients** : Création et gestion des clients avec nom, email, téléphone et adresse.
- **Vendeurs** : Gestion des vendeurs, suivi des gains et jeux associés.
- **Managers** : Gestion des comptes utilisateurs, frais, et commissions.

### 6. Tableau de Bord Financier
- **Bilan Global** : Inclut trésorerie totale, sommes dues aux vendeurs, frais de dépôt et commissions.
- **Bilan Particulier** : Vue personnalisée pour chaque vendeur avec leurs gains et transactions.

### 7. Sécurité et Robustesse
- Gestion des erreurs (dépôt hors session active, erreurs de paiement, etc.).
- Validation stricte des données pour garantir fiabilité et cohérence.

## Structure de la Navbar

La barre de navigation contient les éléments suivants :

1. **Sessions** : Accès à la liste des sessions en cours et passées.
2. **+ Session** : Ouvre un formulaire pour créer une nouvelle session de dépôt-vente.
3. **Catalogue** : Affiche tous les jeux disponibles avec options de tri et de filtrage.
4. **Jeux Déposés** : Permet de visualiser les jeux enregistrés par les vendeurs avec leurs statuts (vendu ou non vendu).
5. **+ Dépôt** : Permet aux vendeurs de déposer de nouveaux jeux.
6. **+ Jeu** : Ouvre un formulaire pour ajouter une description de jeu dans la base de données.
7. **Encaissement** : Permet de scanner des jeux et d’enregistrer les paiements des clients.
8. **Transactions** : Affiche toutes les transactions avec les détails des clients, vendeurs, et jeux.
9. **Trésorerie** : Présente le bilan financier global et les détails des frais, commissions, et sommes dues.
10. **User Management** : Gestion des clients, vendeurs et administrateurs avec leurs informations et rôles.
11. **Déconnexion** : Bouton pour quitter l’application en toute sécurité.

## Technologies Utilisées
- **Frontend** : Angular
- **Backend** : NestJS ([Lien du backend](https://github.com/sarlms/awi-backend))
- **Base de Données** : MongoDB Atlas

## Guide d’Installation

### Backend
1. Clonez le backend :
    ```bash
    git clone https://github.com/sarlms/awi-backend.git
    cd awi-backend
    npm install
    ```
2. Configurez les variables d’environnement dans un fichier `.env` :
    ```env
    MONGO_URI=your_mongo_database_url
    ```
3. Lancez le serveur :
    ```bash
    npm run start:dev
    ```

### Frontend
1. Clonez le frontend :
    ```bash
    git clone https://github.com/sarlms/awi-frontend.git
    cd awi-frontend
    npm install
    ```
2. Lancez l’application Angular :
    ```bash
    ng serve
    ```
3. Accédez à l’application sur [http://localhost:4200](http://localhost:4200).

---

Ah Oui est conçue pour transformer la gestion des systèmes de dépôt-vente de jeux en une expérience intuitive et efficace. Explorez, contribuez et faites évoluer ce projet ensemble !





<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

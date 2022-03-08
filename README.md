# Jeanlouisdossantos_7_08062021_backend
Backend du projet 7 Openclassroom

## Installation

**Il faut avoir mysql d'installer !**

- Lancer la commande npm install depuis le dossier local
- Importer la structure de la base de donné dans Mysql. La structure est dans le dossier groupomania.sql
- Créer dans le dossier racine un fichier .env
- Ajouter dans le .env les information ci dessous : 

DB_HOST = 
>L'hote de votre base de donnée (par defaut localhost) 

DB_USERNAME = 
>Votre nom d'utilisateur Mysql

DB_PASS = 
>Votre mot de passe Mysql

DB_NAME = 
>groupomania

TOKEN_KEY = 
>Choisissez une chaine de caractere qui vous servira a crpter les infos sensible

CRYPTO_HEX_KEY = 
>Choisissez une chaine de caractere qui vous servira a crpter les infos sensible


## Utilisation

pour lancer le backend, executer la commande node server.js



# Comment déployer le site web ?

## Déployer le backend

### Création de l'image docker du backend
`docker build -t akap/backend:1.0 .\backend\`

## Déployer le frontend
Le déployement du frontend ne peut pas se faire avant que le backend ne soit déployé.
Une fois le backend déployé et disponible via un nom de domaine il suffit de:
1. Remplacer `<your_domain_name>` par le nom de domaine sur le quel le backend est déployé dans la ligne `const STRAPI_API_DOMAIN = "<your_domain_name>"` du fichier `./frontend/next.config.js`.
2. Remplacer `<you_port_number>` par le port sur le quel le backend est disponible dans la ligne `const STRAPI_API_PORT = "<you_port_number>"` du fichier `./frontend/next.config.js`.
3. Créer l'image docker du frontend: `docker build -t akap/frontend:1.0 .\frontend\`
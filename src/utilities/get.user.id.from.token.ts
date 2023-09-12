import jwt from 'jsonwebtoken';

function getUserIdFromToken(token: any) {
  try {
    // Vérifiez si le jeton existe
    if (!token) {
      return null;
    }

    // Utilisez la clé secrète que vous avez utilisée pour signer le jeton JWT côté serveur
    const secretKey = '34Q43ET6UJ7998I451OP54UY7KM5GVY64R709OJ7I96F5H435LKU85KIO9IO7786';

    // Décodez le jeton JWT pour obtenir les informations qu'il contient
    const decodedToken:any = jwt.verify(token, secretKey);

    // Récupérez l'ID de l'utilisateur à partir du décodage
    const userId = decodedToken.id;

    return userId;
  } catch (error) {
    // En cas d'erreur (jeton invalide, expiré, etc.), retournez null ou gérez l'erreur selon vos besoins
    console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur à partir du jeton :', error);
    return null;
  }
}

export default getUserIdFromToken;

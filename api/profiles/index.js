const { Router } = require('express');
const router = Router();
const controller = require('./controller');

// CRUD Routes
router.post('/', controller.createProfile); // Créer un profil
router.get('/', controller.getRFProfiles); //  Récupérer la fonction pour rechercher et filtrer les profils
//router.get('/', controller.getAllProfiles); // Récupérer tous les profils
router.get('/:id', controller.getProfileById); // Récupérer un profil par ID
router.put('/:id', controller.updateProfile); // Mettre à jour un profil
router.delete('/:id', controller.deleteProfile); // Supprimer un profil

// Routes pour gérer les expériences
router.post('/:id/experience', controller.addExperience); // Ajouter une expérience
router.delete('/:id/experience/:expId', controller.removeExperience); // Supprimer une expérience

// Routes pour gérer les compétences
router.post('/:id/skills', controller.addSkill); // Ajouter une compétence
router.delete('/:id/skills/:skill', controller.removeSkill); // Supprimer une compétence

// Route pour mettre à jour les informations d'un profil
router.put('/:id/information', controller.updateProfileInformation); // Mettre à jour les informations
// Route pour mettre à jour les informations d'un profil
router.put('/:id/friends', controller.updateProfileInformation); // Mettre à jour les informations

module.exports = router;

const ProfileModel = require('./model');

// CREATE - Créer un nouveau profil (nom et email)
const createProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const profileToSave = new ProfileModel({ name, email });
        const createdProfile = await profileToSave.save();
        res.status(201).json(createdProfile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création du profil' });
    }
};

// Fonction pour rechercher et filtrer les profils
const getRFProfiles = async (req, res) => {
    try {
        const { skills, location, name } = req.query; // Récupérer les paramètres de la requête

        // Initialiser le filtre
        let filter = { isDeleted: { $ne: true } };

        // Ajouter les filtres en fonction des paramètres
        if (skills) {
            filter.skills = { $in: skills.split(',') }; // Recherche par compétences (séparées par des virgules)
        }

        if (location) {
            filter.location = { $regex: location, $options: 'i' }; // Recherche par localisation (insensible à la casse)
        }

        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // Recherche par nom (insensible à la casse)
        }

        // Récupérer les profils en fonction du filtre
        const profiles = await ProfileModel.find(filter);
        
        if (profiles.length === 0) {
            return res.status(404).json({ message: 'Aucun profil trouvé avec les critères spécifiés.' });
        }

        res.json(profiles);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Erreur lors de la récupération des profils.' });
    }
};

// READ - Récupérer tous les profils
//cont getALLProfiles = async (req, res) => {
//    try {
//         const profiles = await ProfileModel.find({ isDeleted: { $ne: true } });
//         res.json(profiles);
//     } catch (err) {
//         res.status(500).json({ message: 'Erreur lors de la récupération des profils' });
//     }
// }

// READ - Récupérer un profil par ID
const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await ProfileModel.findOne({ _id: id, isDeleted: { $ne: true } });
        if (!profile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
    }
};

// UPDATE - Mettre à jour un profil (nom et email uniquement)
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const updatedProfile = await ProfileModel.findByIdAndUpdate(id, { name, email }, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
};

// DELETE - Supprimer un profil (marquer comme supprimé)
const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { isDeleted: true };

        const deletedProfile = await ProfileModel.findByIdAndUpdate(id, updates, { new: true });

        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        res.json(deletedProfile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression du profil' });
    }
};

// Ajouter une expérience à un profil
const addExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { experience } = req.body;

        const profile = await ProfileModel.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        profile.experiences.push(experience); 
        await profile.save();

        res.status(201).json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'expérience' });
    }
};

// Supprimer une expérience d'un profil
const removeExperience = async (req, res) => {
    try {
        const { id, expId } = req.params;

        const profile = await ProfileModel.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        const experienceIndex = profile.experiences.findIndex(exp => exp._id.toString() === expId);
        if (experienceIndex === -1) {
            return res.status(404).json({ message: 'Expérience non trouvée' });
        }

        profile.experiences.splice(experienceIndex, 1); 
        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'expérience' });
    }
};

// Ajouter une compétence à un profil
const addSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { skill } = req.body;

        const profile = await ProfileModel.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        profile.skills.push(skill); 
        await profile.save();

        res.status(201).json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la compétence' });
    }
};

// Supprimer une compétence d'un profil
const removeSkill = async (req, res) => {
    try {
        const { id, skill } = req.params;

        const profile = await ProfileModel.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        const skillIndex = profile.skills.indexOf(skill);
        if (skillIndex === -1) {
            return res.status(404).json({ message: 'Compétence non trouvée' });
        }

        profile.skills.splice(skillIndex, 1); 
        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la compétence' });
    }
};

// Mettre à jour les informations d'un profil (nom et email uniquement)
const updateProfileInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const updatedProfile = await ProfileModel.findByIdAndUpdate(id, { name, email }, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des informations' });
    }
};

module.exports = {
    createProfile,
    getRFProfiles,
    // getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
    addExperience,
    removeExperience,
    addSkill,
    removeSkill,
    updateProfileInformation
};

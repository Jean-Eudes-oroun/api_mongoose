const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    dates: { type: String, required: true },  // Par exemple, "Janvier 2020 - Décembre 2021"
    description: { type: String, required: true }
}, { _id: true });  // Ajoute un _id pour chaque expérience

const informationSchema = new mongoose.Schema({
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' }
});

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experiences: [experienceSchema],  // Array d'objets d'expérience
    skills: [String],  // Array de strings pour les compétences
    information: informationSchema,  // Objet avec les informations personnelles
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const ProfileModel = mongoose.model('Profile', profileSchema);

module.exports = ProfileModel;

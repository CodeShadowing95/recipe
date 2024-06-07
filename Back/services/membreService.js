const Membre = require('../models/membre');

async function getAllMembers() {
    return await Membre.find();
}

async function getMemberById(id) {
    return await Membre.findById(id);
}

async function getMemberByEmailAndPassword(email, password) {
    return await Membre.findOne({ email, password });
}

async function createMember(memberData) {
    return await Membre.create(memberData);
}

async function updateMember(id, memberData) {
    return await Membre.findByIdAndUpdate(id, memberData, { new: true });
}

async function deleteMember(id) {
    return await Membre.findByIdAndDelete(id);
}

module.exports = {
    getAllMembers,
    getMemberById,
    getMemberByEmailAndPassword,
    createMember,
    updateMember,
    deleteMember
};

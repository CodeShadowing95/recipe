const Membre = require('../models/membre');
const membreService = require('../services/membreService.js');
const bcrypt = require('bcrypt');

async function getAllMembers(req, res) {
    try {
        const membres = await membreService.getAllMembers();
        res.json(membres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMemberById(req, res) {
    const memberId = req.params.id;
    try {
        const membre = await membreService.getMemberById(memberId);
        if (!membre) {
            res.status(404).json({ error: 'Member not found' });
            return;
        }
        res.json(membre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMemberByEmailAndPassword(req, res) {
    const { email, password } = req.body;
    try {
        const membre = await membreService.getMemberByEmailAndPassword(email, password);
        if (!membre) {
            res.status(404).json({ error: 'Member not found' });
            return;
        }
        res.json(membre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const currentUser = await Membre.findOne({ email });

    if (!currentUser) return res.status(404).json({ message: 'No such member' });

    const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);

    if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ result: currentUser });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
}

async function createMember(req, res) {
  const { firstname, lastname, email, password } = req.body;

  try {
    const currentMember = await Membre.findOne({ email });

    if(currentMember) return res.status(400).json({ message: 'Member already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newMember = new Membre({ firstname, lastname, email, password: hashedPassword, registrationDate: new Date().toISOString() });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateMember(req, res) {
    const memberId = req.params.id;
    const memberData = req.body;
    try {
        const updatedMember = await membreService.updateMember(memberId, memberData);
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteMember(req, res) {
    const memberId = req.params.id;
    try {
        await membreService.deleteMember(memberId);
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllMembers,
    getMemberById,
    getMemberByEmailAndPassword,
    signin,
    createMember,
    updateMember,
    deleteMember
};

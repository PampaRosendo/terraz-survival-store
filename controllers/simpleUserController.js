// backend/controllers/simpleUserController.js
let users = [];

// Cada usuario tiene: _id, username, balance
function generateId() {
    return Date.now().toString() + Math.floor(Math.random() * 1000);
}

exports.createOrGetSimpleUser = (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'El usuario es requerido' });
    }
    let user = users.find(u => u.username === username);
    if (!user) {
        user = { _id: generateId(), username, balance: 0 };
        users.push(user);
    }
    res.json(user);
};

exports.getUserEconomy = (req, res) => {
    const user = users.find(u => u._id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ balance: user.balance });
};

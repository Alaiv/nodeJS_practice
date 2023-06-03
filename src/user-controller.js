import User from './user-model.js';

class UserController {
    async getUsers(req, res) {
        try {
            let users;

            if (!req.params.id) {
                users = await User.find();
            } else {
                users = await User.findById(req.params.id);
            }

            res.send(users);
        } catch (e) {
            res.send(e.message);
        }

    }

    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.send(user);
        } catch (e) {
            res.send(e.message)
        }

    }

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
            res.send(user);
        } catch (e) {
            res.writeHead(400)
            res.send('Введите id пользователя')
        }
    }

    async deleteUser(req, res) {
        try {
            const {id} = req.params;
            const user = await User.findByIdAndDelete(id);
            res.send(user);
        } catch (e) {
            res.writeHead(400)
            res.send('Введите id пользователя' + e.message);
        }
    }
}

export default new UserController();
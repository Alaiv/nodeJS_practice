import Router from './Router.js';
import userController from "./user-controller.js";


const router = new Router();



router.get('/users', userController.getUsers);

router.post('/users', userController.addUser)

router.put(`/users` , userController.updateUser)
//
router.delete(`/users` , userController.deleteUser)

export default router;
import { login, signUp, getMe, refreshToken ,updateUserById, deleteUserById } from "../controllers/user.contollers";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authentication.middlewares";
import { loginValidator, refreshValidator, signUpValidator } from "../validators/user.validators";

const userAndAuthRouter: Router = Router();

userAndAuthRouter.post("/auth/signup", signUpValidator, signUp);
userAndAuthRouter.post("/auth/login", loginValidator,login);
userAndAuthRouter.post("/auth/refresh", refreshValidator, refreshToken);
userAndAuthRouter.get("/users/me", authMiddleware, getMe);
userAndAuthRouter.put("/users/update/:id", authMiddleware, updateUserById);
userAndAuthRouter.delete("/users/delete/:id", authMiddleware, deleteUserById);

export default userAndAuthRouter;
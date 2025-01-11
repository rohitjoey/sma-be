
import jwt from "jsonwebtoken"
export const generateJWTToken = (userId: string): string => {
    const secret = process.env.JWTSECRET as string
    const options = { expiresIn: "2d" };

    const payload = {
        sub: userId,
        iat: Date.now(), //issued at
    };

    let token = jwt.sign(payload, secret, options);

    return token
};

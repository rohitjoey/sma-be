import { JwtPayload } from "jsonwebtoken";
import { PassportStatic } from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithoutRequest, VerifiedCallback, VerifyCallback } from 'passport-jwt';
import { db } from "../db";


const jwtOptions: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET as string
}

const strategyCallBackFunction: VerifyCallback = async (payload: JwtPayload, done: VerifiedCallback) => {
    const userId = payload.sub
    try {
        const user = await db.user.findFirst({ where: { id: userId }, omit: { password: true } });
        if (!user) {
            done(null, false)
        }
        return done(null, user);

    } catch (error) {
        console.log("Asdsfd")
        done(error, false)
    }
}

function passportMiddleware(passport: PassportStatic) {
    passport.use(new JwtStrategy(jwtOptions, strategyCallBackFunction))
}

export default passportMiddleware
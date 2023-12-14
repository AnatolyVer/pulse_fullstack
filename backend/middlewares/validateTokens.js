import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {log} from "debug";

export const validateTokens = async (req, res, next) => {
    try {
        const accessToken = req.headers['access-token'];
        const refreshToken = req.headers['refresh-token'];

        if (accessToken === undefined || refreshToken === undefined) {
            console.log("No tokens")
            return res.status(401).send("Log in again");
        }

        try {
            jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
        }
        catch (accessTokenError) {
            try {
                jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

                const user = await User.findOneAndUpdate(
                    {
                        sessions: {
                            $elemMatch: {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            }
                        }
                    }
                );

                console.log(user)

                const {username, nickname} = user
                const newAccessToken = jwt.sign({username, nickname}, process.env.ACCESS_SECRET_KEY, {expiresIn: '2m'})

                const index = user.sessions.findIndex(session => session.accessToken === accessToken && session.refreshToken === refreshToken)
                console.log(user.sessions)
                user.sessions[index].accessToken = newAccessToken

                await user.save()

                req.headers['access-token'] = newAccessToken

                return res.status(403).send("Repeat the request");

            } catch (refreshTokenError) {
                console.log(refreshTokenError)
                return res.status(401).send("Login again");
            }
        }

        next();
    } catch (error) {
        console.log("just error")
        return res.status(401).send("Log in again");
    }
}

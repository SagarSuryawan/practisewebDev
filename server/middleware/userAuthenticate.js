import JWT from "jsonwebtoken";
const userAuthenticate = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("TOKEN FROM COOKIE:", token); // Add this

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authenticated"
        });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid token",
            message:error.message

        });
    }
}


export default userAuthenticate
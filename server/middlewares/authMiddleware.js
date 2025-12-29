// import jwt from 'jsonwebtoken';

// const protect = async (req,res,next) => {
//     const token = req.headers.authorization;
//     if(!token){
//         return res.status(401).json({message:"unauthorized"})
//     }
//     try {
        
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)
//         req.userId = decoded.userId
//         next();
//     } catch (error) {
//         return res.status(401).json({message:"unauthorized"});
//     }
    
// }

// export default protect;





import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check if header exists and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "unauthorized" });
        }

        // Extract token (remove "Bearer ")
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to request object
        req.userId = decoded.userId;

        // Pass control to next middleware
        next();

    } catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
};

export default protect;

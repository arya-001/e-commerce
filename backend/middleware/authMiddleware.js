import JWT from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error + "require signin");
    res
      .statsus(500)
      .json({ success: false, message: " Error in require signin middleware" });
  }
};

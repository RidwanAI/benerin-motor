import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

export const adminRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const admin = await Admin.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!admin[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.ADMIN_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const adminId = admin[0].id;
        const name = admin[0].name;
        const email = admin[0].email;
        const accessToken = jwt.sign(
          { adminId, name, email },
          process.env.ADMIN_ACCESS_TOKEN_SECRET,
          {
            expiresIn: "60s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

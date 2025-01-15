// controllers/adminRefreshToken.js
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

export const adminRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.adminRefreshToken;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const admin = await Admin.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!admin) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.ADMIN_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const adminId = admin.id;
        const name = admin.name;
        const email = admin.email;

        const accessToken = jwt.sign(
          { adminId, name, email },
          process.env.ADMIN_ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );

        res.json({ accessToken, email });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.email,
      },
      attributes: ["id", "name", "email"],
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (password != cpassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email Tidak Ditemukan" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;

    // Find current user
    const user = await Users.findOne({
      where: {
        email: req.email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // If password change is requested, verify current password
    if (currentPassword && newPassword) {
      const validPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ msg: "Password saat ini tidak valid" });
      }

      // Hash new password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(newPassword, salt);

      // Update user with new password
      await user.update({
        name,
        email,
        password: hashPassword,
      });
    } else {
      // Update user without changing password
      await user.update({
        name,
        email,
      });
    }

    res.json({ msg: "Profil berhasil diperbarui" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const deleteMe = async (req, res) => {
  try {
    const { confirmationEmail } = req.body;

    // Log untuk debugging
    console.log("Request email:", req.email);
    console.log("Confirmation email:", confirmationEmail);

    // Find current user
    const user = await Users.findOne({
      where: {
        email: req.email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Log untuk debugging
    console.log("User email from DB:", user.email);

    // Verify confirmation email matches user's email
    if (confirmationEmail !== user.email) {
      return res.status(400).json({
        msg: "Email konfirmasi tidak sesuai",
        debug: {
          confirmationEmail,
          userEmail: user.email,
        },
      });
    }

    // Delete the user
    await user.destroy();

    // Clear refresh token cookie
    res.clearCookie("refreshToken");

    res.json({ msg: "Akun berhasil dihapus" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

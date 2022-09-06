import { Request, Response } from "express";
import Usuario from "../models/usuarios";

// Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json({ usuarios });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      message: `No existe el usuario con id: ${id}`,
    });
  } else {
    res.json(usuario);
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });

    if (existeEmail) {
      return res
        .status(400)
        .json({ message: `Ya existe un usuario con el email: ${body.email}` });
    } else {
      const usuario = new Usuario(body);
      await usuario.save();

      res.json(usuario);
    }
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      message: "Contacta a tu administrador de TI",
    });
  }

  res.json({
    message: "POST Usuario",
    body,
  });
};

export const setUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res
        .status(404)
        .json({ message: `El usuario con id: ${id} no existe` });
    } else {
      if (body.email) {
        const existeEmail = await Usuario.findOne({
          where: {
            email: body.email,
          },
        });

        if (existeEmail) {
          return res.status(400).json({
            message: `Ya existe un usuario con el email: ${body.email}`,
          });
        }
      }

      await usuario.update(body);

      res.json(usuario);
    }
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      message: "Contacta a tu administrador de TI",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      message: `El usuario con id: ${id} no existe`,
    });
  }

  // Eliminación física
  // await usuario.destroy();

  // Eliminación lógica
  await usuario.update({ estado: false });

  res.json({
    message: "Usuario eliminado existosamente",
    usuario,
  });
};

import { Request, Response } from "express";

export const getUsuarios = (req: Request, res: Response) => {
  res.json({
    message: "GET Usuarios",
  });
};

export const getUsuario = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    message: "GET Usuario",
    id,
  });
};

export const createUsuario = (req: Request, res: Response) => {
  const { body } = req;

  res.json({
    message: "POST Usuario",
    body,
  });
};

export const setUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({
    message: "PUT Usuario",
    id,
    body,
  });
};

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    message: "DELETE Usuario",
    id,
  });
};

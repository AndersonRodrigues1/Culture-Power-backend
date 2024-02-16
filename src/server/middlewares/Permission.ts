/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/adminService';
import { StatusCodes } from 'http-status-codes';
import { jwtPayload } from '../entities/login';
import jwt, { verify } from 'jsonwebtoken';

const adminService = new AdminService();

export async function isAdmin (
  req: Request,
  res: Response,
  next: NextFunction){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ errors:'No token provided!' });
    }
    
    const token = authHeader.split(' ')[1];
    console.log(token)
    const { id } = jwt.verify(token, process.env.AUTH_CONFIG as string)as jwtPayload ;
    console.log(id)
    const getByadmin = await adminService.getById(id as string)
    console.log(getByadmin)
    if(getByadmin === null) {
      return res.status(StatusCodes.UNAUTHORIZED).json( console.log('Permission denied!') )
    }
    next();
};
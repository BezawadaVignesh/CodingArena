import { NextFunction, Request, Response, Router } from "express";
import * as standingService from '../services/standings.service';

const router = Router()

// router.get('/update/ratings', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log('Hello')
//       res.json(await standingService.updateProfile());
//     } catch (error) {
//       next(error);
//     }
// })

// router.get('/ratings', async (req: Request, res: Response, next: NextFunction) => {
//     try {

//       res.json(await standingService.getUserProfile());
//     } catch (error) {
//       next(error);
//     }
//   })

router.get('/standings', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await standingService.getStandings());
  } catch (error) {
    next(error);
  }
})


export default router;
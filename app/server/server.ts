// import SessionClient from '../database/sessionClient.ts'
//
// //<editor-fold desc = "imported packages, database connection, and middleware.">
// import express, {NextFunction, Request, Response} from 'express'
// import cors from 'cors'
// import session from 'express-session'
// import {connectToDatabase} from "../database/database.ts";
// import path from 'node:path'
//
// import connectMongo from 'connect-mongodb-session'
// import {ObjectId} from "mongodb";
// import SinglePlayerGameConfiguration from "../game-creation/SinglePlayerGameConfiguration.ts";
// import {gameFactory} from "../game-creation/gameFactory.ts";
// import Player from "../game-creation/player.ts";
// import {generateNumbers} from "~/app/utilities/generateNumbers.ts";
// import cookieParser from "cookie-parser"
// /* this declaration is needed in order to set the isAuth property on Session to true. Without it, typescript is unable to find this
// property.
//  */
// declare module "express-session" {
//     interface SessionData {
//         isAuth: boolean
//         userId?: ObjectId
//         game?: SinglePlayerGameConfiguration
//         destroy: () => void
//         user: Player
//         difficulty: string
//         guesses?: string[]
//     }
// }
// const app = express()
// connectToDatabase().catch(err => console.log(err))
// const sessionClient = new SessionClient()
// const MongoDBStore = connectMongo(session)
// const store = new MongoDBStore(
//     {
//         uri: 'mongodb+srv://minusthat:nfya5rhr6Guqm07e@sessions.g6hwk.mongodb.net/sessions',
//         collection: 'urlsessions'
//     }
// )
// const target = generateNumbers('easy')
// let counter = 0
// let guesses: string[] = []
// app.use(cors())
// app.use(cookieParser())
// app.use(session({
//     secret: 'reach-mastermind',
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie:{
//         secure: false
//     }
// }))
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../../frontend')));
// //</editor-fold>
//
// app.get('/', (req: Request, res: Response) => {
//     res.redirect('/register')
// })
// //<editor-fold desc = "registration">
// app.get('/register', (req: Request, res: Response): void => {
//     res.status(200).sendFile(path.join(__dirname, '../../frontend/register.html'));
// })
// app.post('/register', express.urlencoded({extended: true}), async(req: Request, res: Response) => {
//     try {
//         res.status(201)
//         req.setTimeout(5000, async () => {
//             console.log('Request timed out');
//             res.status(408).send('Request Timeout');
//         });
//         const {username, email, password} = req.body
//         await sessionClient.registerPlayer(username, email, password).catch(err => console.log(`Err: ${err}`))
//         res.redirect('/login')
//     } catch (err: unknown) {
//         console.log(err)
//         res.redirect('/register')
//     }
// })
// //</editor-fold>
//
// //<editor-fold desc = "login"
// app.get('/login', (req, res) => {
//     res.status(200).set({'Content-Type': 'text/html'}).sendFile(path.join(__dirname, '../../frontend/login.html'));
// })
// app.post('/login', express.urlencoded({extended: true}), async (req: Request, res: Response) => {
//     try {
//         const {username, password} = req.body
//         const user: ObjectId | undefined = await sessionClient.validateUser(username, password)
//         if (!user) {
//             console.log('no user.')
//         }
//         // @ts-ignore
//         req.session.userId = user
//         req.session.isAuth = true
//         console.log(req.session.userId)
//         res.redirect('/setup')
//         //redirect to manage state
//     }
//     catch (err) {
//         console.log(`err:${err}`)
//     }
// })
// app.get('/logout', (req,res) => {
//     res.status(200).sendFile(path.join(__dirname, '../../frontend/login.html'))
// })
// app.post('/logout', (req,res) => {
//     try{
//         req.session.destroy((err) => {
//             if (err) {
//                 console.log(err)
//             }
//         })
//         res.end()
//     }
//     catch(err){
//         console.log(err)
//     }
// })
// //</editor-fold>
//
// //<editor-fold desc = "game settings and setup">
//
// // set difficulty
// app.get('/setup', async (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, '../../frontend/setup.html'));
// })
// app.post('/setup', express.urlencoded({extended: true}), async (req: Request, res: Response) => {
//     const user = await sessionClient.returnUserFromId(req.session.userId)
//     req.session.user = user
//     console.log(user)
//     req.session.isAuth = true
//     req.session.difficulty = req.body.difficulty
//     res.status(200).redirect('/play')
//     const generateTargetNumber = async () => {
//         const apiCall = generateNumbers(req.session.difficulty ?? 'easy')
//         // calls the api
//         const randomNumber = await apiCall ?? ''
//         // awaits the result, to return a definite answer
//         const randomNumberArray: string[] = Array.from(randomNumber)
//         // makes an array for the returned result, and returns an empty array to avoid null exceptions
//         return randomNumberArray.filter(item => item !== '\n')
//     }
//     console.log(req.session.difficulty)
// })
// //</editor-fold>
// // will route to a specific endpoint based on difficulty, and or multiplayer.
// //<editor-fold desc = "Begin GamePlay">
//
// // play game
// app.get('/play', (req: Request, res: Response) => {
//     res.status(200).sendFile(path.join(__dirname, '../../frontend/board.html'));
// })
// /* the original idea was to import the startGame method from the SinglePlayerGameConfiguration class,
// but I found it a bit difficult to hold state and avoid generating new numbers each time I pressed a button.
// */
// app.listen(3000, (): void => {
//     console.log('server is running.')
// })
// //</editor-fold>
//

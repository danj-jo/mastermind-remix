import EasyBoard from "../components/EasyBoard.js"
import { useLoaderData } from "react-router";
import { ActionFunctionArgs } from "@remix-run/node";
import { gameFactory } from "../game-creation/gameFactory.ts";
import { generateNumbers } from "../utilities/generateNumbers.ts";

export default function Play() {
    return (
        <EasyBoard />
    )
}

export async function action({ request }: ActionFunctionArgs) {
    const target = generateNumbers('easy')
    let counter = 0
    let guesses: string[] = []

    const formData: FormData = await request.formData()
    const box1: string = String(formData.get("boxOne"))
    const box2: string = String(formData.get("boxTwo"))
    const box3: string = String(formData.get("boxThree"))
    const box4: string = String(formData.get("boxFour"))
    console.log(`${box1} ${box2} ${box3} ${box4}`)
    return ''

}

// const start = () => {
//     const game = gameFactory(req.session.user  , req.session.difficulty)
//     // @ts-ignore
//     const newgame = game.startGame()
//     const guess = async (num: string): Promise<string | undefined> => {
//         counter += 1
//         const guessArray: string[] = num ? Array.from(req.body.attempt) : ['']
//         guesses.push(req.body.attempt)
//         console.log(guesses)
//         const targetArray: string | undefined = await target
//         if (guessArray.toString() === targetArray?.toString()) {
//             game.guesses = guesses
//             res.send('you win!')
//             await sessionClient.addGameToDb(game)
//         }
//         // @ts-ignore
//         const gameFeedback = findNumberAndLocation(targetArray, guessArray)
//         console.log(targetArray)
//         if (counter > 10) {
//             game.result="loss"
//             game.guesses = guesses
//             await sessionClient.addGameToDb(game)
//             res.send("Game Over :(")
//             console.log(game)
//         }
//         console.log(gameFeedback)
//         return `${gameFeedback}`
//     }
//     return guess
// }
// let guess = start()
// guess(req.body.attempt)

const findNumberAndLocation = (objective: string[], guess: string[]) => {
    let locationCounter: number = 0
    for (let i = 0; i < objective.length; i++) {
        if (objective[i] == guess[i]) {
            locationCounter++
        }
    } // location
    let numberCounter: number = 0
    const noDuplicates: Set<string> = new Set<string>(objective)
    noDuplicates.forEach(i => {
        if (guess.includes(i)) {
            numberCounter += 1
        }
    })
    // remove duplicates, so this doesn't ruin the data.
    return `${numberCounter} correct numbers, ${locationCounter} correct locations.`
}



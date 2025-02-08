

import {Form, useActionData} from "@remix-run/react";
import {useState} from "react";
import {ActionFunctionArgs} from "@remix-run/node";
import { cors } from "remix-utils/cors";
export default function loader(){
    const data = useActionData<typeof action>();
    const [option, setOptions] = useState("")
    return (
        <div className="menu">
            <h1 className="title">  Difficulty </h1>
            <Form method="POST" action ="/setup" onSubmit={()=>{}}>
                <div className="menu-buttons">
                    <input type ="submit" className = "menu-button" name="DIFFICULTY"                                    value="EASY" id="EASY" readOnly ></input>
                    <input type="submit" className = "menu-button" name="DIFFICULTY"                                  value="MEDIUM" id="MEDIUM" readOnly></input>
                    <input type="submit" className = "menu-button" name="DIFFICULTY"                                    value="HARD" id="HARD" readOnly></input>
                </div>
            </Form>
        </div>

    );
}
export const action = async ({request}: ActionFunctionArgs) => {
    try {
        const data = await request.formData()
        const selection = data.get("DIFFICULTY");
        const mockResponse = {
            status: 200,
            statusText: "OK",
            headers: {
                accept: "application/json",
            },
            body: JSON.stringify(selection)
        }
        // @ts-ignore
        console.log(selection);
        // @ts-ignore
        return cors(request, new Response(mockResponse))
    } catch (error) {
       console.log("Hmm.")
    }
}




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
// app.listen(3000, (): void => {
//     console.log('server is running.')
// })
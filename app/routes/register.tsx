import {Form} from "@remix-run/react";

export default function register() {
    return (
        <Form action="/register" id="register-form" method="POST">
            {/*<input type="text" id="username" name="username" required><br>*/}

            {/*    <label for="email">Email:</label>*/}
            {/*    <input type="email" id="email" name="email" required><br>*/}

            {/*        <label for="password">Password:</label>*/}
            {/*        <input type="password" id="password" name="password" required><br>*/}

            {/*            <button id="register-button" class="flow-buttons"> Register</button>*/}
        </Form>
)
}

// ), async(req: Request, res: Response) => {
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
import {Form} from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import sessionClient from "../database/sessionClient.ts"
import {ObjectId} from "mongodb";
import {useActionData} from "@remix-run/react";
import { redirect } from "@remix-run/node";
export default function loader(){
    const data = useActionData<typeof action>();
    return (
        <div className="menu">
            <h1 className = "title"> Login </h1>
        <Form action="/login" id="login-form" method="POST">
            <input placeholder ="username" className = "menu-button" type="text" id="username" name="username" required/><br/>
            <input placeholder="password" className = "menu-button" type="password" id="password" name="password" required/><br/>
            <button className = "menu-button" style = {{color: "#999", marginTop: "8%", border: "none"}} id="register-button" type="submit"> Register</button>
        </Form>
        </div>
    )
}

// @ts-ignore
export async function action({request}: ActionFunctionArgs){
    const client = new sessionClient();
    const body = await request.formData()
    try {
        const username: FormDataEntryValue | string = body.get("username") ?? ""
        const password: FormDataEntryValue | string = body.get("password") ?? ""
        const user: ObjectId | undefined = await client.validateUser(username.toString(), password.toString())
        if (!user) {
            console.log('no user.')
            console.log(user)

        }
        return new Response('', {
            headers: {
                "Set-Cookie": `userid: ${user}`
            }
        })
    } catch (error) {
        return `Error: ${error}`
    }
}

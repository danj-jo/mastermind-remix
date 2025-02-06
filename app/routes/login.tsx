import {Form} from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import sessionClient from "../database/sessionClient.ts"
import {ObjectId} from "mongodb";
import {useActionData} from "@remix-run/react";
import { redirect } from "@remix-run/node";
export default function Login(){
    const actionData = useActionData()
    console.log(actionData)
    return (
        <Form method="POST" id="login-form">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required/><br/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required/><br/>
            <button id="register-button" type="submit"> Login </button>
        </Form>
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
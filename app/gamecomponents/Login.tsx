import {Form} from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import sessionClient from "../database/sessionClient.ts"
import {ObjectId} from "mongodb";
import {useActionData} from "react-router";
export default function Login(){
    const actionData = useActionData()
    return (
        <Form action="/login" id="login-form" method="POST">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required/><br/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required/><br/>
            <button id="register-button" className="flow-buttons" type="submit"> Register</button>
        </Form>
    )
}

export async function action({request}: {request: Request}): Promise<ActionFunctionArgs | string | undefined>{
    const client = new sessionClient();
    const body: FormData = await request.formData()
    try {
        const username: FormDataEntryValue | null  = body.get("username") as string
        const password: FormDataEntryValue | null = body.get("password") as string
        const user: ObjectId | undefined = await client.validateUser(username, password);
        if (!user) {
            console.log('no user.')
        }
    } catch (error) {
        return `Error: ${error}`
    }
}
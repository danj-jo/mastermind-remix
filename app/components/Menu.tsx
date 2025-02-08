import { Button } from "./Button.ts"
import {Form, useActionData} from "@remix-run/react";
import {useState} from "react";
import {ActionFunctionArgs} from "@remix-run/node";
import { cors } from "remix-utils/cors";
export const Menu = () => {
    const data = useActionData<typeof action>();
    const [option, setOptions] = useState("")
    return (
            <div className="menu">
            <h1 className="title"> Mastermind </h1>
                <Form method="POST" onSubmit={()=>{}}>
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
    const data = await request.formData()
    const selection = data.get("DIFFICULTY");
    const mockResponse = {
        status: 200,
        statusText: "OK",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(selection)
    }
    // @ts-ignore
    return cors(request, mockResponse)
}

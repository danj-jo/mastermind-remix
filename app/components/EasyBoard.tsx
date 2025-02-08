
import { Form, useActionData } from "@remix-run/react";
import { ReactElement } from "react";

interface guessProps {
    input: string
}
export function GuessBox(id: guessProps): ReactElement {
    const data = useActionData()
    return (
        <input type="text"
            maxLength={1}
            id={id.input}
            name={id.input}
            className="guess-box"
            onKeyUp={() => { }}
        >
        </input>
    )
}

export default function EasyBoard(): ReactElement {
    return (
        <Form className="board" method="POST">
            <div className="guess-boxes">
                <GuessBox input={"boxOne"} />
                <GuessBox input={"boxTwo"} />
                <GuessBox input={"boxThree"} />
                <GuessBox input={"boxFour"} />
            </div>
            <button type={"submit"} className="guess-button"> Guess </button>
        </Form>
    )

}
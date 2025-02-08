import { FC, ReactElement } from "react"
interface buttonProps {
    name: string
}
export const Button = (props: buttonProps): ReactElement => {
    return (
        <button className="menu-button"> {props.name} </button>
    )
}
import * as React from "react"
import * as GlobalStyles from "./global.module.css"

export class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div className={GlobalStyles.card}>
                {this.props.children}
            </div>
        )
    }
}
import { Link } from "gatsby"
import * as React from "react"
import * as Styles from "./menubar.module.css"


export class MenuBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectorClass: null,
            updateThemeAction: props.updateThemeAction
        }
    }

    componentDidMount() {
        if (typeof window !== `undefined`) {
            if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                this.themeDark(true)
            } else {
                this.themeDark(false)
            }
        }
    }

    themeDark(t) {
        this.setState({ selectorClass: t ? Styles.selectorDark : Styles.selectorLight })
        this.state.updateThemeAction(t)
    }
    render() {
        return (
            <div id={Styles.menubar}>
                <span className={Styles.menuItem}>
                    <h1><a href="/">Atulya Weise</a></h1>
                </span>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end" }}>
                    <span className={Styles.menuItem}><Link to="/tags/swift">Swift</Link></span>
                    <span className={Styles.menuItem}><Link to="/tags/go">Go</Link></span>
                    <span className={Styles.menuItem}><Link to="/tags/other">Other</Link></span>
                    <span className={Styles.menuItem}>
                        <span id={Styles.uiModeToggle} onClick={() => this.themeDark(this.state.selectorClass === Styles.selectorLight)}>
                            <div id={Styles.uiModeSelector} className={this.state.selectorClass}></div>
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}
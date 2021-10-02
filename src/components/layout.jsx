import * as React from "react"
import { MenuBar } from "./menubar"
import * as Styles from "./layout.module.css"
import { StaticImage } from "gatsby-plugin-image"

class Layout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rootClass: []
        }
    }
    componentDidMount() {
        console.log("hi")
        var rootClass = this.state.rootClass
        if (typeof window !== `undefined`) {
            if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                themeDark(true)
            } else {
                themeDark(false)
            }
        }

        function themeDark(t) {
            rootClass = t ? Styles.themeDark : Styles.themeLight
        }

        this.setState({
            rootClass: rootClass
        })
    }

    render() {
        return (
            <div id={Styles.root} className={this.state.rootClass}>
                <MenuBar updateThemeAction={(newDark) => {
                    this.setState({
                        rootClass: newDark ? Styles.themeDark : Styles.themeLight
                    })
                }}></MenuBar>
                <main id={Styles.content}>
                    <article>
                        {this.props.children}
                    </article>
                </main>
                <div className={Styles.socialFooter}>
                    <a href="https://github.com/atultw">
                        <StaticImage src="../images/GitHub-Mark-Light-120px-plus.png" style={{width: 40}}></StaticImage>
                    </a>
                </div>
            </div>
        )
    }
}

export default Layout

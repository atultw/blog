import { Component } from "react";
import * as React from "react";
import { Link } from "gatsby";
import * as Styles from "./ArticlePreview.module.css"
import * as GlobalStyles from "./global.module.css"


export class ArticlePreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: props.post,
            hover: false
        }
    }

    render() {
        const title = this.props.post.frontmatter.title || this.props.post.fields.slug
        return (
            <Link to={this.props.post.fields.slug} itemProp="url" style={{ color: "white", textDecoration: "none"}}>
                <div onMouseEnter={() => this.setState({ post: this.state.post, hover: true })}
                    onMouseLeave={() => this.setState({ post: this.state.post, hover: false })}
                    className={Styles.articlePreviewWrapper} style={{
                        display: "grid",
                        border: `3px solid ${this.props.post.frontmatter.colorOne}`,
                        gridTemplateRows: "1fr fit-content(100px)"
                    }}>
                    {/* https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript */}
                    <div className={Styles.gradientRectangle} style={{
                        background: `${this.props.post.frontmatter.colorOne}`,
                        color: "white",
                        padding: "10px"
                    }}>
                        <h2>
                            <span itemProp="headline">{title}</span>
                        </h2>
                        <small>{this.props.post.frontmatter.date}</small><br />
                    </div>
                    <div className={Styles.articlePreviewContent} style={{ background: this.state.hover ? `${this.props.post.frontmatter.colorOne}` : "none", color: this.state.hover ? "white" : "black" }}>

                        <div
                            // dangerouslySetInnerHTML={{
                            //     __html: 
                            // }}
                            style={{ webkitLineClamp: this.state.hover ? "2" : "1" }}
                            className={Styles.lineLimited}
                            itemProp="description"
                        >
                            {this.props.post.frontmatter.description || this.props.post.excerpt}
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
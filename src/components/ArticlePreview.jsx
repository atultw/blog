import { Component } from "react";
import * as React from "react";
import { Link } from "gatsby";
import * as Styles from "./ArticlePreview.module.css"
import * as GlobalStyles from "./global.module.css"
import { Card } from "./Card";


export class ArticlePreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: props.post
        }
    }

    render() {
        const title = this.props.post.frontmatter.title || this.props.post.fields.slug
        return (
            <Card>
                <div className={Styles.articlePreviewWrapper}>
                    {/* https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript */}
                    <div className={Styles.gradientRectangle} style={{
                        background: "linear-gradient(" +
                            "white"
                            + ","
                            + "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16) })
                            + ")",
                    }
                    } />
                    <div className={Styles.articlePreviewContent}>
                        <h2>
                            <Link to={this.props.post.fields.slug} itemProp="url">
                                <span itemProp="headline">{title}</span>
                            </Link>
                        </h2>
                        <small>{this.props.post.frontmatter.date}</small><br />
                        <p
                            dangerouslySetInnerHTML={{
                                __html: this.props.post.frontmatter.description || this.props.post.excerpt,
                            }}
                            itemProp="description"
                        />
                    </div>
                </div>
            </Card>
        )
    }
}
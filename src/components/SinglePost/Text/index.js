import { Component } from "react";
import { connect } from "react-redux";
import classes from './styles.module.scss'

export const Text = (props) => {
    return <div>
        {
            props.paragraphs.map(paragraph => {
                return <p key={props.paragraphs.indexOf(paragraph)} className={classes.commentParagraph}>{paragraph}</p>
            })
        }
    </div>
}
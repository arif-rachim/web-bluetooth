import styles from "./Button.module.css";
import {HTMLProps} from "react";

export function Button(props:HTMLProps<'button'>){
    const {children,...properties} = props;
    // @ts-ignore
    return <button className={styles.button} {...properties} >{children}</button>
}
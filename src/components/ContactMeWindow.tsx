import "./ContactMeWindow.css"
import React from "react";


interface ContactMeWindowProps {

}

const ContactMeWindow: React.FC<ContactMeWindowProps> = (props: ContactMeWindowProps) => {
    return <div id="ContactMe">
        <div className="ContactMeField">
            <p>From:</p>
            <input placeholder="example@mail.com"/>
        </div>
        <div className="ContactMeField">
            <p>To:</p>
            <input value="me@gradyn.com" disabled/>
        </div>
        <div className="ContactMeField">
            <p>Cc:</p>
            <input disabled/>
        </div>
        <div id="ContactMeEditor">
            <textarea placeholder="Your message here.."/>
        </div>
        <div style={{width: "100%", textAlign: "center"}}>
            <button id={"ContactMeSubmit"}>Submit</button>
        </div>
    </div>
}

export default ContactMeWindow;
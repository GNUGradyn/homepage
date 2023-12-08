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
    </div>
}

export default ContactMeWindow;
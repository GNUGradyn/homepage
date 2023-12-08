import "./ContactMeWindow.css"
import React from "react";


interface ContactMeWindowProps {

}

const ContactMeWindow: React.FC<ContactMeWindowProps> = (props: ContactMeWindowProps) => {
    return <div id="ContactMe">
        <div className="ContactMeField">
            <p>to email:</p>
            <input value="me@gradyn.com" disabled/>
        </div>
        <div className="ContactMeField">
            <p>from email:</p>
            <input/>
        </div>
        <div className="ContactMeField">
            <p>Subject:</p>
            <input/>
        </div>
        <textarea/>
        <button id="ContactMeSubmit">Send Email</button>
    </div>
}

export default ContactMeWindow;
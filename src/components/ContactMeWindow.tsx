import "./ContactMeWindow.css"
import React, {useRef, useState} from "react";


interface ContactMeWindowProps {

}

const ContactMeWindow: React.FC<ContactMeWindowProps> = (props: ContactMeWindowProps) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const [sendingEmail,setSendingEmail] = useState(false);
    const [sentEmail,setSentEmail] = useState(false);
    const [emailWasSuccessful, setEmailWasSuccessful] = useState(true);


    const handleClick = () => {
        setSendingEmail(true);
        const myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": emailRef.current?.value,
            "message": messageRef.current?.value
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("https://api.gradyn.com/mail", requestOptions)
            .then(result => {
                setSentEmail(true)
                setSendingEmail(false);
            })
            .catch(error => {
                console.log('error', error)
                setSentEmail(true)
                setSendingEmail(false);
                setEmailWasSuccessful(false);
            });
    }

    return <div id="ContactMe">
        <div className="ContactMeField">
            <p>From:</p>
            <input ref={emailRef} placeholder="example@mail.com"/>
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
            <textarea ref={messageRef} placeholder="Your message here.."/>
        </div>
        <div style={{width: "100%", textAlign: "center"}}>
            {sentEmail ? <button id={"ContactMeSubmit"} disabled>{emailWasSuccessful ? "Sent" : "Error"}</button> : sendingEmail ?
                <button id={"ContactMeSubmit"} disabled>Sending</button> :
                <button onClick={handleClick} id={"ContactMeSubmit"}>Submit</button>}
        </div>
    </div>
}

export default ContactMeWindow;
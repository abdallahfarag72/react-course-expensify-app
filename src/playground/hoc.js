// Higher Order Components (HOC) - A component(HOC) that renders another component.
//The goal of Higher Order Components is:
    // Reuse Code
    // Render hijacking
    // Prop Manipulation
    // Abstract State

import React from "react";
import ReactDOM  from "react-dom";

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is {props.info}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is a private info please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>You Cannot View this content.</p>}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info='what the minions did during ww2'/>, document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={true} info='what the minions did during ww2' />, document.getElementById('app'))

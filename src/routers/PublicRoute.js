import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";


const PubliceRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? (
        <Navigate to='/dashboard' />
    ) : (
        <div>
            {children}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid,
    };
};

export default connect(mapStateToProps)(PubliceRoute);
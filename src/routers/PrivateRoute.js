import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";

//! Route V6 uses this to properly use Private routes
const PrivateRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? (
        <div>
            <Header />
            {children}
        </div>
    ) : (
        <Navigate to="/" />
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid,
    };
};

export default connect(mapStateToProps)(PrivateRoute);
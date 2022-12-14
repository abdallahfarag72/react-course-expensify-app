import React from "react";
import { Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"; //new update in react-router (used instead of <Router>)
import { createBrowserHistory } from "history";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";



export const history = createBrowserHistory()


const AppRouter = () => (
    <HistoryRouter history={history} >
        <div>
            <Routes>
                <Route path='/' element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                <Route path='/dashboard' element={
                    <PrivateRoute>
                        <ExpenseDashboardPage />
                    </PrivateRoute>
                } />
                <Route path='/create' element={
                    <PrivateRoute>
                        <AddExpensePage />
                    </PrivateRoute>
                } />
                <Route path='/edit/:id' element={
                    <PrivateRoute>
                        <EditExpensePage />
                    </PrivateRoute>
                } />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    </HistoryRouter>
)

export default AppRouter
import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";






const AppRouter = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<ExpenseDashboardPage />} />
            <Route path='/create' element={<AddExpensePage />} />
            <Route path='/edit/:id' element={<EditExpensePage />} />
            <Route path='/help' element={<HelpPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
)

export default AppRouter
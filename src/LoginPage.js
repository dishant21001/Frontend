import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = () => {
    const handleLogin = (username, password) => {
        // Here, you can handle the login logic, for example, make an API call.
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="login-page">
            <h1>Welcome to Our Website</h1>
            <h2>Please Login</h2>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default LoginPage;

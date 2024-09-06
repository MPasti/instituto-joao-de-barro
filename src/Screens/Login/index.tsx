import LoginForm from '../../components/LoginForm';

export const Login = () => {
    const handleLogin = (email: string, password: string) => {
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <LoginForm onLogin={handleLogin} />
            </div>
        </div>
    );
};

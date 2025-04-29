import { useState } from 'react';
import { Button } from './Button';

// Login component allows the user to either:
// - Create a new account
// - Log into an existing account
const Login = ({ onLogin, onCreate }) => {
    // States for login form inputs
    const [loginUsername, setLoginUsername] = useState();
    const [loginPassword, setLoginPassword] = useState();

    // States for account creation form inputs
    const [createUsername, setCreateUsername] = useState();
    const [createPassword, setCreatePassword] = useState();

    // Handles logging in
    const handleLogin = () => {
        let valid = true;
        if (!loginUsername) {
            valid = false;
        } else if (!loginPassword) {
            valid = false;
        }

        // Future checks can be added here (e.g., server validation)

        if (valid) {
            onLogin(loginUsername, loginPassword);
        }
        return;
    };

    // Handles account creation
    const handleCreate = () => {
        let valid = true;
        if (!createUsername) {
            valid = false;
        } else if (!createPassword) {
            valid = false;
        }

        // Future checks can be added here (e.g., username already taken)

        if (valid) {
            onCreate(createUsername, createPassword);
        }
        return;
    };

    return (
        <>
            {/* Main layout: two side-by-side forms */}
            <div className="flex flex-row gap-10">

                {/* Create new account section */}
                <div className="flex flex-col bg-[var(--foreground)] text-[var(--water-dark)] shadow-lg px-4 py-2 rounded-xl gap-2">
                    <h1 className="flex text-xl justify-center">
                        create a new account
                    </h1>

                    {/* Input fields for username and password */}
                    <div className="flex flex-col bg-[var(--menu-light)] p-2 rounded-xl border-2 border-[var(--water-dark)] gap-2">
                        <input
                            className="focus:outline-none"
                            placeholder="username..."
                            onChange={(e) => {
                                setCreateUsername(e.target.value);
                            }}
                        ></input>
                        <input
                            className="focus:outline-none"
                            placeholder="password..."
                            onChange={(e) => setCreatePassword(e.target.value)}
                            type="password"
                        ></input>
                    </div>

                    {/* Create account button */}
                    <Button
                        buttonText="create!"
                        variant="secondary"
                        onClick={handleCreate}
                    />
                </div>

                {/* Log into existing account section */}
                <div className="flex flex-col bg-[var(--foreground)] text-[var(--water-dark)] shadow-lg px-4 py-2 rounded-xl gap-2">
                    <h1 className="flex text-xl justify-center">
                        log into an existing account
                    </h1>

                    {/* Input fields for username and password */}
                    <div className="flex flex-col bg-[var(--menu-light)] p-2 rounded-xl border-2 border-[var(--water-dark)] gap-2">
                        <input
                            className="focus:outline-none"
                            placeholder="username..."
                            onChange={(e) => {
                                setLoginUsername(e.target.value);
                            }}
                        ></input>
                        <input
                            className="focus:outline-none"
                            placeholder="password..."
                            onChange={(e) => {
                                setLoginPassword(e.target.value);
                            }}
                            type="password"
                        ></input>
                    </div>

                    {/* Login button */}
                    <Button
                        buttonText="login!"
                        variant="secondary"
                        onClick={handleLogin}
                    />
                </div>

            </div>
        </>
    );
};

export { Login };

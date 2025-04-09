import { useState } from 'react';
import { Button } from './Button';

const Login = ({ onLogin, onCreate }) => {
    const [loginUsername, setLoginUsername] = useState();
    const [loginPassword, setLoginPassword] = useState();

    const [createUsername, setCreateUsername] = useState();
    const [createPassword, setCreatePassword] = useState();

    const handleLogin = () => {
        let valid = true;
        if (!loginUsername) {
            valid = false;
        } else if (!loginPassword) {
            valid = false;
        }

        // add in checks
        // ex) already in use

        if (valid) {
            onLogin(loginUsername, loginPassword);
        }
        return;
    };

    const handleCreate = () => {
        let valid = true;
        if (!createUsername) {
            valid = false;
        } else if (!createPassword) {
            valid = false;
        }

        // add in checks
        // ex) already in use, no input

        if (valid) {
            onCreate(createUsername, createPassword);
        }
        return;
    };

    return (
        <>
            <div className="flex flex-row gap-10">
                <div className="flex flex-col bg-[var(--foreground)] text-[var(--water-dark)] shadow-lg px-4 py-2 rounded-xl gap-2">
                    <h1 className="flex text-xl justify-center">
                        create a new account
                    </h1>

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

                    <Button
                        buttonText="create!"
                        variant="secondary"
                        onClick={handleCreate}
                    />
                </div>

                <div className="flex flex-col bg-[var(--foreground)] text-[var(--water-dark)] shadow-lg px-4 py-2 rounded-xl gap-2">
                    <h1 className="flex text-xl justify-center">
                        log into an existing account
                    </h1>

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

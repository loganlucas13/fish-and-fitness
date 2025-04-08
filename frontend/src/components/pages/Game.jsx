import { Button } from '../Button';
import { Profile } from '../Profile';
import { Login } from '../Login';
import { Backpack, BookText, Cat, ChartLine, Goal } from 'lucide-react';

import { useState } from 'react';

function Game() {
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState(null);

    const loginUser = (username, password) => {
        console.log(username, password);
    };

    const createUser = (username, password) => {
        console.log(username, password);
    };

    return (
        <>
            <div className="w-full h-screen p-4">
                <div className="flex flex-col justify-between items-center gap-40">
                    <div className="flex flex-row gap-4 w-fit">
                        <Button buttonText="fishapedia" icon={<BookText />} />
                        <Button buttonText="your goals" icon={<Goal />} />
                        <Button
                            buttonText="statistics"
                            icon={<ChartLine />}
                        ></Button>
                        <Button
                            buttonText="backpack"
                            icon={<Backpack />}
                        ></Button>
                    </div>

                    <div className="flex flex-col items-center gap-20">
                        {username ? (
                            <Profile />
                        ) : (
                            <div className="flex flex-col">
                                {!showLogin ? (
                                    <Button
                                        buttonText={'Click here to log in!'}
                                        onClick={() => {
                                            setShowLogin(true);
                                        }}
                                    ></Button>
                                ) : (
                                    <Login
                                        onLogin={loginUser}
                                        onCreate={createUser}
                                    />
                                )}
                            </div>
                        )}
                        <Cat size={64} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;

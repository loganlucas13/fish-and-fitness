import { Button } from '../Button';
import { Character } from '../Character';
import { Login } from '../Login';
import { FishapediaDisplay } from '../FishapediaDisplay';
import { GoalsDisplay } from '../GoalsDisplay';
import { StatsDisplay } from '../StatsDisplay';
import { BackpackDisplay } from '../BackpackDisplay';
import { Backpack, BookText, ChartLine, Goal } from 'lucide-react';

import { useState } from 'react';

function Companion() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [showLogin, setShowLogin] = useState(false);
    const [showFishapedia, setShowFishapedia] = useState(false);
    const [showGoals, setShowGoals] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showBackpack, setShowBackpack] = useState(false);

    const loginUser = (username, password) => {
        console.log(
            'creating user!\nusername: ' + username + '\npassword: ' + password
        );
        setUsername(username);
        setPassword(password);

        // check password with info from database, then hide login page if correct
        setShowLogin(false);
    };

    const createUser = (username, password) => {
        console.log(
            'creating user!\nusername: ' + username + '\npassword: ' + password
        );
        // add code to create user by adding them to database
    };

    return (
        <>
            <div className="w-full h-screen p-4">
                <div className="flex flex-col justify-between items-center h-full">
                    {username && (
                        <div className="flex flex-row gap-4 w-fit">
                            <Button
                                buttonText="fishapedia"
                                icon={<BookText />}
                                onClick={() =>
                                    setShowFishapedia(!showFishapedia)
                                }
                            />
                            <Button
                                buttonText="your goals"
                                icon={<Goal />}
                                onClick={() => setShowGoals(!showGoals)}
                            />
                            <Button
                                buttonText="statistics"
                                icon={<ChartLine />}
                                onClick={() => setShowStats(!showStats)}
                            ></Button>
                            <Button
                                buttonText="backpack"
                                icon={<Backpack />}
                                onClick={() => setShowBackpack(!showBackpack)}
                            ></Button>
                        </div>
                    )}

                    <div className="flex flex-col items-center justify-center w-full h-full">
                        {username ? (
                            <Character username={username} />
                        ) : (
                            <div className="flex flex-col items-center">
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
                    </div>

                    {showFishapedia && <FishapediaDisplay />}
                    {showGoals && <GoalsDisplay />}
                    {showStats && <StatsDisplay />}
                    {showBackpack && <BackpackDisplay />}
                </div>
            </div>
        </>
    );
}

export default Companion;

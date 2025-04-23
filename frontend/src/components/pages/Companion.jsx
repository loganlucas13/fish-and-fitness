import { Button } from '../Button';
import { Character } from '../Character';
import { Login } from '../Login';
import { FishapediaDisplay } from '../FishapediaDisplay';
import { GoalsDisplay } from '../GoalsDisplay';
import { StatsDisplay } from '../StatsDisplay';
import { BackpackDisplay } from '../BackpackDisplay';
import { Backpack, BookText, ChartLine, Goal } from 'lucide-react';

import { useState, useEffect } from 'react';

function Companion() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [showLogin, setShowLogin] = useState(false);
    const [showFishapedia, setShowFishapedia] = useState(false);
    const [showGoals, setShowGoals] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showBackpack, setShowBackpack] = useState(false);

    const [fishList, setFishList] = useState([]);

    const loginUser = async (username, password) => {
        console.log(
            'creating user!\nusername: ' + username + '\npassword: ' + password
        );

        try {
            console.log(
                'logging in user!\nusername: ' +
                    username +
                    '\npassword: ' +
                    password
            );
            const response = await fetch('http://localhost:8000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('user logged in: ', data);
                setUsername(username);
                setPassword(password);
                setShowLogin(false);
            } else {
                console.error('user not logged in: ', data);
                setShowLogin(true);
            }
        } catch (error) {
            console.error('request failed: ', error);
            setShowLogin(true);
        }
    };

    const createUser = async (username, password) => {
        try {
            console.log(
                'creating user!\nusername: ' +
                    username +
                    '\npassword: ' +
                    password
            );
            const response = await fetch('http://localhost:8000/user/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('user created: ', data);
            } else {
                console.error('user not created: ', data);
            }
        } catch (error) {
            console.error('request failed: ', error);
        }
    };

    const openItem = (item) => {
        console.log(item.name);
    };

    // only fetch fish data upon mounting
    useEffect(() => {
        const getFishList = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/fish/get_data/?username=${username}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error fetching fish data');
                }

                const data = await response.json();
                setFishList(data.fish_data);
            } catch (error) {
                console.error('fish list fetching failed: ', error);
            }
        };

        if (!username) {
            return;
        }

        getFishList();
    }, [username, showFishapedia]);

    useEffect(() => {
        console.log('fishList: ', fishList);
    }, [fishList]);

    const goalList = [
        { name: 'Walk 2 miles', reward: 1, progress: 50 },
        { name: 'Bike 3 miles', reward: 1, progress: 20 },
        { name: 'Run 1 mile', reward: 1, progress: 30 },
        { name: 'Walk 5 miles', reward: 2, progress: 10 },
        { name: 'Walk 2 miles', reward: 1, progress: 50 },
        { name: 'Bike 3 miles', reward: 1, progress: 20 },
        { name: 'Run 1 mile', reward: 1, progress: 30 },
        { name: 'Walk 5 miles', reward: 2, progress: 10 },
    ];

    const statList = [
        { name: 'Total distance walked', amount: 10, label: 'miles' },
        { name: 'Total distance ran', amount: 3, label: 'miles' },
        { name: 'Total distance biked', amount: 15, label: 'miles' },
        { name: 'Total goals met', amount: 10, label: 'goals' },
    ];

    const inventoryList = [
        { id: 0, name: 'Fish Crate', rarity: 'Common' },
        { id: 1, name: 'Fish Crate', rarity: 'Rare' },
        { id: 2, name: 'Fish Crate', rarity: 'Legendary' },
        { id: 3, name: 'Fish Crate', rarity: 'Common' },
        { id: 4, name: 'Fish Crate', rarity: 'Common' },
        { id: 5, name: 'Fish Crate', rarity: 'Common' },
    ];

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

                    {showFishapedia && (
                        <FishapediaDisplay fishList={fishList} />
                    )}
                    {showGoals && <GoalsDisplay goalList={goalList} />}
                    {showStats && <StatsDisplay statList={statList} />}
                    {showBackpack && (
                        <BackpackDisplay
                            inventoryList={inventoryList}
                            handleOpening={openItem}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Companion;

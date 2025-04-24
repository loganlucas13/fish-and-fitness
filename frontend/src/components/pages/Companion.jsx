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
    const [inventory, setInventory] = useState([]);
    const [inventoryRefresh, setInventoryRefresh] = useState(0);
    const [goal, setGoal] = useState(null);
    const [randomGoal, setRandomGoal] = useState(null);

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

    const openItem = async (item) => {
        try {
            console.log('opening box!\nrarity: ' + item.rarity);
            const response = await fetch(
                'http://localhost:8000/user/open_crate/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        rarity: item.rarity,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log('box opened: ', data);
                setInventoryRefresh((i) => i + 1);
            } else {
                console.error('box not opened: ', data);
            }
        } catch (error) {
            console.error('request failed: ', error);
        }
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

                const rarityOrder = {
                    Mythical: 0,
                    Legendary: 1,
                    Epic: 2,
                    Rare: 3,
                    Common: 4,
                };

                const sortedFish = data.fish_data.sort((a, b) => {
                    const rarityDiff =
                        rarityOrder[b.rarities] - rarityOrder[a.rarities];
                    if (rarityDiff !== 0) return rarityDiff;
                    return a.fishname.localeCompare(b.fishname); // sort items in the same rarity alphabetically
                });

                setFishList(sortedFish);
            } catch (error) {
                console.error('fish list fetching failed: ', error);
            }
        };

        if (!username) {
            return;
        }

        getFishList();
    }, [username, showFishapedia, inventoryRefresh]);

    useEffect(() => {
        const getInventory = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/user/get_inventory/?username=${username}`,
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

                const rarityOrder = {
                    Mythical: 0,
                    Legendary: 1,
                    Epic: 2,
                    Rare: 3,
                    Common: 4,
                };

                const sortedInventory = data.inventory.sort((a, b) => {
                    const rarityDiff =
                        rarityOrder[b.rarities] - rarityOrder[a.rarities];
                    return rarityDiff;
                });

                setInventory(sortedInventory);
            } catch (error) {
                console.error('fish list fetching failed: ', error);
            }
        };

        if (!username) {
            return;
        }

        getInventory();
    }, [username, showBackpack, inventoryRefresh]); // only fetch inventory upon mounting, refresh, or opening of screen

    const fetchQuest = async () => {
        setGoal(null);
        try {
            const response = await fetch(`http://localhost:8000/quest/grab/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching quest data');
            }

            const data = await response.json();

            setRandomGoal(data);
        } catch (error) {
            console.error('quest fetching failed: ', error);
        }
    };

    const acceptQuest = async () => {
        try {
            const response = await fetch(
                'http://localhost:8000/quest/accept/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        quest: goal,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Error fetching quest data');
            }

            const data = await response.json();

            setGoal(randomGoal); // change this to the goal received from the server once the server functionality for quests is implemented
        } catch (error) {
            console.error('quest accepting failed: ', error);
        }
    };

    const updateProgress = async () => {
        try {
            console.log('updating progress');
            const response = await fetch(
                `http://localhost:8000/quest/update/?username=${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error fetching quest data');
            }

            const data = await response.json();

            // setGoal(data); // update client-side goal display with update progress values
        } catch (error) {
            console.error('quest updating failed: ', error);
        }
    };

    // TEMPORARY
    const statList = [
        { name: 'Total distance walked', amount: 10, label: 'miles' },
        { name: 'Total distance ran', amount: 3, label: 'miles' },
        { name: 'Total distance biked', amount: 15, label: 'miles' },
        { name: 'Total goals met', amount: 10, label: 'goals' },
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
                    {showGoals && (
                        <GoalsDisplay
                            randomGoal={randomGoal}
                            currentGoal={goal}
                            requestFunction={fetchQuest}
                            acceptFunction={acceptQuest}
                            checkProgressFunction={updateProgress}
                        />
                    )}
                    {showStats && <StatsDisplay statList={statList} />}
                    {showBackpack && (
                        <BackpackDisplay
                            inventoryList={inventory}
                            handleOpening={openItem}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Companion;

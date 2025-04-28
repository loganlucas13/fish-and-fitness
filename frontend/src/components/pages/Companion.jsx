import { Button } from '../Button';
import { Character } from '../Character';
import { Reward } from '../Reward';
import { Login } from '../Login';
import { FishapediaDisplay } from '../FishapediaDisplay';
import { GoalsDisplay } from '../GoalsDisplay';
import { BackpackDisplay } from '../BackpackDisplay';
import { Backpack, BookText, ChartLine, Goal } from 'lucide-react';

import { useState, useEffect } from 'react';

function Companion() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [showLogin, setShowLogin] = useState(false);
    const [showFishapedia, setShowFishapedia] = useState(false);
    const [showGoals, setShowGoals] = useState(false);
    const [showBackpack, setShowBackpack] = useState(false);
    const [showReward, setShowReward] = useState(false);

    const [fishList, setFishList] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [inventoryRefresh, setInventoryRefresh] = useState(0);
    const [goal, setGoal] = useState(null);
    const [randomGoal, setRandomGoal] = useState(null);
    const [rewardData, setRewardData] = useState(null);

    const setUpCuckoo = async () => {
        try {
            const response = await fetch('http://localhost:8000/user/set_up_cuckoo/', {
                method: 'POST',
            });
        } catch (error) {
            console.error('request failed: ', error);
        }
    }
    const loginUser = async (username, password) => {
        try {
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

            if (response.ok) {
                setUsername(username);
                setPassword(password);
                setShowLogin(false);
            } else {
                setShowLogin(true);
            }
        } catch (error) {
            console.error('request failed: ', error);
            setShowLogin(true);
        }
    };

    const createUser = async (username, password) => {
        try {
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
                setRewardData(data);
                setShowBackpack(false);
                setShowReward(true);
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
                        rarityOrder[b.rarity] - rarityOrder[a.rarity];
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
            const response = await fetch(
                `http://localhost:8000/quest/grab/?username=${username}`,
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

            setRandomGoal(data);
        } catch (error) {
            console.error('quest fetching failed: ', error);
        }
    };

    const acceptQuest = async () => {
        try {
            const response = await fetch(
                'http://localhost:8000/quest/accept/?username=${username}',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        quest: randomGoal,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Error fetching quest data');
            }

            const data = await response.json();

            setGoal(data);
        } catch (error) {
            console.error('quest accepting failed: ', error);
        }
    };

    const updateProgress = async () => {
        try {
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

            setGoal(data);
        } catch (error) {
            console.error('quest updating failed: ', error);
        }
    };

    useEffect(() => {
        const scanForQuest = async (username) => {
            try {
                const response = await fetch(
                    `http://localhost:8000/quest/get_current_quest/?username=${username}`,
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

                return data;
            } catch (error) {
                console.error('error fetching initial quest', error);
            }
        };

        const fetchQuest = async () => {
            const currentQuest = await scanForQuest(username);
            if (currentQuest && currentQuest.quest_data) {
                setGoal(currentQuest);
            }
        };

        // to ensure that it doesn't append to fetch during the login screen
        if (username) {
            fetchQuest();
        }
    }, [username]);

    const claimQuestReward = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/quest/claim_reward/?username=${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error claiming reward');
            }

            const data = await response.json();
            setGoal(null);
            return data;
        } catch (error) {
            console.error('error fetching initial quest', error);
        }
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
                                onClick={() => {
                                    setShowFishapedia(!showFishapedia);
                                    setShowGoals(false);
                                    setShowBackpack(false);
                                }}
                            />
                            <Button
                                buttonText="your goals"
                                icon={<Goal />}
                                onClick={() => {
                                    setShowFishapedia(false);
                                    setShowGoals(!showGoals);
                                    setShowBackpack(false);
                                }}
                            />
                            <Button
                                buttonText="backpack"
                                icon={<Backpack />}
                                onClick={() => {
                                    setShowFishapedia(false);
                                    setShowGoals(false);
                                    setShowBackpack(!showBackpack);
                                }}
                            ></Button>
                        </div>
                    )}

                    <div className="flex flex-col items-center justify-center w-full h-full">
                        {username ? (
                            <Character username={username} goal={goal} />
                        ) : (
                            <div className="flex flex-col items-center">
                                {!showLogin ? (
                                    <Button
                                        buttonText={'Click here to log in!'}
                                        onClick={() => {
                                            setUpCuckoo();
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
                            claimRewardFunction={claimQuestReward}
                        />
                    )}
                    {showBackpack && (
                        <BackpackDisplay
                            inventoryList={inventory}
                            handleOpening={openItem}
                        />
                    )}
                    {showReward && (
                        <Reward
                            rewardData={rewardData}
                            onClose={() => {
                                setShowReward(false);
                                setShowBackpack(true);
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Companion;

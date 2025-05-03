import { Button } from '../Button';
import { Character } from '../Character';
import { Reward } from '../Reward';
import { Login } from '../Login';
import { FishapediaDisplay } from '../FishapediaDisplay';
import { GoalsDisplay } from '../GoalsDisplay';
import { BackpackDisplay } from '../BackpackDisplay';
import { Backpack, BookText, ChartLine, Goal } from 'lucide-react';

import { useState, useEffect } from 'react';

// Main Companion Component
function Companion() {
    // State for authentication
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    // UI display toggles
    const [showLogin, setShowLogin] = useState(false);
    const [showFishapedia, setShowFishapedia] = useState(false);
    const [showGoals, setShowGoals] = useState(false);
    const [showBackpack, setShowBackpack] = useState(false);
    const [showReward, setShowReward] = useState(false);

    // Game data states
    const [fishList, setFishList] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [inventoryRefresh, setInventoryRefresh] = useState(0); // Used to trigger inventory reload
    const [goal, setGoal] = useState(null); // Current accepted goal
    const [randomGoal, setRandomGoal] = useState(null); // Randomly fetched goal
    const [rewardData, setRewardData] = useState(null); // Reward for crate opening

    // API: Setup (example endpoint hit when login button is clicked)
    const setUpCuckoo = async () => {
        try {
            await fetch('http://localhost:8000/user/set_up_cuckoo/', {
                method: 'POST',
            });
        } catch (error) {
            console.error('request failed: ', error);
        }
    };

    // API: User login
    const loginUser = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
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

    // API: Create a new user account
    const createUser = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8000/user/create/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
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

    // API: Open a crate item from inventory
    const openItem = async (item) => {
        try {
            const response = await fetch('http://localhost:8000/user/open_crate/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, rarity: item.rarity }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('box opened: ', data);
                setRewardData(data);
                setShowBackpack(false);
                setShowReward(true);
                setInventoryRefresh(i => i + 1);
            } else {
                console.error('box not opened: ', data);
            }
        } catch (error) {
            console.error('request failed: ', error);
        }
    };

    // Fetch list of fish when username changes, fishapedia opens, or inventory refreshes
    useEffect(() => {
        const getFishList = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/fish/get_data/?username=${username}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error fetching fish data');
                }

                const data = await response.json();

                // Sort fish by rarity and name
                const rarityOrder = {
                    Mythical: 0,
                    Legendary: 1,
                    Epic: 2,
                    Rare: 3,
                    Common: 4,
                };

                const sortedFish = data.fish_data.sort((a, b) => {
                    const rarityDiff = rarityOrder[b.rarities] - rarityOrder[a.rarities];
                    if (rarityDiff !== 0) return rarityDiff;
                    return a.fishname.localeCompare(b.fishname);
                });

                setFishList(sortedFish);
            } catch (error) {
                console.error('fish list fetching failed: ', error);
            }
        };

        if (username) getFishList();
    }, [username, showFishapedia, inventoryRefresh]);

    // Fetch user's inventory
    useEffect(() => {
        const getInventory = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/user/get_inventory/?username=${username}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error fetching inventory data');
                }

                const data = await response.json();

                // Sort inventory by rarity
                const rarityOrder = {
                    Mythical: 0,
                    Legendary: 1,
                    Epic: 2,
                    Rare: 3,
                    Common: 4,
                };

                const sortedInventory = data.inventory.sort((a, b) => {
                    const rarityDiff = rarityOrder[b.rarity] - rarityOrder[a.rarity];
                    return rarityDiff;
                });

                setInventory(sortedInventory);
            } catch (error) {
                console.error('inventory fetching failed: ', error);
            }
        };

        if (username) getInventory();
    }, [username, showBackpack, inventoryRefresh]);

    // API: Grab a random quest
    const fetchQuest = async () => {
        setGoal(null);
        try {
            const response = await fetch(
                `http://localhost:8000/quest/grab/?username=${username}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
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

    // API: Accept the currently displayed random quest
    const acceptQuest = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/quest/accept/?username=${username}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        quest: randomGoal,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Error accepting quest');
            }

            const data = await response.json();
            setGoal(data);
        } catch (error) {
            console.error('quest accepting failed: ', error);
        }
    };

    // API: Update the progress of the current quest
    const updateProgress = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/quest/update/?username=${username}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (!response.ok) {
                throw new Error('Error updating quest');
            }

            const data = await response.json();
            setGoal(data);
        } catch (error) {
            console.error('quest updating failed: ', error);
        }
    };

    // On username change, check if user already has an active quest
    useEffect(() => {
        const scanForQuest = async (username) => {
            try {
                const response = await fetch(
                    `http://localhost:8000/quest/get_current_quest/?username=${username}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error fetching current quest');
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

        if (username) fetchQuest();
    }, [username]);

    // API: Claim the reward for a completed quest
    const claimQuestReward = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/quest/claim_reward/?username=${username}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (!response.ok) {
                throw new Error('Error claiming reward');
            }

            const data = await response.json();
            setGoal(null);
            return data;
        } catch (error) {
            console.error('error claiming reward', error);
        }
    };

    // Main UI
    return (
        <>
            <div className="w-full h-screen p-4">
                <div className="flex flex-col justify-between items-center h-full">
                    
                    {/* Top Buttons after login */}
                    {username && (
                        <div className="flex flex-row gap-4 w-fit">
                            <Button buttonText="fishapedia" icon={<BookText />} onClick={() => {
                                setShowFishapedia(!showFishapedia);
                                setShowGoals(false);
                                setShowBackpack(false);
                            }} />
                            <Button buttonText="your goals" icon={<Goal />} onClick={() => {
                                setShowFishapedia(false);
                                setShowGoals(!showGoals);
                                setShowBackpack(false);
                            }} />
                            <Button buttonText="backpack" icon={<Backpack />} onClick={() => {
                                setShowFishapedia(false);
                                setShowGoals(false);
                                setShowBackpack(!showBackpack);
                            }} />
                        </div>
                    )}

                    {/* Middle Section */}
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        {username ? (
                            <Character username={username} goal={goal} />
                        ) : (
                            <div className="flex flex-col items-center">
                                {!showLogin ? (
                                    <Button buttonText={'Click here to log in!'} onClick={() => {
                                        setUpCuckoo();
                                        setShowLogin(true);
                                    }} />
                                ) : (
                                    <Login onLogin={loginUser} onCreate={createUser} />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Displays based on toggles */}
                    {showFishapedia && <FishapediaDisplay fishList={fishList} />}
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

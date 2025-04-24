import { ProgressBar } from './ProgressBar';
import { Button } from './Button';

const GoalsDisplay = ({
    randomGoal,
    currentGoal,
    requestFunction,
    acceptFunction,
    checkProgressFunction,
}) => {
    return (
        <>
            <div className="absolute w-2/5 h-3/4 translate-y-20 bg-[var(--foreground)] border-2 border-[var(--water-dark)] rounded-xl shadow-xl">
                <div className="flex items-center justify-center bg-[var(--menu-light)] rounded-t-xl">
                    <h1 className="w-full text-center text-2xl text-[var(--water-dark)] px-4 py-2 ">
                        goals
                    </h1>
                </div>
                <div className="flex flex-col overflow-y-scroll p-4 h-11/12 border-t-2 border-[var(--water-dark)] gap-4 items-center justify-center">
                    {currentGoal ? (
                        <div className="flex flex-col items-center w-full">
                            <Goal
                                goalData={currentGoal}
                                requestFunction={requestFunction}
                                checkProgressFunction={checkProgressFunction}
                                isChosen={true}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {randomGoal && <Goal goalData={randomGoal} />}
                            <div className="flex flex-row space-between gap-4">
                                <Button
                                    variant="secondary"
                                    buttonText="Request new quest"
                                    onClick={() => {
                                        requestFunction();
                                    }}
                                ></Button>
                                <Button
                                    variant="secondary"
                                    buttonText="Accept quest"
                                    onClick={() => {
                                        acceptFunction();
                                    }}
                                ></Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const Goal = ({
    goalData,
    requestFunction,
    checkProgressFunction,
    isChosen,
}) => {
    return (
        <div className="flex flex-col items-center w-full">
            <span className="text-xl text-[var(--water-dark)]">
                Current Quest
            </span>
            <div className="flex flex-col bg-[var(--menu-light)] border-2 border-[var(--water-dark)] rounded-xl px-4 py-2 text-[var(--water-dark)] w-full gap-4">
                <div className="flex flex-row items-center justify-center text-xl">
                    {goalData.quest_data.activity}{' '}
                    {goalData.quest_data.distance} mile(s)
                </div>
                <div className="flex flex-row items-center justify-center text-lg">
                    Reward: {goalData.quest_data.reward_quantity}{' '}
                    {goalData.quest_data.reward_type} fish crate(s)
                </div>
                {isChosen && (
                    <>
                        <ProgressBar progress={50} />
                        <div className="flex flex-row space-between">
                            <Button
                                variant="secondary"
                                buttonText="Reroll quest"
                                onClick={() => {
                                    requestFunction();
                                }}
                            />
                            <div className="flex flex-grow" />
                            <Button
                                variant="secondary"
                                buttonText="Update progress"
                                onClick={() => {
                                    checkProgressFunction();
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export { GoalsDisplay };

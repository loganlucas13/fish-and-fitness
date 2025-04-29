import { ProgressBar } from './ProgressBar';
import { Button } from './Button';

// GoalsDisplay handles showing either:
// - the current active quest
// - or a random quest + options to accept/request
const GoalsDisplay = ({
    randomGoal,
    currentGoal,
    requestFunction,
    acceptFunction,
    checkProgressFunction,
    claimRewardFunction,
}) => {
    return (
        <>
            {/* Outer container for Goals window */}
            <div className="absolute w-2/5 h-3/4 translate-y-20 bg-[var(--foreground)] border-2 border-[var(--water-dark)] rounded-xl shadow-xl">
                {/* Title bar */}
                <div className="flex items-center justify-center bg-[var(--menu-light)] rounded-t-xl">
                    <h1 className="w-full text-center text-2xl text-[var(--water-dark)] px-4 py-2 ">
                        goals
                    </h1>
                </div>

                {/* Content section */}
                <div className="flex flex-col overflow-y-scroll p-4 h-11/12 border-t-2 border-[var(--water-dark)] gap-4 items-center justify-center">

                    {/* If the user has an active quest */}
                    {currentGoal ? (
                        <div className="flex flex-col items-center w-full">
                            <Goal
                                goalData={currentGoal}
                                requestFunction={requestFunction}
                                checkProgressFunction={checkProgressFunction}
                                isChosen={true}
                                claimRewardFunction={claimRewardFunction}
                            />
                        </div>
                    ) : (
                        // Otherwise show a random quest and accept/request buttons
                        <div className="flex flex-col gap-4">
                            {randomGoal && (
                                <Goal goalData={randomGoal} isChosen={false} />
                            )}
                            <div className="flex flex-row space-between gap-4">
                                <Button
                                    variant="secondary"
                                    buttonText="Request new quest"
                                    onClick={() => {
                                        requestFunction();
                                    }}
                                />
                                <Button
                                    variant="secondary"
                                    buttonText="Accept quest"
                                    onClick={() => {
                                        acceptFunction();
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// Goal component handles displaying a single quest (either random or accepted)
const Goal = ({
    goalData,
    requestFunction,
    checkProgressFunction,
    isChosen,
    claimRewardFunction,
}) => {
    // If the goal is accepted, calculate progress %
    const percentComplete =
        goalData.quest_data && isChosen
            ? goalData.quest_data.distance_progress /
              1609 /
              goalData.quest_data.distance
            : 0;

    return (
        <div className="flex flex-col items-center w-full">
            <span className="text-xl text-[var(--water-dark)]">
                Current Quest
            </span>

            {/* Quest information card */}
            <div className="flex flex-col bg-[var(--menu-light)] border-2 border-[var(--water-dark)] rounded-xl px-4 py-2 text-[var(--water-dark)] w-full gap-4">
                
                {/* Activity name and distance */}
                <div className="flex flex-row items-center justify-center text-xl">
                    {goalData.quest_data.activity}{' '}
                    {goalData.quest_data.distance} mile(s)
                </div>

                {/* Reward description */}
                <div className="flex flex-row items-center justify-center text-lg">
                    Reward: {goalData.quest_data.reward_quantity}{' '}
                    {goalData.quest_data.reward_type} fish crate(s)
                </div>

                {/* Show progress and actions if this goal is the chosen quest */}
                {isChosen && (
                    <>
                        {/* Progress bar */}
                        <ProgressBar progress={percentComplete} />

                        {/* If quest not finished, show reroll and update buttons */}
                        {percentComplete < 1.0 ? (
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
                        ) : (
                            // If finished, allow reward claim
                            <Button
                                variant="secondary"
                                buttonText="Get reward!"
                                onClick={() => {
                                    claimRewardFunction();
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export { GoalsDisplay };

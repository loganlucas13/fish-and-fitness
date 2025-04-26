import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

const Profile = ({ username, goal }) => {
    const percentComplete =
        goal && goal.quest_data
            ? goal.quest_data.distance_progress /
              1609 /
              goal.quest_data.distance
            : 0;

    return (
        <>
            <div className="text-lg shadow-lg px-4 py-2 rounded-xl w-full border-2 border-[var(--foreground)]">
                {username && (
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-[var(--foreground)] text-2xl">
                                {username}
                            </h1>

                            <p className="text-[var(--foreground)]">
                                {Math.min(
                                    Math.trunc(percentComplete * 100),
                                    100
                                )}
                                % to next goal completion
                            </p>
                        </div>
                        <ProgressBar progress={percentComplete} />
                    </div>
                )}
            </div>
        </>
    );
};

export { Profile };

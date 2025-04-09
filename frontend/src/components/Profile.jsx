import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

const Profile = ({ username }) => {
    // fetch progress to next level from database
    var progress = 50;

    return (
        <>
            <div className="text-lg shadow-lg px-4 py-2 rounded-xl w-full border-2 border-[var(--foreground)]">
                {username && (
                    <div flex flex-col>
                        <div className="flex flex-row justify-between">
                            <h1 className="text-[var(--foreground)] text-2xl">
                                {username}
                            </h1>

                            <p>{progress}% to next level</p>
                        </div>
                        <ProgressBar progress={progress} />
                    </div>
                )}
            </div>
        </>
    );
};

export { Profile };

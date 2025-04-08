import { Button } from '../components/Button';

const Profile = ({ username }) => {
    return (
        <>
            <div className="bg-[var(--foreground)] text-[var(--water-dark)] text-lg shadow-lg px-4 py-2 rounded-xl">
                {username && <div>logged in</div>}
            </div>
        </>
    );
};

export { Profile };

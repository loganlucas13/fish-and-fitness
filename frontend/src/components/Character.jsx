import { Profile } from './Profile';
import PirateCat from '../assets/pirate_cat.png';
import FishingRod from '../assets/fishing_rod.png';

const Character = ({ username, goal }) => {
    return (
        <>
            <div className="flex flex-col items-center w-3/5">
                <Profile username={username} goal={goal} />

                <div className="relative w-48 h-48">
                    <img
                        src={PirateCat}
                        className="pixel-art absolute top-0 left-0 w-48 h-48 -translate-x-8"
                    ></img>
                    <img
                        src={FishingRod}
                        className="pixel-art rotate-315 absolute w-32 h-32 translate-y-2 bottom-0 right-0"
                    ></img>
                    <div className="bg-[var(--land-dark)] absolute bottom-0 z-[-1] left-1/2 translate-x-[-50%] translate-y-8 rounded-full w-64 h-16 shadow shadow-blue-300"></div>
                </div>
            </div>
        </>
    );
};

export { Character };

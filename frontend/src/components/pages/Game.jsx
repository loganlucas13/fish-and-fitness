import { Button } from '../Button';

function Game() {
    return (
        <>
            <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 flex flex-col gap-4">
                    <Button buttonText="fishapedia" />
                    <Button buttonText="your goals" />
                </div>
            </div>
        </>
    );
}

export default Game;

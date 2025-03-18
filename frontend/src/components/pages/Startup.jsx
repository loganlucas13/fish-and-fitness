import { Title } from '../Title';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { ArrowBigRightDash } from 'lucide-react';

function Startup() {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-6">
                <Title />
                <Link to="/game">
                    <Button
                        buttonText="Start Fishing!"
                        icon={<ArrowBigRightDash />}
                    />
                </Link>
            </div>
        </>
    );
}

export default Startup;

import { useState } from 'react';
import PropTypes from 'prop-types';

const ShipPlacementModal = ({ shipName, onShipPlaced }) => {
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const [orientation, setOrientation] = useState('horizontal');

    const handlePlacement = () => {
        onShipPlaced({
            shipName,
            xCoord,
            yCoord,
            orientation
        });
    };

    return (
        <div className="modal">
            <h2>Place Your {shipName}</h2>
            <div>
                X: <input type="number" value={xCoord} onChange={e => setXCoord(+e.target.value)} />
                Y: <input type="number" value={yCoord} onChange={e => setYCoord(+e.target.value)} />
            </div>
            <div>
                Orientation:
                <label>
                    <input type="radio" value="horizontal" checked={orientation === 'horizontal'} onChange={() => setOrientation('horizontal')} />
                    Horizontal
                </label>
                <label>
                    <input type="radio" value="vertical" checked={orientation === 'vertical'} onChange={() => setOrientation('vertical')} />
                    Vertical
                </label>
            </div>
            <button onClick={handlePlacement}>Place Ship</button>
        </div>
    );
};

ShipPlacementModal.propTypes = {
    shipName: PropTypes.string.isRequired,
    onShipPlaced: PropTypes.func.isRequired
};

export default ShipPlacementModal;

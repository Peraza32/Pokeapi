import Chip from './chip/chip';

import { typeColors } from '../../../Constants/Pokemon';


const Group = ({ titl = "", items = [] }) => {
    return (
        <>
            <h3 className="font-roboto text-sm mt-3">{title}</h3>
            <div className="flex justify-start gap-4py-2 items-center">
                {
                    items.map((item) => (
                        <Chip key={item} item={item} color={typeColors[item]} />
                    ))
                }
            </div>
        </>
    );
};

export default Group;

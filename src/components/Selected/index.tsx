import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Character } from "../../types";
import { calculateValue } from "../../utils";

type Props = {
  characters: Character[];
  handleSelection: (selection: number) => void;
};
const Selected = ({ characters, handleSelection }: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [value, setValue] = useState<{
    power: number;
    mobility: number;
    technique: number;
    survivability: number;
    energy: number;
  }>({
    power: 0,
    mobility: 0,
    technique: 0,
    survivability: 0,
    energy: 0,
  });

  useEffect(() => {
    if (characters.length) {
      setValue({
        power: calculateValue(characters, 3),
        mobility: calculateValue(characters, 2),
        technique: calculateValue(characters, 1),
        survivability: calculateValue(characters, 0),
        energy: calculateValue(characters, 4),
      });
    } else {
      setValue({
        power: 0,
        mobility: 0,
        technique: 0,
        survivability: 0,
        energy: 0,
      });
    }
  }, [characters]);
  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="flex items-center">
        {characters.length < 7 ? (
          characters.map(({ id, name, image }) => (
            <button
              key={id}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative h-20 w-20 overflow-hidden flex items-center justify-center rounded-full shadow-xl mx-2 border border-primary"
            >
              <img
                src={image}
                className="h-full w-full object-cover"
                alt={name}
              ></img>
              {hoveredId === id && (
                <button
                  onClick={() => handleSelection(id)}
                  className="absolute w-full h-full bg-primary bg-opacity-50 flex items-center justify-center"
                >
                  <p className="text-white text-center">Remove</p>
                </button>
              )}
            </button>
          ))
        ) : (
          <div>You can only select 6 Champions</div>
        )}
      </div>
      <Paper className="mt-10 bg-white p-2 rounded-2xl shadow-2xl flex flex-col items-center">
        <div className="flex items-center">
          <div className=" mx-4 my-2 flex flex-col items-center">
            <h2 className="text-sm opacity-50">Power</h2>
            <h3 className="text-3xl mt-2 font-bold">{value.power}</h3>
          </div>
          <div className="mx-4 my-2 flex flex-col items-center">
            <h2 className="text-sm opacity-50">Mobility</h2>
            <h3 className="text-3xl mt-2 font-bold">{value.mobility}</h3>
          </div>
          <hr className="linear-gradient-black h-24"></hr>
          <div className="mx-4 my-2 flex flex-col items-center">
            <h2 className="text-sm opacity-50">Technique</h2>
            <h3 className="text-3xl mt-2 font-bold">{value.technique}</h3>
          </div>
          <hr className="linear-gradient-black h-24"></hr>
          <div className="mx-4 my-2 flex flex-col items-center">
            <h2 className="text-sm opacity-50">Survivability</h2>
            <h3 className="text-3xl mt-2 font-bold">{value.survivability}</h3>
          </div>
          <div className="mx-4 my-2 flex flex-col items-center">
            <h2 className="text-sm opacity-50">Energy</h2>
            <h3 className="text-3xl mt-2 font-bold">{value.energy}</h3>
          </div>
        </div>
        <p className="text-xs mt-2 opacity-50">Totals as average for squad</p>
      </Paper>
    </div>
  );
};

export default Selected;

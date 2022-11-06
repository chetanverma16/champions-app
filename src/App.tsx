import { Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Selected from "./components/Selected";
import jsonData from "./data/characters.json";
import type { Character } from "./types";
const localData: Character[] = jsonData as Character[];

function App() {
  const [selected, setSelected] = useState<Character[]>([]);
  const [data, setData] = useState<Character[]>(localData);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [myTeamActive, setMyTeamActive] = useState<boolean>(false);
  const allTags: string[] = [];
  localData.forEach((character) => {
    if (character.tags) {
      character.tags.forEach((tag) => {
        if (allTags.indexOf(tag.tag_name) === -1) {
          allTags.push(tag.tag_name);
        }
      });
    }
  });

  const handleSelection = (id: number) => {
    const character = data.find((character) => character.id === id);
    if (character) {
      if (selected.includes(character)) {
        setSelected(selected.filter((character) => character.id !== id));
      } else {
        setSelected([...selected, character]);
      }
    }
  };

  const handleTagSelection = (tag: string) => {
    setSearch("");
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleMyTeam = () => {
    setSelectedTags([]);
    setSearch("");
    setMyTeamActive(!myTeamActive);
    if (!myTeamActive) {
      setData(selected);
    }
  };

  useEffect(() => {
    if (!myTeamActive) {
      if (selectedTags.length === 0) {
        setData(localData);
      } else {
        const filtered = localData.filter((character) => {
          if (character.tags) {
            return character.tags.find((characterTag) =>
              selectedTags.includes(characterTag.tag_name)
            );
          }
          return false;
        });
        setData(filtered);
      }
    }
  }, [myTeamActive, selectedTags]);

  useEffect(() => {
    if (!myTeamActive) {
      if (search.length > 2) {
        setData(
          localData.filter(
            (character) =>
              character.name.toLowerCase().includes(search.toLowerCase()) ||
              character.tags?.find((tag) =>
                tag.tag_name.toLowerCase().includes(search.toLowerCase())
              )
          )
        );
      } else {
        setData(localData);
      }
    }
  }, [myTeamActive, search]);

  return (
    <div className="container flex flex-col items-center mx-auto max-w-7xl">
      <Header />
      <h1 className="mt-16 text-3xl">
        {selected.length
          ? "Your Champions"
          : "Select Your Squad to defend the earthrealm"}
      </h1>
      <Selected characters={selected} handleSelection={handleSelection} />
      <div className="mt-10 w-full p-2 flex flex-col items-center">
        <TextField
          label="Search"
          variant="outlined"
          className="w-full bg-white max-w-2xl shadow-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="my-5 flex flex-wrap items-center justify-center">
          {allTags.map((tag) => (
            <Chip
              className={`m-2 cursor-pointer border-primary text-primary ${
                selectedTags.includes(tag) && "bg-primary text-gray-100"
              }`}
              label={tag}
              variant="outlined"
              onClick={() => handleTagSelection(tag)}
            />
          ))}
          <Chip
            key="my-team"
            className={`m-2 cursor-pointer border-primary text-primary ${
              myTeamActive && "bg-primary text-gray-100"
            }`}
            label="My Team"
            variant="outlined"
            onClick={handleMyTeam}
          />
          <Chip
            key="clear"
            className={"m-2 cursor-pointer border-red-400 text-red-500"}
            label="Clear All"
            variant="outlined"
            onClick={() => {
              setSelectedTags([]);
              setData(localData);
            }}
          />
        </div>
        <List
          characters={data}
          selectedIds={selected.map((select) => select.id)}
          handleSelection={handleSelection}
          myTeamActive={myTeamActive}
        />
      </div>
    </div>
  );
}

export default App;

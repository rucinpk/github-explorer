import { useEffect, useState } from "react";
import { listUsers } from "../services/github";
import { useStore } from "../store/userStore";

interface ApiItem {
  login: string;
  id: number;
  node_id: string;
  avatar_ur: string;
}
const SearchComponent = () => {
  const [usernameEntered, setUsernameEntered] = useState<string>("");
  const { setUsers, setCurrentQuery, currentQuery } = useStore();

  const [isApiResponseFetching, setIsApiResponseFetching] =
    useState<boolean>(false);

  useEffect(() => {
    setIsApiResponseFetching(false);
  });

  return (
    <div className="justify-items-center p-3 items-center w-full ">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Enter username"
        onChange={(event) => {
          setUsernameEntered(event.target.value);
        }}
      />
      <button
        className={`${
          usernameEntered ? "bg-blue-500 hover:bg-blue-700" : "bg-blue-200"
        }  flex justify-center items-center mt-3  text-white py-2 px-4 w-full`}
        onClick={async () => {
          setIsApiResponseFetching(true);
          let users = await listUsers(usernameEntered);

          let usersList = users.data.items.map(({ id, login }: ApiItem) => {
            return { id, login, selected: false, repositories: [] };
          });
          setUsers(usersList);
          setCurrentQuery(usernameEntered);
          setIsApiResponseFetching(false);
        }}
        disabled={isApiResponseFetching || !usernameEntered}
      >
        {isApiResponseFetching ? (
          <div className="animate-spin spinner-border h-8 w-8 justify-self-center border-b-2 rounded-full"></div>
        ) : (
          <div>Search</div>
        )}
      </button>
      {currentQuery ? <div>Showing users for "{currentQuery}"</div> : <></>}
    </div>
  );
};

export default SearchComponent;

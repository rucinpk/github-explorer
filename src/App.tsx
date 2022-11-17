import React from "react";
import SearchComponent from "./components/SearchComponent";
import UsersListComponent from "./components/UsersListComponent";

function App() {
  return (
    <div className="App">
      <main>
        <SearchComponent />
        <UsersListComponent />
      </main>
    </div>
  );
}

export default App;

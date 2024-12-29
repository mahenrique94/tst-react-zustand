import { FormEvent, useState } from "react";
import { useShallow } from "zustand/shallow";

import { Container } from "./components/Container";
import { useRepositoriesStore } from "./store";

export const App = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, onSearch } = useRepositoriesStore(
    useShallow((state) => ({
      data: state.data,
      isLoading: state.isLoading,
      onSearch: state.fetch,
    })),
  );

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim().length > 0) {
      onSearch(search);
      setSearch("");
    }
  };

  return (
    <Container>
      <h1>Search GitHub repositories</h1>
      <form className="grid grid-form--search" onSubmit={handleFormSubmit}>
        <input
          aria-busy={isLoading}
          disabled={isLoading}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button aria-busy={isLoading} disabled={isLoading} type="submit">
          Search
        </button>
      </form>
      <small>Showing {data.total_count} github repositories</small>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Language</th>
            <th>Forks</th>
            <th>Issues</th>
            <th>Stars</th>
            <th>Topics</th>
            <th>Watchers</th>
          </tr>
        </thead>
        <tbody>
          {data.items.length > 0 ? (
            data.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <p>
                    <a href={item.html_url} target="_blank">
                      {item.name}
                    </a>
                  </p>
                  <small>{item.description}</small>
                </td>
                <td>
                  <a href={item.owner.html_url} target="_blank">
                    {item.owner.login}
                  </a>
                </td>
                <td>{item.language}</td>
                <td>{item.forks_count}</td>
                <td>{item.open_issues_count}</td>
                <td>{item.stargazers_count}</td>
                <td>{item.topics.join(" - ")}</td>
                <td>{item.watchers_count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
};

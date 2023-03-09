import { useEffect, useState } from "react";
import styles from "./App.module.css";

//Data model API
interface IRepository {
  id: number;
  full_name: string;
  owner: {
    login: string;
  };
}

//Local State
type RepositoryProps = {
  liked: boolean;
} & IRepository; //Union of types

export default function App() {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/orgs/google/repos")
      .then((r) => r.json())
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading && <p>Carregando ...</p>}
      {error && <p>Erro ao carregar dados</p>}
      {repos.map((repo) => {
        return (
          <div key={repo.id} className={styles.list}>
            <h3>{repo.full_name}</h3>
            <span>by {repo.owner.login}</span>
          </div>
        );
      })}
    </div>
  );
}

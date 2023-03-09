import styles from "./App.module.css";

import { useGitHubRepository } from "./hooks/useGitHubRepository";
import { useRepositoryLikeManager } from "./hooks/useRepositoryLikeManager";

export default function App() {
  const { repos, error, isLoading, refetch } = useGitHubRepository({
    orgs: "google",
  });
  const { toggleLike, repositoryLikes } = useRepositoryLikeManager();

  return (
    <div>
      {isLoading && <p>Carregando ...</p>}
      {error && (
        <div>
          <p>Erro ao carregar dados</p>
          <button onClick={refetch}>...recarregar dados</button>
        </div>
      )}
      {repos.map((repo) => {
        const isLiked = repositoryLikes.find((r) => r.id === repo.id)?.liked;

        return (
          <div key={repo.id} className={styles.list}>
            <h3>{repo.full_name}</h3>
            <span>by {repo.owner.login}&nbsp;</span>
            <button onClick={() => toggleLike(repo.id)}>
              {isLiked ? "don't like" : "like"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

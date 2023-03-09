import { useState, useEffect, useCallback } from "react";
import { IGitHubRepository } from "../../types/IGithubRepositoy/IGithubRepository";

type Props = {
  orgs: string;
};

export const useGitHubRepository = ({ orgs }: Props) => {
  const [repos, setRepos] = useState<IGitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(() => {
    fetch(`https://api.github.com/orgs/${orgs}/repos`) //change to env variable
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
  }, []); //never recriate this in memo - keep reference.

  useEffect(() => {
    fetcher();
  }, [fetcher]); //[] wil run this code when the array value changes
  return { repos, isLoading, error, refetch: fetcher }; // refetch when we have erros
};

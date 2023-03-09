import { useEffect, useState } from "react";

//Local State
type RepositoryState = {
  id: string;
  liked: boolean;
};

export const useRepositoryLikeManager = () => {
  const [repositoryLikes, setRepositorLikes] = useState<RepositoryState[]>([]);
  // Verifying LocalStorage and seting local state
  useEffect(() => {
    const storage = localStorage.getItem("repositoryLikes");

    if (storage) {
      setRepositorLikes(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    if (repositoryLikes.length === 0) return;
    localStorage.setItem("repositoryLikes", JSON.stringify(repositoryLikes));
  }, [repositoryLikes]);

  const toggleLike = (id: string) => {
    setRepositorLikes((prevState) => {
      const exists = prevState.find((r) => r.id === id);

      if (exists) {
        return prevState.map((r) =>
          r.id === id ? { ...r, liked: !r.liked } : r
        );
      }

      return [...prevState, { id, liked: true }];
    });
  };

  return { repositoryLikes, toggleLike };
};

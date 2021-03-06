import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './App.module.scss';

function App() {
  const [isShowing, setIsShowing] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const { data: posts } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );

      // Pega apenas os 10 primeiros posts
      posts = posts.splice(0, 10);
      setPosts(posts);
    }

    getPosts();
  }, []);

  function handleRemove(id) {
    const newPosts = [...posts];

    const index = newPosts.findIndex((post) => post.id === id);

    if (index > -1) {
      newPosts.splice(index, 1); // remove item do array
      setPosts(newPosts);
    }
  }

  return (
    <>
      <div className={`${styles.card} ${styles.challenge}`}>
        <h6>desafio</h6>
        <h1 className={isShowing ? styles.hidden : styles.show}>
          Fundamentos ReactJS
        </h1>
        <button
          className={styles.button}
          onClick={() => setIsShowing(!isShowing)}
        >
          {isShowing ? 'Esconder' : 'Mostrar'}
        </button>
      </div>

      <div className={styles.card}>
        <h3>Posts</h3>
        {posts.length
          ? posts.map((post) => (
              <div className={styles.post} key={post.id}>
                <p>{post.id + ' - ' + post.title}</p>
                <div className={styles.actions}>
                  <button>I</button>
                  <button onClick={() => handleRemove(post.id)}>A</button>
                </div>
              </div>
            ))
          : 'Nenhum post localizado'}
      </div>
    </>
  );
}

export default App;

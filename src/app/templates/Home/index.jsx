

import './styles.css';

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

import { loadPosts } from '../../utils/load-posts';
import { useEffect, useState, useCallback } from 'react';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); 
  const [page, setPage] = useState(0); 
  const [postsPerPage ] = useState(10); 
  const [searchValue, setSearchValue] = useState(''); 

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
      posts.filter(posts => 
          posts.title.toLowerCase().includes(searchValue.toLowerCase())
        ) 
      : posts;

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos);
  }, []);

  const handleTextChange = (e) => {
    const {value} = e.target;
    setSearchValue(value);
  }

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;

    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts)

   setPosts(posts);
   setPage(nextPage);
  }

  return (
      <section className="container">
        
        <div className= "search-container">
          {!!searchValue && (
            <>
              <h1>Search value: {searchValue}</h1>
            </>
          )}

          <TextInput value={searchValue} handleTextChange={handleTextChange}/>
        </div>

        {filteredPosts.length > 0 && (<Posts posts={filteredPosts}/>)}

        {filteredPosts.length === 0 && (<p>Não existem posts</p>)}
        
        <div className='button-container'>
          {!searchValue && (
            <Button 
              onClick={loadMorePosts} 
              label={'Load more posts'} 
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    ); 
}
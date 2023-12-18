import { useEffect, useState } from 'react'
import Layout from '../../components/header/layout/layout'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import searchRepos from '../../core/api/get/searchRepos';
import Input from '../../components/common/input';
import { useAppContext } from '../../context/App.context';
import Pagination from '../../components/pagination/pagination';
import RepoCard from '../../components/repoCard/repoCard';
import Loading from '../../components/loading/loading';
const Repositories = () => {
  const { repositories, setRepositories } = useAppContext()

  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const myParam = queryParams.get('query');

  const [searchedQuery, setSearchedQuery] = useState<string>(myParam!)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true)
  const ITEMS_PER_PAGE = 5;





  const searchRepoHandler = async () => {
    navigate(`/repositories/search?query=${searchedQuery}`)
    setLoading(true)
    const res = await searchRepos(searchedQuery);
    setRepositories(res);
    setTotalPages(Math.ceil(res.length / ITEMS_PER_PAGE));
    setLoading(false)
  };

  useEffect(() => {
    searchRepoHandler();
  }, [myParam]);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentRepos = repositories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  return (
    <Layout>
      <div className='ml-10 border border-gray-300 p-5 rounded w-[60rem] shadow-lg'>
        <h2 className='text-xl font-semibold'>📚 Search Result of : {myParam}</h2>
        <div className='mt-3 flex items-end'>
          <div>
            <Input
              label={'Search for Repo '}
              type={'search '}
              placeHolder={'search for repo'}
              className='w-[23rem]'
              value={searchedQuery}
              onChange={(e) => setSearchedQuery(e.target.value)}
            />
          </div>
          <div>
            <button onClick={searchRepoHandler} className='bg-[#1F2937] text-white rounded py-3 px-3 ml-3'>  {loading ? <span className='animate-ping'>🔍</span> : 'Search'} </button>
          </div>
        </div>
        <div className='grid grid-cols-1'>
          {loading ? <Loading /> : <> <div className='grid grid-cols-1'>
            {currentRepos.map((repo: any) => (
              <RepoCard repo={repo} />
            ))}
          </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              changePage={changePage}
            />
          </>}

        </div>

      </div>

    </Layout>
  )
}

export default Repositories
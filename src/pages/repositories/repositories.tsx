import React, { useEffect, useState } from 'react'
import Layout from '../../components/header/layout/layout'
import { useLocation } from 'react-router-dom';
import searchRepos from '../../core/api/get/searchRepos';
import Input from '../../components/common/input';

const Repositories = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const myParam = queryParams.get('query');
  const [searchedQuery, setSearchedQuery] = useState<string>(myParam!)


  const searchRepoHandler = async () => {
    const res = await searchRepos(myParam!);
    console.log(res)
  }

  useEffect(() => {
    searchRepoHandler()
  }, [])

  return (
    <Layout>
      <div className='ml-10 border border-gray-300 p-5 rounded w-[60rem] shadow-lg'>
        <h2 className='text-xl font-semibold'>📚 Search Result of : {myParam}</h2>
        <div className='mt-3 flex items-end'> 
          <div>
            <Input label={'Search for Repo'} type={'search'} placeHolder={'search for repo'} className='w-[23rem]' value={searchedQuery} onChange={(e) => setSearchedQuery(e.target.value)} />
          </div>
          <div>
            <button className='bg-[#1F2937] text-white rounded py-3 px-3 ml-3'> search </button>
          </div>
        </div>


      </div>

    </Layout>
  )
}

export default Repositories
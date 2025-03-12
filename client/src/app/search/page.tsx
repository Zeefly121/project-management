'use client'

import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import TaskCard from '@/components/TaskCard';
import UserCard from '@/components/UserCard';
import { useSearchQuery, SearchResults } from '@/state/api';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {
        data: searchResults,
        isLoading,
        isError,
    } = useSearchQuery(searchTerm, {
        skip: searchTerm.length < 3,
    });

    const typedSearchResults = searchResults as SearchResults

    const handleSearch = debounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value)
        },
        500,
    );

    useEffect(() => {
        return handleSearch.cancel;
    }, [handleSearch.cancel])

    console.log(typedSearchResults)
  return (
    <div className='p-8'>
        <Header name="search" />
        <div>
            <input type="text" placeholder='Search...' className='w-1/2 rounded border p-3 shadow' onChange={handleSearch}/>
        </div>
        <div className="p-5">
            {isLoading && <p>Loading...</p>}
            {isError && (
                <p>Error occurred while searching.</p>
            )}
            {!isError && typedSearchResults && (
                <div>
                    {typedSearchResults.tasks && typedSearchResults.tasks?.length > 0 && (
                        <h2>Tasks</h2>
                    )}
                    {typedSearchResults.tasks?.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}

                    {typedSearchResults.projects && typedSearchResults.projects?.length > 0 && (
                        <h2>Projects</h2>
                    )}
                    {typedSearchResults.projects?.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}

                    {typedSearchResults.users && typedSearchResults.users?.length > 0 && (
                        <h2>Users</h2>
                    )}
                    {typedSearchResults.users?.map((user) => (
                        <UserCard key={user.userId} user={user} />
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Search
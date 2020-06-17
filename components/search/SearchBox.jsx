import { useState, useEffect } from 'react'

import { Select } from './../select'
import { Card } from './../card'
import response from '../../data/response.json'

import './search-box.scss'

const getSubtasks = async (id) => {
    const response = await fetch(`/api/tasks/${id}`)
    const { subtasks } = await response.json()

    return subtasks
}

export const SearchBox = ({ tasks }) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
    const [subtasks, setSubtasks] = useState([])
    const [responses, setResponses] = useState([])

    useEffect(() => {
        if (currentTaskIndex) {
            (async () => {
                const response = await getSubtasks(currentTaskIndex)
                setSubtasks(response)
            })()
        } else {
            setSubtasks([])
        }
    }, [currentTaskIndex])

    const onChange = ({ target }) => {
        setCurrentTaskIndex(target.value)
    }

    const onSubmit = async (evt) => {
        evt.preventDefault()
        const { task, subtask, search } = evt.target

        const searchTerm = `${task.selectedOptions[0].text} ${subtask.selectedOptions[0].text} ${search.value}`.trim()

        try {
            // const data = await fetch('http://34.223.223.77:4004/search',
            //     {
            //         method: 'POST',
            //         'Accept': 'application/json',
            //         body: { task: searchTerm }
            //     }
            // )

            // const response = await data.json()
            setResponses(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form method="POST" onSubmit={onSubmit} className="search-box">
                <Select options={tasks} onChange={onChange} defaultOptionText="Select a task..." name="task"/>
                <Select options={subtasks} defaultOptionText="Select a subtask..." name="subtask" />
                <input type="search" name="search" placeholder="Insert an specific search (optional)" className="search-box__input" />
                <input type="submit" value="Search" className="search-box__button"/>
            </form>
            <section>
                {responses.map(response =>
                    <Card
                        key={response.id}
                        title={response.title[0]}
                        summary={response.body}
                        urls={response.url[0]}
                        score={response.score}
                    />)}
            </section>
        </>
    )
}

export default SearchBox

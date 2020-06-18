import { useState, useEffect } from 'react'

import { Select } from './../select'
import { Card } from './../card'
import { Loader } from './../loader'

import styles from './search-box.module.scss'

const getSubtasks = async (id) => {
    const response = await fetch(`/api/tasks/${id}`)
    const { subtasks } = await response.json()

    return subtasks
}

export const SearchBox = ({ tasks }) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
    const [subtasks, setSubtasks] = useState([])
    const [responses, setResponses] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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

        setIsLoading(true)

        try {
            const data = await fetch('http://34.223.223.77:4004/search',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ task: searchTerm }),
                }
            )

            const response = await data.json()

            setIsLoading(false)
            setResponses(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getCards = (data = []) =>
        data.map(item =>
            <Card
                key={item.id}
                title={item.title[0]}
                summary={item.body}
                urls={item.url[0]}
                score={item.score}
            />
        )


    return (
        <>
            <form method="POST" onSubmit={onSubmit} className={styles.container}>
                <Select options={tasks} onChange={onChange} defaultOptionText="Select a task..." name="task"/>
                <Select options={subtasks} defaultOptionText="Select a subtask..." name="subtask" />

                <input
                    type="search"
                    name="search"
                    placeholder="Insert an specific search (optional)"
                    className={styles.input}
                />
                <input type="submit" value="Search" className={styles.button}/>
            </form>
            <section>
                {isLoading ? <Loader /> : getCards(responses)}
            </section>
        </>
    )
}

export default SearchBox

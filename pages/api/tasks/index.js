import tasks from '../../../data/tasks.json'

export default (_, res) => res.status(200).json(tasks)

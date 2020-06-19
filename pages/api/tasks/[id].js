import tasks from '../../../data/tasks.json'

export default (req, res) => {
    const { id } = req.query

    if (id < tasks.length && id >= 0) {
        res.status(200).json(tasks[id])
    } else {
        res.status(404).json({ statusCode: 404, 'message': 'Current task not found' })
    }

}

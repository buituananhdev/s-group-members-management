const express = require('express');
const poll_router = express.Router();
const authentication = require('../middleware/Authentication');
poll_router.use(express.json());
poll_router.use(express.urlencoded({ extended: true }));
const {
    createPoll,
    createOption,
    chooseOption,
    getSinglePoll,
    removeOption,
    unChooseOption,
    updateOption,
    deletePoll,
} = require('../database/PollContext');
const getCreatedBy = require('../helpers/GetCreatedBy');

// Create new poll
poll_router.post('', async (req, res) => {
    const { poll_name, poll_question } = req.body;
    try {
        const poll = await createPoll({
            poll_name,
            poll_question,
        });
        return res.status(200).json({ status: 'success', data: poll });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ status: 'failure', message: 'Error adding poll' });
    }
});

// Get details poll by id
poll_router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const poll = await getSinglePoll(id);
        if(poll.length < 1) {
            return res.status(404).send({ status: 'failure', message: 'Poll not found' });
        }
        const option = poll[0].optionId
            ? poll.map((row) => ({
                  id: row.optionId,
                  content: row.optionContent,
                  created_at: row.optionCreated
                      ? row.optionCreated.getTime() / 1000
                      : '',
                  userIds: row.userIds
                      ? row.userIds.split(',').map(Number)
                      : [],
                  userCount: row.userCount,
              }))
            : [];

        const pollNested = {
            id: poll.length > 0 ? poll[0].id : '',
            name: poll.length > 0 ? poll[0].poll_name : '',
            created_at:
                poll.length > 0 ? poll[0].created_at.getTime() / 1000 : '',
            options: option,
        };

        return res.status(200).json({ status: 'success', data: pollNested });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ status: 'failure', message: 'Error get poll details' });
    }
});

poll_router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await deletePoll(id);
        if (!result) {
            return res.status(400).send({status: 'failure',message: 'Poll not found!',});
        }
        return res.status(400).send({status: 'success',message: 'Delete poll successfully',});
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ status: 'failure', message: 'Error delete poll!' });
    }
});

// Create new option
poll_router.post('/options', async (req, res) => {
    const { poll_id, content } = req.body;
    try {
        const option = await createOption({
            poll_id,
            content,
        });
        return res.status(200).json({ status: 'success', data: option });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ status: 'failure', message: 'Error adding option' });
    }
});

// Update options
poll_router.put('/options/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { content } = req.body;
    try {
        const result = await updateOption(id, { content });
        if (!result) {
            return res
                .status(404)
                .send({ status: 'failure', message: 'Option not found' });
        }
        return res
            .status(200)
            .send({ status: 'success', message: 'Update option successfully' });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ status: 'failure', message: 'Error update option' });
    }
});

// Delete option
poll_router.delete('/options', async (req, res) => {
    const { option_id } = req.body;
    try {
        const result = await removeOption(option_id);
        if (!result) {
            return res
                .status(404)
                .send({ status: 'failure', message: 'Option not found!' });
        }
        return res.status(200).json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ status: 'failure', message: 'Error remove option' });
    }
});

// Choose / Unchoose option
poll_router.post(
    '/choose_options',
    authentication,
    getCreatedBy,
    async (req, res) => {
        const { option_id, created_by } = req.body;
        try {
            const result = await chooseOption({
                option_id,
                created_by,
            });
            if (result === true) {
                await unChooseOption(option_id);
                return res.status(200).json({
                    status: 'success',
                    message: 'Unchoose option success',
                });
            }
            return res
                .status(200)
                .json({ status: 'success', message: 'Choose option success' });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send({ status: 'failure', message: 'Error choose option' });
        }
    }
);

module.exports = poll_router;

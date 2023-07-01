const knex = require('./Connection');

// POLLS API
const createPoll = async (pollData) => {
    const { poll_name, poll_question } = pollData;
    const created_at = new Date();
    try {
        const poll = await knex('Polls').insert({
            poll_name,
            poll_question,
            created_at,
        });
        return poll;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding poll');
    }
};

const getSinglePoll = async (id) => {
    try {
        const poll = await knex('Polls')
            .select(
                'Polls.id',
                'Polls.poll_name',
                'Polls.poll_question',
                'Polls.created_at',
                'Options.id as optionId',
                'Options.content as optionContent',
                'Options.created_at as optionCreated',
                knex.raw('GROUP_CONCAT(OptionsChoose.created_by) as userIds'),
                knex.raw('COUNT(OptionsChoose.created_by) as userCount')
            )
            .where('Polls.id', id)
            .leftJoin('Options', 'Options.poll_id', 'Polls.id')
            .leftJoin('OptionsChoose', 'OptionsChoose.option_id', 'Options.id')
            .groupBy('Options.id');
        return poll;
    } catch (error) {
        console.log(error);
    }
};

const deletePoll = async (id) => {
    try {
        const deletedPoll = await knex('Polls').where('id', id).del();
        return deletedPoll;
    } catch (error) {
        console.error(error);
    }
}

// OPTIONS API
const createOption = async (optionData) => {
    const { poll_id, content } = optionData;
    const created_at = new Date();
    try {
        const option = await knex('Options').insert({
            poll_id,
            content,
            created_at,
        });
        return option;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding option');
    }
};

const removeOption = async (id) => {
    try {
        const deletedOption = await knex('Options').where('id', id).del();
        return deletedOption;
    } catch (error) {
        console.error(error);
    }
};

const updateOption = async (id, optionData) => {
    const { content } = optionData;
    try {
        const result = await knex('Options')
            .where('id', id)
            .update({ content });
        return result;
    } catch (error) {
        console.error(error);
    }
};

const chooseOption = async (chooseData) => {
    const { option_id, created_by } = chooseData;
    const created_at = new Date();
    try {
        const existingOption = await knex('OptionsChoose')
            .where({ option_id, created_by })
            .first();

        if (existingOption) {
            return true;
        }
        const chooseOption = await knex('OptionsChoose').insert({
            option_id,
            created_by,
            created_at,
        });
        return chooseOption;
    } catch (error) {
        console.log(error);
    }
};

const unChooseOption = async (id) => {
    try {
        const option = await knex('OptionsChoose').where('option_id', id).del();
        return option;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    createPoll,
    createOption,
    chooseOption,
    getSinglePoll,
    removeOption,
    unChooseOption,
    updateOption,
    deletePoll
};

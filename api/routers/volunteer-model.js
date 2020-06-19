const db = require('../../data/dbconfig');

module.exports ={
    add,
    find,
    findBy,
    findById
}

function find(){
    return db('volunteer').select('id','username').orderBy('id')
}

function findBy(filter) {
    return db('volunteer').where(filter).orderBy('id')
}

function findById(id) {
    return db('volunteer').where({id}).first();
}

async function add(volunteer) {
    try{
        const [id] = await db('volunteer').insert(volunteer, 'id');
        return findById(id);
    }catch(err){
        throw error;
    }
}
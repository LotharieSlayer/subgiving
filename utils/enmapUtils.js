/**
 * @author Lothaire Guée
 * @description
 *      Contains the function linked to the database.
 */


/* ----------------------------------------------- */
/* DATABASES INITILIZATION                         */
/* ----------------------------------------------- */
const Enmap = require("enmap");

// SUBGIVING
const setupSubgiving = new Enmap({name: "setup_subgiving"});
const personnesEntrantes = new Enmap({name: "personnes_entrantes"});
const subgiving = new Enmap({name: "subgiving"});
const subgivingInviter = new Enmap({name: "subgiving_inviter"});

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

/**
 * Commentaires
 * @returns {String} Channel ID by passing the Guild ID and the type of
 * the channel you want to search.
 * Example : getSetupData(GUILD_ID, "presentation") but it can be : "proposition" or "discussion"
 */
async function getSetupData(id, type){

    switch (type) {
        case "subgiving":
            // Here id is the guild
            // WARNING : It returns an array [0 = enabled, 1 = channelOutput, 2 = roleOutput, 3 = endDateTime]
            return await getResultsValue(setupSubgiving, id)
        default:
            break;
    }

}

async function getResultsKey(db, id){
    let result;
    db.fetchEverything()?.forEach( async (value, key) => {
        if(key === id)
            result = key;
    })
    return result;
}

async function getResultsValue(db, id){
    let result;
    db.fetchEverything()?.forEach( async (value, key) => {
        if(key === id)
            result = value;
    })
    return result;
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getSetupData,
    setupSubgiving,
    personnesEntrantes,
    subgiving,
    subgivingInviter
}
const { setupSubgiving } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
    subcommand
        .setName("subgiving")
        .setDescription(
            "Définir/Supprimer le channel pour les logs de subgiving. (Il ne peut n'y en avoir qu'un)"
        )
        .addChannelOption((channel) =>
            channel
                .setName("channel")
                .setDescription(
                    "Entrez le channel où les logs de subgiving seront envoyés."
                )
                .setRequired(true)
        )
        .addRoleOption((role) =>
            role
                .setName("role")
                .setDescription(
                    "Entrez le rôle du subgiving."
                )
                .setRequired(true)
        )
        .addStringOption((string) =>
            string
                .setName("end_datetime")
                .setDescription(
                    "Entrez la date de fin du subgiving sous la forme suivante d'un timestamp, exemple : 1620000000"
                )
                .setRequired(true)
        )
    );
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        case "subgiving":
            setupSubgiving.set(interaction.guild.id, [true, interaction.options.getChannel("channel").id, interaction.options.getRole("role").id, interaction.options.getString("end_datetime")]);
            await interaction.reply({
                content: `Logs subgiving ajouté au serveur dans <#${interaction.options.getChannel("channel").id}> , <@!${interaction.options.getRole("role").id}> !\nFin le : <t:${interaction.options.getString("end_datetime").substring(0,10)}:R>`,
                ephemeral: true,
            });
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};

import { Client, Intents } from 'discord.js';

import fetch from 'node-fetch';

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.once('ready', () => {
	console.log('Ready!');
});
client.on('messageReactionAdd', async (reaction, user) => {
	console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
	reaction.message
		.fetch()
		.then(async (message) => {
			const reaction_count = message.reactions.cache.get('👀')?.count;
			if (message.channel.id !== process.env.CHANNEL_ID) {
				return;
			}
			console.log('channel is true');
			console.log(reaction_count);
			if (reaction_count !== 2) {
				return;
			}
			console.log('pin');
			await message.pin();
		})
		.catch((e) => {
			console.error('Something went wrong when fetching the message: ', e);
		});
});

client.on('messageReactionRemove', async (reaction, user) => {
	console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
	reaction.message
		.fetch()
		.then(async (message) => {
			const reaction_count = message.reactions.cache.get('👀')?.count;
			if (message.channel.id !== process.env.CHANNEL_ID) {
				return;
			}
			console.log('channel is true');
			console.log(reaction_count);
			if (reaction_count !== 1) {
				return;
			}
			console.log('unpin');
			await message.unpin();
		})
		.catch((e) => {
			console.error('Something went wrong when fetching the message: ', e);
		});
});

client.on('messageCreate', async (message) => {
	if (message.author.bot) {
		return;
	}
	if (!message.content.startsWith('https://github.com/')) {
		return;
	}
	const url = message.content;
	const newurl = url.replace(/^(.*\/\/github.com\/.+\/.+\/)blob(\/.+)$/i, '$1raw$2');
	const paragraph = url.split('#');
	if (paragraph[1] == null) {
    console.log('Where you want to display is not existing.');
		return;
	}
	(async () => {
		try {
			const response = await fetch(newurl);
			let sendtext = '';
			const body = await response.text();
			const lines = body.split('\n');
			// 拡張子を取得
			const fileType = paragraph[0].split('/').slice(-1)[0].split('.').slice(-1)[0];
			const LineNumber = paragraph[1].split('-');
			// 行始めと行終わりを取得
			if (LineNumber.length === 2) {
				const begin = Number(LineNumber[0].substring(1)) - 1;
				const end = Number(LineNumber[1].substring(1));
				console.log({ begin, end });
				sendtext = lines.slice(begin, end).join('\n');
			} else if (LineNumber.length === 1) {
				const begin = Number(LineNumber[0].substring(1)) - 1;
				sendtext = lines.slice(begin, begin + 1).join('\n');
			} else {
				console.log('error');
			}

			// テンプレートリテラル
			message.channel.send(` \`\`\`${fileType}\n${sendtext}  \`\`\``);
		} catch (error) {
			console.log(error);
		}
	})();
});
client.login(process.env.DISCORD_TOKEN);

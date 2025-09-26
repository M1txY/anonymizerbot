const { Telegraf } = require('telegraf');

const BOT_TOKEN = ""

const help =
  `Welcome to @anonomiserBot\n\n` +
  `Forward any message, photos, files, etc. to this bot.\n` +
  `The bot will reply your message, without any indication where this message is from.\n` +
  `When forwarding it to everywhere you want, nobody will know the origin or original caption.`;

const bot = new Telegraf(BOT_TOKEN);

const mediaGroups = new Map();

bot.start(ctx => ctx.reply(help));
bot.help(ctx => ctx.reply(help));

bot.on('message', async ctx => {
  try {
    const message = ctx.message;
    
  
    if (message.media_group_id) {
      const groupId = message.media_group_id;
      
      if (!mediaGroups.has(groupId)) {
        mediaGroups.set(groupId, []);
        
      
        setTimeout(async () => {
          const group = mediaGroups.get(groupId);
          if (group && group.length > 0) {
            try {
            
              await ctx.telegram.sendMediaGroup(ctx.from.id, group);
            } catch (error) {
              console.error('Erreur envoi groupe de médias:', error);
            }
            mediaGroups.delete(groupId);
          }
        }, 1000);
      }
      
    
      const media = {
        type: message.photo ? 'photo' : message.video ? 'video' : message.document ? 'document' : 'photo',
        media: message.photo ? message.photo[message.photo.length - 1].file_id : 
               message.video ? message.video.file_id :
               message.document ? message.document.file_id : message.photo[0].file_id
      };
      
    
      if (message.caption && mediaGroups.get(groupId).length === 0) {
        media.caption = message.caption;
      }
      
      mediaGroups.get(groupId).push(media);
      
    } else {
    
      await ctx.telegram.sendCopy(ctx.from.id, ctx.message);
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  }
});

bot.launch();
bot.catch(error => console.error(error));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

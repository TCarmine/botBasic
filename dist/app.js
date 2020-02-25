"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const restify = require("restify");
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
});
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
let conversationState;
const memoryStorage = new botbuilder_1.MemoryStorage();
conversationState = new botbuilder_1.ConversationState(memoryStorage);
adapter.use(conversationState);
server.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, (context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context.activity.type === "message") {
            const state = conversationState.get(context);
            yield context.sendActivity(`Echo: ${context.activity.text}`);
        }
        else {
            yield context.sendActivity(`${context.activity.type} event detected`);
        }
    }));
});
//# sourceMappingURL=app.js.map
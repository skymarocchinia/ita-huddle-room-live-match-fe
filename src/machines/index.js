import { createMachine, assign, send, childToParent } from "xstate";

import MatchService from "../services/match";

const INIT = "INIT";

const MATCH_INFO_SUCCESS = "MATCH_INFO_SUCCESS";

const MATCH_START = "MATCH_START";
const MATCH_END = "MATCH_END";

const HALF_START = "HALF_START";
const HALF_END = "HALF_END";

const PASS = "PASS";
const CHANGE_POSSETION = "CHANGE_POSSETION";
const GOAL = "GOAL";
const CELEBRATION = "CELEBRATION";

const matchMachine = createMachine(
  {
    id: "matchMachine",
    predictableActionArguments: true,
    context: {
      events: []
    },
    initial: INIT,
    states: {
      [INIT]: {
        id: "initMachine",
        entry: assign({
          matchService: (context) => new MatchService(context.matchId)
        }),
        invoke: {
          src: ({ matchService }, event) => matchService.getInfo(),
          onDone: {
            target: MATCH_INFO_SUCCESS,
            actions: assign({ matchInfo: (context, event) => event.data })
          }
        }
      },
      [MATCH_INFO_SUCCESS]: {
        on: {
          "": [
            { target: MATCH_START, cond: "isMatchStart" },
            { target: MATCH_END, cond: "isMatchEnd" }
          ]
        }
      },
      [MATCH_START]: {
        entry: () => console.log("Match in corso")
        // invoke: {} // subscription
      },
      [MATCH_END]: {
        entry: () => console.log("Match finito"),
        type: "final"
      }
    }
  },
  {
    guards: {
      isMatchStart: ({ matchInfo: { status } }) => {
        console.log("status", status);
        return ["firsthalf", "secondhalf"].includes(status);
      },
      isMatchEnd: ({ matchInfo: { status } }) => {
        console.log("status", status);
        return ["fulltime"].includes(status);
      }
    }
  }
);

export default matchMachine;

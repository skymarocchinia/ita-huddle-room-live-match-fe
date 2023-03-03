import { Subject } from "rxjs";

const fakeEvents = [
  {
    type: "pass",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pippo",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    min: "12",
    sec: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: "",
        shootType: "Tiro al volo"
      }
    }
  },
  {
    type: "pass",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pippo",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: ""
      }
    }
  }
];

class MatchService {
  #events = new Subject();
  constructor(matchId) {
    this._publishEvent();
  }
  async getInfo() {
    return Promise.resolve({
      status: "firsthalf", // prematch, fulltime
      teamHome: {
        teamId: "123",
        teamName: "Inter",
        teamLogo: "link",
        teamPosition: "left",
        color: "FFFFF",
        score: 0
      },
      teamAway: {
        teamId: "123",
        teamName: "Milan",
        teamLogo: "link",
        teamPosition: "left",
        color: "FFFFF",
        score: 0
      }
    });
  }

  subEvents() {
    return this.#events;
  }

  _publishEvent() {
    const intId = setInterval(() => {
      this.#events.next(fakeEvents.shift());
      this.#events.lenght === 0 && clearInterval(intId);
    }, 2000);
  }
}

export default MatchService;
